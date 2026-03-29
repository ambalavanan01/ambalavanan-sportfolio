import React from 'react';
import { defaultMeta, defaultOgImage, siteName, toAbsoluteUrl, type SeoMeta } from '../seo';

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
};

const Seo: React.FC<{ meta?: SeoMeta }> = ({ meta = defaultMeta }) => {
  React.useEffect(() => {
    const title = meta.title || defaultMeta.title;
    const description = meta.description || defaultMeta.description;
    const canonical = toAbsoluteUrl(meta.canonicalPath || defaultMeta.canonicalPath);
    const ogImage = toAbsoluteUrl(meta.ogImage || defaultOgImage);
    const robots = meta.noindex ? 'noindex, nofollow' : 'index, follow';

    document.title = title;
    upsertMeta('meta[name="title"]', { name: 'title', content: title });
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:url"]', { name: 'twitter:url', content: canonical });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage });
    upsertLink('canonical', canonical);

    const schemaId = 'route-schema';
    const existing = document.getElementById(schemaId);
    if (existing) {
      existing.remove();
    }

    if (meta.schema) {
      const script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(meta.schema);
      document.head.appendChild(script);
    }
  }, [meta]);

  return null;
};

export default Seo;
