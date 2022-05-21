const path = require('path');
const fsp = require('fs/promises');
const express = require('express');

const isProduction = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();
  /**
   * @type {import("vite").ViteDevServer}
   */
  let vite;

  if (!isProduction) {
    vite = await require('vite').createServer({
      root: process.cwd(),
      server: { middlewareMode: 'ssr' },
    });

    app.use(vite.middlewares);
  } else {
    app.use(require('compression')());
    app.use(express.static(path.join(__dirname, 'dist')));
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    // Use a separate HTML file for the "Inbox" app.
    const appDirectory = url.startsWith('/admin') ? 'admin' : '';
    let htmlFileToLoad;

    if (isProduction) {
      htmlFileToLoad = path.join('dist', appDirectory, 'index.html');
    }
    else {
      htmlFileToLoad = path.join(appDirectory, 'index.html');
    }

    try {
      let html = await fsp.readFile(
        path.join(__dirname, htmlFileToLoad),
        'utf8'
      );

      if (!isProduction) {
        html = await vite.transformIndexHtml(req.url, html);
      }

      res.setHeader('Content-Type', 'text/html');
      return res.status(200).end(html);
    } catch (error) {
      if (!isProduction) vite.ssrFixStacktrace(error);
      console.log(error.stack);
      return res.status(500).end(error.stack);
    }
  });

  return app;
}

createServer().then((app) => {
  app.listen(3000, () => {
    console.log('HTTP server is running at http://localhost:3000');
  });
});
