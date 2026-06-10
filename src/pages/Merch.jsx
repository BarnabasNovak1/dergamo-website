import { useState, useEffect } from 'react';
import { ShoppingBag, Truck, Loader2, ShoppingCart, Check, X, Plus, Minus, Trash2, Info } from 'lucide-react';
import { getShops, getProducts } from '../services/printify';
import SEO from '../components/SEO';

const SHIPPING_CALC_URL = 'https://us-central1-dergamo-821e7.cloudfunctions.net/calculateShipping';

// Helper to strip HTML tags and decode entities from description
function cleanDescription(html) {
  if (!html) return null;
  // Create a temporary element to decode HTML entities
  const doc = new DOMParser().parseFromString(html, 'text/html');
  let text = doc.body.textContent || '';
  // Clean up extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  // Truncate if too long
  if (text.length > 200) {
    text = text.substring(0, 200).trim() + '...';
  }
  return text;
}

// Helper to extract size from variant title
function getSizeFromVariant(variant) {
  if (!variant || !variant.title) return null;
  const sizeMatch = variant.title.match(/\b(XS|S|M|L|XL|XXL|2XL|3XL|4XL|5XL|One Size|\d+)\b/i);
  return sizeMatch ? sizeMatch[0].toUpperCase() : variant.title;
}

// Get available sizes from product variants
function getAvailableSizes(product) {
  if (!product?.variants) return [];
  const sizes = [];
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL', '5XL'];
  
  product.variants.forEach(variant => {
    if (variant.is_enabled) {
      const size = getSizeFromVariant(variant);
      if (size && !sizes.find(s => s.size === size)) {
        sizes.push({ size, variantId: variant.id, price: variant.price });
      }
    }
  });
  
  // Sort by standard size order
  return sizes.sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a.size);
    const bIndex = sizeOrder.indexOf(b.size);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

