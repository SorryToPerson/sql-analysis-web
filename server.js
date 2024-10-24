const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const proxyConfig = require('./config/proxy');

const app = express();

const { DEPLOY_ENV } = process.env;

console.log('using DEPLOY_ENV =>', DEPLOY_ENV);

app.use(cookieParser());

// 服务器 部署健康验证
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// eslint-disable-next-line guard-for-in
for (const path in proxyConfig) {
  app.use(path, createProxyMiddleware(proxyConfig[path]));
}

app.use('/', express.static('dist'));

app.use((req, res) => {
  res.sendFile('dist/index.html', { root: __dirname });
});

app.disable('X-Powered-By');

const PORT = 8080;
app.listen(PORT, () => {
  console.info(`==> 🍺  app server running at localhost: ${PORT}`);
});
