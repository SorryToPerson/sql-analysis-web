import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: 'home',
    },
  ],
  npmClient: 'npm',
  favicons: ['/favicon.ico'],
  hash: true,
  devtool: 'source-map',
  theme: {
    'primary-color': '#7f56d9',
    'border-radius-base': '6px',
  },
  proxy: {
    '/api': {
      target: 'http://4246041-sql-analysis.test.za.biz',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
});
