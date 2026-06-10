import { useEffect } from 'react';

export default function SEO({ 
  title, 
  description, 
  keywords = '',
  image = '/dergamo-light.jpeg',
  url = '',
  type = 'website'
}) {
  const siteTitle = 'DERGAMO LLC';
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | AI, Creative Technology & Digital Experiences`;
  const fullUrl = url ? `https://dergamo.com${url}` : 'https://dergamo.com';
  const fullImage = image.startsWith('http') ? image : `https://dergamo.com${image}`;

  useEffect(() => {
    document.title = fullTitle;
    
    const updateMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    if (description) {
      updateMeta('description', description);
      updateMeta('og:description', description, true);
      updateMeta('twitter:description', description);
    }

    if (keywords) {
      updateMeta('keywords', keywords);
    }

    updateMeta('og:title', fullTitle, true);
    updateMeta('og:url', fullUrl, true);
    updateMeta('og:image', fullImage, true);
    updateMeta('og:type', type, true);
    
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:url', fullUrl);
    updateMeta('twitter:image', fullImage);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    }
  }, [fullTitle, description, keywords, fullUrl, fullImage, type]);

  return null;
}
