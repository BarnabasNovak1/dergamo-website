import { onRequest } from 'firebase-functions/v2/https';
import { defineString } from 'firebase-functions/params';
import Stripe from 'stripe';

const printifyApiKey = defineString('PRINTIFY_API_KEY');
const stripeSecretKey = defineString('STRIPE_SECRET_KEY');
const stripeWebhookSecret = defineString('STRIPE_WEBHOOK_SECRET');

const PRINTIFY_BASE_URL = 'https://api.printify.com/v1';

// Helper to get Stripe instance
const getStripe = (secretKey) => new Stripe(secretKey, { apiVersion: '2023-10-16' });

export const getShops = onRequest({ cors: true }, async (req, res) => {
  try {
    const response = await fetch(`${PRINTIFY_BASE_URL}/shops.json`, {
      headers: {
        'Authorization': `Bearer ${printifyApiKey.value()}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getProducts = onRequest({ cors: true }, async (req, res) => {
  try {
    const shopId = req.query.shopId;
    if (!shopId) {
      res.status(400).json({ error: 'shopId is required' });
      return;
    }
    
    const response = await fetch(`${PRINTIFY_BASE_URL}/shops/${shopId}/products.json`, {
      headers: {
        'Authorization': `Bearer ${printifyApiKey.value()}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getProduct = onRequest({ cors: true }, async (req, res) => {
  try {
    const { shopId, productId } = req.query;
    if (!shopId || !productId) {
      res.status(400).json({ error: 'shopId and productId are required' });
      return;
    }
    
    const response = await fetch(`${PRINTIFY_BASE_URL}/shops/${shopId}/products/${productId}.json`, {
      headers: {
        'Authorization': `Bearer ${printifyApiKey.value()}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate shipping cost via Printify
export const calculateShipping = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { items, shopId, address } = req.body;
    // items: [{ productId, variantId, quantity }]
    // address: { country, region, city, zip, address1 }

    if (!items || !shopId || !address) {
      res.status(400).json({ error: 'items, shopId, and address are required' });
      return;
    }

    const shippingRequest = {
      line_items: items.map(item => ({
        product_id: item.productId,
        variant_id: parseInt(item.variantId),
        quantity: item.quantity || 1
      })),
      address_to: {
        first_name: address.firstName || 'Customer',
        last_name: address.lastName || '',
        country: address.country || 'US',
        region: address.region || '',
        address1: address.address1 || '',
        address2: address.address2 || '',
        city: address.city || '',
        zip: address.zip || ''
      }
    };

    const response = await fetch(
      `${PRINTIFY_BASE_URL}/shops/${shopId}/orders/shipping.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${printifyApiKey.value()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shippingRequest)
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Printify shipping calculation failed:', data);
      res.status(400).json({ error: 'Failed to calculate shipping', details: data });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error('Shipping calculation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create Stripe Checkout Session
export const createCheckoutSession = onRequest({ 
  cors: true
}, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { items, shopId, shippingCost, shippingMethod, address } = req.body;
    // items: [{ productId, variantId, quantity, title, price, image }]
    // shippingCost: number in dollars (from Printify calculation)
    // address: shipping address for pre-filling
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Items are required' });
      return;
    }

    if (shippingCost === undefined || shippingCost === null) {
      res.status(400).json({ error: 'Shipping cost is required. Calculate shipping first.' });
      return;
    }

    const stripe = getStripe(stripeSecretKey.value());

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: item.image ? [item.image] : [],
          metadata: {
            productId: item.productId,
            variantId: item.variantId,
            shopId: shopId
          }
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity || 1,
    }));

    // Use the calculated shipping cost from Printify
    const shippingAmountCents = Math.round(shippingCost * 100);
    const shippingOptions = [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: shippingAmountCents, currency: 'usd' },
          display_name: shippingMethod || 'Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 14 },
          },
        },
      },
    ];

    // Build shipping address for Stripe payment intent
    const shippingAddr = address || {};
    const fullName = [shippingAddr.firstName, shippingAddr.lastName].filter(Boolean).join(' ') || 'Customer';

    // Create checkout session - address already collected, skip Stripe's address form
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      allow_promotion_codes: true,
      shipping_options: shippingOptions,
      payment_intent_data: {
        shipping: {
          name: fullName,
          address: {
            line1: shippingAddr.address1 || '',
            line2: shippingAddr.address2 || '',
            city: shippingAddr.city || '',
            state: shippingAddr.region || '',
            postal_code: shippingAddr.zip || '',
            country: shippingAddr.country || 'US',
          }
        }
      },
      metadata: {
        shopId: shopId,
        // Compact items - avoid 500 char limit
        items: JSON.stringify(items.map(i => ({ 
          p: i.productId, 
          v: i.variantId, 
          q: i.quantity
        }))),
        // Store address in metadata for webhook
        addr: JSON.stringify({
          fn: shippingAddr.firstName || '',
          ln: shippingAddr.lastName || '',
          a1: shippingAddr.address1 || '',
          a2: shippingAddr.address2 || '',
          ci: shippingAddr.city || '',
          re: shippingAddr.region || '',
          zi: shippingAddr.zip || '',
          co: shippingAddr.country || 'US'
        })
      },
      success_url: `${req.headers.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/merch?canceled=true`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe Webhook - handles successful payments and creates Printify orders
export const stripeWebhook = onRequest(async (req, res) => {
  const stripe = getStripe(stripeSecretKey.value());
  const sig = req.headers['stripe-signature'];
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      stripeWebhookSecret.value()
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log('Received Stripe webhook event:', event.type);

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Only process if payment was successful
    if (session.payment_status !== 'paid') {
      console.log('Payment not yet completed, waiting for payment_intent.succeeded');
      res.json({ received: true });
      return;
    }
    
    try {
      console.log('Processing paid order:', session.id);
      
      // Get shipping details - try session.shipping_details first, then metadata, then customer_details
      const shippingDetails = session.shipping_details || session.customer_details;
      
      // Parse address from metadata (compact format)
      let metaAddr = {};
      try { metaAddr = JSON.parse(session.metadata.addr || '{}'); } catch(e) {}
      
      // Parse compact metadata format (p=productId, v=variantId, q=quantity)
      const rawItems = JSON.parse(session.metadata.items || '[]');
      const items = rawItems.map(i => ({
        productId: i.p || i.productId,
        variantId: i.v || i.variantId,
        quantity: i.q || i.quantity
      }));
      const shopId = session.metadata.shopId;

      if (!items.length || !shopId) {
        console.error('Missing items or shopId in session metadata');
        res.json({ received: true, error: 'Missing metadata' });
        return;
      }

      // Build address - prefer metadata (our collected address), fallback to Stripe shipping_details
      const addressTo = {
        first_name: metaAddr.fn || shippingDetails?.name?.split(' ')[0] || 'Customer',
        last_name: metaAddr.ln || shippingDetails?.name?.split(' ').slice(1).join(' ') || '',
        email: session.customer_details?.email || '',
        phone: shippingDetails?.phone || '',
        country: metaAddr.co || shippingDetails?.address?.country || 'US',
        region: metaAddr.re || shippingDetails?.address?.state || '',
        address1: metaAddr.a1 || shippingDetails?.address?.line1 || '',
        address2: metaAddr.a2 || shippingDetails?.address?.line2 || '',
        city: metaAddr.ci || shippingDetails?.address?.city || '',
        zip: metaAddr.zi || shippingDetails?.address?.postal_code || ''
      };

      console.log('Creating Printify order with items:', items);
      console.log('Shipping to:', addressTo);

      // Create order in Printify
      const printifyOrder = {
        external_id: session.id,
        label: `DERGAMO-${session.id.slice(-8).toUpperCase()}`,
        line_items: items.map(item => ({
          product_id: item.productId,
          variant_id: parseInt(item.variantId),
          quantity: item.quantity
        })),
        shipping_method: 1, // Standard shipping
        send_shipping_notification: true,
        address_to: addressTo
      };

      console.log('Sending order to Printify:', JSON.stringify(printifyOrder, null, 2));

      const printifyResponse = await fetch(
        `${PRINTIFY_BASE_URL}/shops/${shopId}/orders.json`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${printifyApiKey.value()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(printifyOrder)
        }
      );

      const printifyResult = await printifyResponse.json();
      
      if (!printifyResponse.ok) {
        console.error('Printify order creation failed:', printifyResult);
        res.json({ received: true, error: 'Printify order creation failed', details: printifyResult });
        return;
      }

      console.log('Printify order created successfully:', printifyResult);

      // Send order to production automatically - this triggers Printify to charge your payment method
      if (printifyResult.id) {
        console.log('Sending order to production:', printifyResult.id);
        
        const productionResponse = await fetch(
          `${PRINTIFY_BASE_URL}/shops/${shopId}/orders/${printifyResult.id}/send_to_production.json`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${printifyApiKey.value()}`,
              'Content-Type': 'application/json',
            }
          }
        );

        if (productionResponse.ok) {
          console.log('Order sent to production successfully! Printify will now process and ship.');
        } else {
          const prodError = await productionResponse.json();
          console.error('Failed to send to production:', prodError);
        }
      }

    } catch (error) {
      console.error('Error creating Printify order:', error);
      res.json({ received: true, error: error.message });
      return;
    }
  }

  res.json({ received: true });
});

// Test endpoint to verify webhook is deployed
export const webhookTest = onRequest({ cors: true }, async (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Webhook endpoint is deployed and ready',
    webhookUrl: 'https://us-central1-dergamo-821e7.cloudfunctions.net/stripeWebhook'
  });
});
