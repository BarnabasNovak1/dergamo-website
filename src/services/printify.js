// Use Firebase Functions to proxy Printify API (avoids CORS issues)
const FUNCTIONS_BASE_URL = 'https://us-central1-dergamo-821e7.cloudfunctions.net';

export async function getShops() {
  try {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/getShops`);
    if (!response.ok) throw new Error('Failed to fetch shops');
    return await response.json();
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error;
  }
}

export async function getProducts(shopId) {
  try {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/getProducts?shopId=${shopId}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProduct(shopId, productId) {
  try {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/getProduct?shopId=${shopId}&productId=${productId}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}
