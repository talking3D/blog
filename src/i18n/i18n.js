// Only one item MUST have the "default: true" key
exports.locales = {
  en: {
    default: true,
    path: `en`,
    locale: `en-GB`,
    siteLanguage: `en`,
    ogLanguage: `en_GB`,
  },
  pl: {
    path: `pl`,
    locale: `pl-PL`,
    siteLanguage: `pl`,
    ogLanguage: `pl_PL`,
  },
};

// for route purposes we need path not to be slash-ended
exports.removeTrailingSlash = (path) => (path === '/' ? path : path.replace(/\/$/, ``));

// Creates localized slug accordingly to choosel language
exports.localizedSlug = ({ isDefault, locale, slug }) => (isDefault ? `/blog/${slug}` : `/${locale}/blog/${slug}`);

// From lodash:
// https://github.com/lodash/lodash/blob/750067f42d3aa5f927604ece2c6df0ff2b2e9d72/findKey.js
exports.findKey = (object, predicate) => {
  let result;
  if (object === null) {
    return result;
  }
  Object.keys(object).some((key) => {
    const value = object[key];
    if (predicate(value, key, object)) {
      result = key;
      return true;
    }
  });
  return result;
};
