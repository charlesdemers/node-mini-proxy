const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const host = process.env.HOST;
const target = process.env.TARGET_URL;

if (!host) throw new Error('==> No host provided, add `HOST=<local IP address>` in your .env file');
if (!target) throw new Error('==> No target provided, add `TARGET_URL=https://example.com` in your .env file');

const app = express();

app.use(morgan('dev'));

app.get('/health', (req, res, next) => {
  res.sendStatus(200);
});

app.use('/', createProxyMiddleware({
  target,
  changeOrigin: true,
}));

app.listen(port, host, () => {
  console.log(`==> Starting proxy at ${host}:${port}`);
});