// Product Detail Modal
function ProductDetailModal({ product, isOpen, onClose, getProductImage, getProductPrice, onAddToCart, cartItems }) {
  const [selectedSize, setSelectedSize] = useState(null);
  
  // Reset selected size when product changes
  useEffect(() => {
    if (product) {
      const sizes = getAvailableSizes(product);
      setSelectedSize(sizes.length > 0 ? sizes[0].size : null);
    }
  }, [product]);
  
  if (!isOpen || !product) return null;
  
  const availableSizes = getAvailableSizes(product);
  const hasMultipleSizes = availableSizes.length > 1;
  const selectedVariant = availableSizes.find(s => s.size === selectedSize);
  const inCart = cartItems.find(item => item.productId === product.id && item.variantId === selectedVariant?.variantId);
  
  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#0c0c10',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: 'relative' }}>
          <img 
            src={getProductImage(product)} 
            alt={product.title}
            style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '20px 20px 0 0' }}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>
            {product.title}
          </h2>
          <p style={{ color: '#e94560', fontWeight: 700, fontSize: '1.25rem', marginBottom: '16px' }}>
            ${getProductPrice(product)}
          </p>
          <p style={{ color: '#a1a1aa', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
            {cleanDescription(product.description) || 'Premium quality merchandise from DERGAMO. Made with care and printed on demand just for you.'}
          </p>
          {product.tags && product.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {product.tags.slice(0, 5).map((tag, i) => (
                <span key={i} style={{ 
                  backgroundColor: 'rgba(255,255,255,0.05)', 
                  color: '#71717a', 
                  padding: '4px 10px', 
                  borderRadius: '6px', 
                  fontSize: '12px' 
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          {/* Size Selector */}
          {hasMultipleSizes && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#a1a1aa', fontSize: '14px', marginBottom: '10px', fontWeight: 500 }}>Select Size:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {availableSizes.map(({ size }) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: selectedSize === size ? '2px solid #e94560' : '1px solid rgba(255,255,255,0.15)',
                      backgroundColor: selectedSize === size ? 'rgba(233,69,96,0.15)' : 'rgba(255,255,255,0.05)',
                      color: selectedSize === size ? '#e94560' : 'white',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      minWidth: '48px'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={() => { 
              if (selectedVariant) {
                onAddToCart(product, selectedVariant.variantId, selectedSize); 
                onClose(); 
              }
            }}
            disabled={!selectedVariant}
            style={{
              width: '100%',
              backgroundColor: !selectedVariant ? 'rgba(255,255,255,0.1)' : inCart ? '#10b981' : '#e94560',
              border: 'none',
              color: !selectedVariant ? '#71717a' : 'white',
              padding: '14px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '15px',
              cursor: !selectedVariant ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {!selectedVariant ? 'Select a Size' : inCart ? <><Check size={18} /> In Cart ({inCart.quantity})</> : <><Plus size={18} /> Add to Cart{hasMultipleSizes ? ` - ${selectedSize}` : ''}</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// Product card with lazy loading image
function ProductCard({ product, getProductImage, getProductPrice, onAddToCart, onRemoveFromCart, onShowDetails, cartItems, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  
  const availableSizes = getAvailableSizes(product);
  const hasMultipleSizes = availableSizes.length > 1;
  const cartItemsForProduct = cartItems.filter(item => item.productId === product.id);
  const totalInCart = cartItemsForProduct.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const timer = setTimeout(() => setCardVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const handleAddToCart = () => {
    if (hasMultipleSizes) {
      onShowDetails(product);
    } else {
      onAddToCart(product);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <div 
        style={{
          aspectRatio: '1',
          backgroundColor: '#0c0c10',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer'
        }}
        onClick={() => onShowDetails(product)}
      >
        {!imageLoaded && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0c0c10'
          }}>
            <Loader2 size={32} style={{ color: '#e94560', animation: 'spin 1s linear infinite' }} />
          </div>
        )}
        <img
          src={getProductImage(product)}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
        <button
          onClick={(e) => { e.stopPropagation(); onShowDetails(product); }}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            border: 'none',
            color: 'white',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Info size={16} />
        </button>
      </div>
      <div style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 500, color: 'white', marginBottom: '8px', lineHeight: 1.4, minHeight: '40px' }}>
          {product.title}
        </h3>
        <p style={{ color: '#e94560', fontWeight: 600, fontSize: '16px', marginBottom: '12px' }}>
          ${getProductPrice(product)}
        </p>
        {totalInCart > 0 ? (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                backgroundColor: '#10b981',
                border: 'none',
                color: 'white',
                padding: '12px 8px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Plus size={14} /> {hasMultipleSizes ? 'Select Size' : `Add (${totalInCart})`}
            </button>
            <button
              onClick={() => onShowDetails(product)}
              style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                padding: '12px 8px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <ShoppingCart size={14} /> In Cart ({totalInCart})
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            style={{
              width: '100%',
              backgroundColor: '#e94560',
              border: 'none',
              color: 'white',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Plus size={16} /> {hasMultipleSizes ? 'Select Size' : 'Add to Cart'}
          </button>
        )}
      </div>
    </div>
  );
}

const FUNCTIONS_URL = 'https://us-central1-dergamo-821e7.cloudfunctions.net/createCheckoutSession';

export default function Merch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shopId, setShopId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [cart, setCart] = useState([]);
  const [cartInitialized, setCartInitialized] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({ firstName: '', lastName: '', address1: '', address2: '', city: '', region: '', zip: '', country: 'US' });
  const [shippingOptions, setShippingOptions] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [shippingLoading, setShippingLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('dergamo-cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCart(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load cart:', e);
    }
    setCartInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes (only after initial load)
  useEffect(() => {
    if (!cartInitialized) return;
    try {
      localStorage.setItem('dergamo-cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart, cartInitialized]);

  const CLOTHING_FILTERS = [
    { id: 'all', label: 'All' },
    { id: 't-shirt', label: 'T-Shirts' },
    { id: 'hoodie', label: 'Hoodies' },
    { id: 'sweatshirt', label: 'Sweatshirts' },
    { id: 'hat', label: 'Hats' },
    { id: 'summer', label: 'Summer' },
  ];

  const getFilteredProducts = () => {
    if (activeFilter === 'all') return products;
    if (activeFilter === 'summer') {
      const summerKeywords = ['swim', 'trunk', 'bikini', 'beach', 'summer', 'shorts'];
      return products.filter(p => {
        const title = p.title.toLowerCase();
        const tags = p.tags ? p.tags.map(t => t.toLowerCase()) : [];
        return summerKeywords.some(keyword => 
          title.includes(keyword) || tags.some(tag => tag.includes(keyword))
        );
      });
    }
    return products.filter(p => 
      p.title.toLowerCase().includes(activeFilter) || 
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(activeFilter)))
    );
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Check for success/cancel from Stripe redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setMessage({ type: 'success', text: 'Payment successful! Your order is being processed.' });
      setCart([]);
      localStorage.removeItem('dergamo-cart');
      window.history.replaceState({}, '', '/merch');
    } else if (urlParams.get('canceled') === 'true') {
      // Force reload to bypass browser cache from Stripe redirect
      window.location.replace('/merch?from_cancel=1');
    } else if (urlParams.get('from_cancel') === '1') {
      setMessage({ type: 'info', text: 'Checkout was canceled. Your cart has been saved.' });
      window.history.replaceState({}, '', '/merch');
    }
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const shops = await getShops();
        const dergamoShop = shops.find(s => s.title === 'Dergamo');
        if (dergamoShop) {
          setShopId(dergamoShop.id);
          const productData = await getProducts(dergamoShop.id);
          const fetchedProducts = productData.data || [];
          // Filter to only show published products
          const publishedProducts = fetchedProducts.filter(p => p.is_locked === true);
          setProducts(publishedProducts);
          
          // Clean up cart: remove items for products that no longer exist
          setCart(prevCart => {
            const validProductIds = new Set(publishedProducts.map(p => p.id));
            const cleanedCart = prevCart.filter(item => validProductIds.has(item.productId));
            if (cleanedCart.length !== prevCart.length) {
              console.log('Removed invalid cart items for products that no longer exist');
            }
            return cleanedCart;
          });
        } else {
          setError('Dergamo store not found.');
        }
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Unable to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].src;
    }
    return '/dergamo-transparent.png';
  };

  const getProductPrice = (product) => {
    if (product.variants && product.variants.length > 0) {
      const enabledVariant = product.variants.find(v => v.is_enabled);
      const variant = enabledVariant || product.variants[0];
      const price = variant.price;
      return (price / 100).toFixed(2);
    }
    return '0.00';
  };

  const getProductPriceRaw = (product) => {
    if (product.variants && product.variants.length > 0) {
      const enabledVariant = product.variants.find(v => v.is_enabled);
      const variant = enabledVariant || product.variants[0];
      return variant.price / 100;
    }
    return 0;
  };

  const addToCart = (product, variantId = null, size = null) => {
    let variant;
    if (variantId) {
      variant = product.variants?.find(v => v.id === variantId);
    } else {
      variant = product.variants?.find(v => v.is_enabled) || product.variants?.[0];
    }
    
    if (!variant) {
      setMessage({ type: 'error', text: 'Product not available.' });
      return;
    }

    const itemSize = size || getSizeFromVariant(variant) || 'One Size';
    const cartKey = `${product.id}-${variant.id}`;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.cartKey === cartKey);
      if (existingItem) {
        return prevCart.map(item => 
          item.cartKey === cartKey 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, {
        cartKey,
        productId: product.id,
        variantId: variant.id,
        title: product.title,
        size: itemSize,
        price: variant.price / 100,
        image: getProductImage(product),
        quantity: 1
      }];
    });
    setMessage({ type: 'success', text: `${product.title} (${itemSize}) added to cart!` });
    setTimeout(() => setMessage(null), 2000);
  };

  const updateQuantity = (cartKey, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartKey);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => 
        item.cartKey === cartKey ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (cartKey) => {
    setCart(prevCart => prevCart.filter(item => item.cartKey !== cartKey));
  };

  const changeItemSize = (cartKey, product, newSize) => {
    const availableSizes = getAvailableSizes(product);
    const newVariant = availableSizes.find(s => s.size === newSize);
    if (!newVariant) return;

    const newCartKey = `${product.id}-${newVariant.variantId}`;
    
    setCart(prevCart => {
      // Check if new size already exists in cart
      const existingNewSizeItem = prevCart.find(item => item.cartKey === newCartKey);
      const currentItem = prevCart.find(item => item.cartKey === cartKey);
      
      if (!currentItem) return prevCart;

      if (existingNewSizeItem) {
        // Merge quantities and remove old item
        return prevCart
          .map(item => {
            if (item.cartKey === newCartKey) {
              return { ...item, quantity: item.quantity + currentItem.quantity };
            }
            return item;
          })
          .filter(item => item.cartKey !== cartKey);
      }

      // Update item with new size
      return prevCart.map(item => {
        if (item.cartKey === cartKey) {
          return {
            ...item,
            cartKey: newCartKey,
            variantId: newVariant.variantId,
            size: newSize,
            price: newVariant.price / 100
          };
        }
        return item;
      });
    });
  };

  const handleCalculateShipping = async () => {
    if (!shopId || cart.length === 0) return;
    
    const { country, region, city, zip, address1 } = shippingAddress;
    if (!country || !city || !zip || !address1) {
      setMessage({ type: 'error', text: 'Please fill in all required address fields.' });
      return;
    }

    setShippingLoading(true);
    setShippingOptions(null);
    setSelectedShipping(null);
    try {
      const response = await fetch(SHIPPING_CALC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopId,
          items: cart.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity
          })),
          address: shippingAddress
        })
      });

      const data = await response.json();
      console.log('Shipping response:', data);
      
      if (response.ok) {
        // Printify returns { standard: cents, express: cents, priority: cents }
        // Add 10% buffer to shipping costs to cover any discrepancies
        const SHIPPING_BUFFER = 1.10;
        const options = [];
        if (typeof data === 'object' && !Array.isArray(data)) {
          if (data.standard !== undefined) options.push({ id: 'standard', label: 'Standard Shipping', cost: Math.ceil(data.standard * SHIPPING_BUFFER) / 100 });
          if (data.express !== undefined) options.push({ id: 'express', label: 'Express Shipping', cost: Math.ceil(data.express * SHIPPING_BUFFER) / 100 });
          if (data.priority !== undefined) options.push({ id: 'priority', label: 'Priority Shipping', cost: Math.ceil(data.priority * SHIPPING_BUFFER) / 100 });
          // Fallback: check for any numeric values in the response
          if (options.length === 0) {
            const keys = Object.keys(data);
            keys.forEach(key => {
              if (typeof data[key] === 'number') {
                options.push({ id: key, label: key.charAt(0).toUpperCase() + key.slice(1) + ' Shipping', cost: Math.ceil(data[key] * SHIPPING_BUFFER) / 100 });
              }
            });
          }
        }
        if (options.length === 0) {
          throw new Error('No shipping options available for this address');
        }
        setShippingOptions(options);
        setSelectedShipping(options[0]);
      } else {
        throw new Error(data.error || 'Failed to calculate shipping');
      }
    } catch (err) {
      console.error('Shipping calculation error:', err);
      setMessage({ type: 'error', text: 'Unable to calculate shipping. Please check your address and try again.' });
    } finally {
      setShippingLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!shopId || cart.length === 0 || !selectedShipping) return;
    
    setCheckoutLoading(true);
    try {
      const response = await fetch(FUNCTIONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopId,
          shippingCost: selectedShipping.cost,
          shippingMethod: selectedShipping.label,
          address: shippingAddress,
          items: cart.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            title: item.title,
            price: item.price,
            image: item.image
          }))
        })
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setMessage({ type: 'error', text: 'Unable to start checkout. Please try again.' });
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <SEO 
        title="Merch"
        description="Shop official DERGAMO LLC merchandise. Premium gear designed by the DERGAMO team featuring ClassMT and PenultimateHub designs. Available in the USA."
        keywords="DERGAMO merch, DERGAMO merchandise, ClassMT merch, PenultimateHub merch, tech company merch, DERGAMO store, DERGAMO clothing"
        url="/merch"
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        getProductImage={getProductImage}
        getProductPrice={getProductPrice}
        onAddToCart={addToCart}
        cartItems={cart}
      />

      {/* Cart Sidebar */}
      {showCart && (
        <div 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 900 }}
          onClick={() => setShowCart(false)}
        >
          <div 
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#0c0c10',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Cart Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingCart size={22} /> Your Cart ({cartItemCount})
              </h2>
              <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', padding: '4px' }}>
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflow: 'auto', padding: '16px 24px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <ShoppingBag size={48} style={{ color: '#52525b', marginBottom: '16px' }} />
                  <p style={{ color: '#71717a' }}>Your cart is empty</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cart.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    const availableSizes = product ? getAvailableSizes(product) : [];
                    const hasMultipleSizes = availableSizes.length > 1;
                    
                    return (
                      <div key={item.cartKey || item.productId} style={{ 
                        display: 'flex', 
                        gap: '16px', 
                        backgroundColor: 'rgba(255,255,255,0.02)', 
                        border: '1px solid rgba(255,255,255,0.06)', 
                        borderRadius: '12px', 
                        padding: '12px' 
                      }}>
                        <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '14px', fontWeight: 500, color: 'white', marginBottom: '4px', lineHeight: 1.3 }}>{item.title}</h4>
                          <p style={{ color: '#e94560', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>${item.price.toFixed(2)}</p>
                          {/* Size Selector */}
                          {hasMultipleSizes && (
                            <div style={{ marginBottom: '8px' }}>
                              <select
                                value={item.size || ''}
                                onChange={(e) => changeItemSize(item.cartKey, product, e.target.value)}
                                style={{
                                  backgroundColor: 'rgba(255,255,255,0.1)',
                                  border: '1px solid rgba(255,255,255,0.15)',
                                  borderRadius: '6px',
                                  color: 'white',
                                  padding: '6px 10px',
                                  fontSize: '13px',
                                  cursor: 'pointer',
                                  outline: 'none'
                                }}
                              >
                                {availableSizes.map(({ size }) => (
                                  <option key={size} value={size} style={{ backgroundColor: '#0c0c10', color: 'white' }}>
                                    Size: {size}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                          {!hasMultipleSizes && item.size && (
                            <p style={{ color: '#71717a', fontSize: '12px', marginBottom: '8px' }}>Size: {item.size}</p>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button 
                              onClick={() => updateQuantity(item.cartKey || item.productId, item.quantity - 1)}
                              style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Minus size={14} />
                            </button>
                            <span style={{ color: 'white', fontWeight: 500, minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.cartKey || item.productId, item.quantity + 1)}
                              style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Plus size={14} />
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.cartKey || item.productId)}
                              style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#71717a', fontSize: '14px' }}>Subtotal</span>
                  <span style={{ color: 'white', fontWeight: 500 }}>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#71717a', fontSize: '14px' }}>Shipping</span>
                  <span style={{ color: '#71717a', fontWeight: 500 }}>{selectedShipping ? `$${selectedShipping.cost.toFixed(2)}` : 'Calculated at checkout'}</span>
                </div>
                {selectedShipping && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ color: 'white', fontWeight: 600 }}>Total</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>${(cartSubtotal + selectedShipping.cost).toFixed(2)}</span>
                  </div>
                )}

                {/* Address Form for Shipping Calculation */}
                {!showAddressForm && !selectedShipping && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    style={{
                      width: '100%',
                      backgroundColor: '#e94560',
                      border: 'none',
                      color: 'white',
                      padding: '14px',
                      borderRadius: '10px',
                      fontWeight: 600,
                      fontSize: '15px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    Proceed to Checkout
                  </button>
                )}

                {showAddressForm && !selectedShipping && (
                  <form
                    autoComplete="on"
                    onSubmit={e => { e.preventDefault(); handleCalculateShipping(); }}
                    style={{ marginTop: '12px' }}
                  >
                    <p style={{ color: 'white', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Shipping Address</p>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        name="fname"
                        autoComplete="shipping given-name"
                        placeholder="First Name *"
                        value={shippingAddress.firstName}
                        onChange={e => setShippingAddress(prev => ({ ...prev, firstName: e.target.value }))}
                        style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'white', padding: '10px 12px', fontSize: '13px', outline: 'none' }}
                      />
                      <input
                        name="lname"
                        autoComplete="shipping family-name"
                        placeholder="Last Name *"
                        value={shippingAddress.lastName}
                        onChange={e => setShippingAddress(prev => ({ ...prev, lastName: e.target.value }))}
                        style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'white', padding: '10px 12px', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                    <input
                      name="address1"
                      autoComplete="shipping address-line1"
                      placeholder="Address Line 1 *"
                      value={shippingAddress.address1}
                      onChange={e => setShippingAddress(prev => ({ ...prev, address1: e.target.value }))}
                      style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'white', padding: '10px 12px', fontSize: '13px', marginBottom: '8px', outline: 'none', boxSizing: 'border-box' }}
                    />
                    <input
                      name="address2"
                      autoComplete="shipping address-line2"
                      placeholder="Apt, suite, unit (optional)"
                      value={shippingAddress.address2}
                      onChange={e => setShippingAddress(prev => ({ ...prev, address2: e.target.value }))}
                      style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'white', padding: '10px 12px', fontSize: '13px', marginBottom: '8px', outline: 'none', boxSizing: 'border-box' }}
                    />
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        name="city"
                        autoComplete="shipping address-level2"
                        placeholder="City *"
                        value={shippingAddress.city}
                        onChange={e => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                        style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'white', padding: '10px 12px', fontSize: '13px', outline: 'none' }}
                      />
                      <input
                        name="region"
                        autoComplete="shipping address-level1"
                        placeholder="State/Region *"
                        value={shippingAddress.region}
                        onChange={e => setShippingAddress(prev => ({ ...prev, region: e.target.value }))}
                        style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'white', padding: '10px 12px', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <input
                        name="zip"
                        autoComplete="shipping postal-code"
                        placeholder="ZIP/Postal Code *"
                        value={shippingAddress.zip}
                        onChange={e => setShippingAddress(prev => ({ ...prev, zip: e.target.value }))}
                        style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'white', padding: '10px 12px', fontSize: '13px', outline: 'none' }}
                      />
                      <select
                        name="country"
                        autoComplete="shipping country"
                        value={shippingAddress.country}
                        onChange={e => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
                        style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'white', padding: '10px 12px', fontSize: '13px', outline: 'none' }}
                      >
                        <option value="US" style={{ backgroundColor: '#0c0c10' }}>United States</option>
                        <option value="CA" style={{ backgroundColor: '#0c0c10' }}>Canada</option>
                        <option value="GB" style={{ backgroundColor: '#0c0c10' }}>United Kingdom</option>
                        <option value="AU" style={{ backgroundColor: '#0c0c10' }}>Australia</option>
                        <option value="DE" style={{ backgroundColor: '#0c0c10' }}>Germany</option>
                        <option value="FR" style={{ backgroundColor: '#0c0c10' }}>France</option>
                        <option value="ES" style={{ backgroundColor: '#0c0c10' }}>Spain</option>
                        <option value="IT" style={{ backgroundColor: '#0c0c10' }}>Italy</option>
                        <option value="NL" style={{ backgroundColor: '#0c0c10' }}>Netherlands</option>
                        <option value="SE" style={{ backgroundColor: '#0c0c10' }}>Sweden</option>
                        <option value="NO" style={{ backgroundColor: '#0c0c10' }}>Norway</option>
                        <option value="DK" style={{ backgroundColor: '#0c0c10' }}>Denmark</option>
                        <option value="FI" style={{ backgroundColor: '#0c0c10' }}>Finland</option>
                        <option value="IE" style={{ backgroundColor: '#0c0c10' }}>Ireland</option>
                        <option value="CH" style={{ backgroundColor: '#0c0c10' }}>Switzerland</option>
                        <option value="AT" style={{ backgroundColor: '#0c0c10' }}>Austria</option>
                        <option value="BE" style={{ backgroundColor: '#0c0c10' }}>Belgium</option>
                        <option value="PT" style={{ backgroundColor: '#0c0c10' }}>Portugal</option>
                        <option value="PL" style={{ backgroundColor: '#0c0c10' }}>Poland</option>
                        <option value="CZ" style={{ backgroundColor: '#0c0c10' }}>Czech Republic</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={shippingLoading}
                      style={{
                        width: '100%',
                        backgroundColor: shippingLoading ? 'rgba(233,69,96,0.5)' : '#e94560',
                        border: 'none',
                        color: 'white',
                        padding: '14px',
                        borderRadius: '10px',
                        fontWeight: 600,
                        fontSize: '15px',
                        cursor: shippingLoading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      {shippingLoading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Calculating...</> : 'Calculate Shipping'}
                    </button>
                  </form>
                )}

                {/* Shipping Options + Pay Button */}
                {shippingOptions && selectedShipping && (
                  <div style={{ marginTop: '12px' }}>
                    {shippingOptions.length > 1 && (
                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ color: '#71717a', fontSize: '13px', marginBottom: '8px' }}>Shipping Method:</p>
                        {shippingOptions.map(opt => (
                          <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', border: selectedShipping.id === opt.id ? '1px solid #e94560' : '1px solid rgba(255,255,255,0.1)', backgroundColor: selectedShipping.id === opt.id ? 'rgba(233,69,96,0.1)' : 'transparent', marginBottom: '6px', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="shipping"
                              checked={selectedShipping.id === opt.id}
                              onChange={() => setSelectedShipping(opt)}
                              style={{ accentColor: '#e94560' }}
                            />
                            <span style={{ color: 'white', fontSize: '14px', flex: 1 }}>{opt.label}</span>
                            <span style={{ color: '#e94560', fontWeight: 600, fontSize: '14px' }}>${opt.cost.toFixed(2)}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                      style={{
                        width: '100%',
                        backgroundColor: checkoutLoading ? 'rgba(233,69,96,0.5)' : '#e94560',
                        border: 'none',
                        color: 'white',
                        padding: '14px',
                        borderRadius: '10px',
                        fontWeight: 600,
                        fontSize: '15px',
                        cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      {checkoutLoading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</> : `Pay $${(cartSubtotal + selectedShipping.cost).toFixed(2)}`}
                    </button>
                    <button
                      onClick={() => { setShippingOptions(null); setSelectedShipping(null); setShowAddressForm(true); }}
                      style={{ width: '100%', background: 'none', border: 'none', color: '#71717a', fontSize: '13px', marginTop: '8px', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Change address
                    </button>
                  </div>
                )}

                <p style={{ color: '#71717a', fontSize: '12px', marginTop: '12px', textAlign: 'center' }}>Taxes calculated at checkout</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      {cart.length > 0 && !showCart && (
        <button
          onClick={() => setShowCart(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#e94560',
            border: 'none',
            color: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(233,69,96,0.4)',
            zIndex: 50
          }}
        >
          <ShoppingCart size={24} />
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            backgroundColor: 'white',
            color: '#e94560',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {cartItemCount}
          </span>
        </button>
      )}

      {/* Message Banner */}
      {message && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          backgroundColor: message.type === 'success' ? 'rgba(16,185,129,0.95)' : message.type === 'error' ? 'rgba(239,68,68,0.95)' : 'rgba(59,130,246,0.95)',
          color: 'white',
          padding: '14px 24px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}>
          {message.type === 'success' ? <Check size={20} /> : <X size={20} />}
          <span style={{ fontWeight: 500 }}>{message.text}</span>
          <button onClick={() => setMessage(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Hero */}
      <section style={{ padding: '0 24px', marginBottom: '64px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '20px'
          }}>
            Merch
          </h1>
          <p style={{ color: '#71717a', fontSize: '1.15rem', maxWidth: '450px', margin: '0 auto' }}>
            Premium gear designed by the DERGAMO team.
          </p>
        </div>
      </section>

      {/* Shipping Notice */}
      <section style={{ padding: '0 24px', marginBottom: '32px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Truck size={20} style={{ color: '#71717a', flexShrink: 0 }} />
            <div>
              <p style={{ color: '#71717a', fontSize: '14px' }}>Shipping available to the US and select international countries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      {!loading && products.length > 0 && (
        <section style={{ padding: '0 24px', marginBottom: '32px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {CLOTHING_FILTERS.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: activeFilter === filter.id ? '1px solid #e94560' : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: activeFilter === filter.id ? 'rgba(233,69,96,0.15)' : 'rgba(255,255,255,0.02)',
                    color: activeFilter === filter.id ? '#e94560' : '#a1a1aa',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Grid */}
      <section style={{ padding: '0 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0' }}>
              <Loader2 size={40} style={{ color: '#e94560', animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
              <p style={{ color: '#52525b' }}>Loading products...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <p style={{ color: '#71717a', marginBottom: '24px' }}>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#e94560',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <ShoppingBag size={32} style={{ color: '#52525b' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '8px' }}>Coming Soon</h3>
              <p style={{ color: '#52525b' }}>Check back soon for official DERGAMO merchandise.</p>
            </div>
          ) : getFilteredProducts().length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: '#71717a' }}>No products found in this category.</p>
              <button
                onClick={() => setActiveFilter('all')}
                style={{
                  marginTop: '16px',
                  backgroundColor: '#e94560',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                View All Products
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
              gap: '20px'
            }}>
              {getFilteredProducts().map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  getProductImage={getProductImage}
                  getProductPrice={getProductPrice}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                  onShowDetails={setSelectedProduct}
                  cartItems={cart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '0 24px', marginTop: '100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '48px'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '40px', textAlign: 'center' }}>
              How It Works
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: 'rgba(233,69,96,0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: '#e94560',
                  fontWeight: 600
                }}>
                  1
                </div>
                <p style={{ color: '#71717a', fontSize: '14px' }}>Browse our collection</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: 'rgba(233,69,96,0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: '#e94560',
                  fontWeight: 600
                }}>
                  2
                </div>
                <p style={{ color: '#71717a', fontSize: '14px' }}>Secure checkout via Stripe</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: 'rgba(233,69,96,0.1)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: '#e94560',
                  fontWeight: 600
                }}>
                  3
                </div>
                <p style={{ color: '#71717a', fontSize: '14px' }}>Printed & shipped to you</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
