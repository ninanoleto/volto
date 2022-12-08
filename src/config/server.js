import imagesMiddleware from '@plone/volto/express-middleware/images';
import filesMiddleware from '@plone/volto/express-middleware/files';
import robotstxtMiddleware from '@plone/volto/express-middleware/robotstxt';
import sitemapMiddleware from '@plone/volto/express-middleware/sitemap';
import devProxyMiddleware from '@plone/volto/express-middleware/devproxy';
import prefixPathMiddleware from '@plone/volto/express-middleware/prefixPath';

const settings = {
  expressMiddleware: [
    devProxyMiddleware(),
    prefixPathMiddleware(),
    filesMiddleware(),
    imagesMiddleware(),
    robotstxtMiddleware(),
    sitemapMiddleware(),
  ],
  criticalCssPath: 'public/critical.css',
  readCriticalCss: null, // so it will be defaultReadCriticalCss
  extractScripts: { errorPages: false },
};

export default settings;
