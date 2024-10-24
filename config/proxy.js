const { DEPLOY_ENV = 'dev' } = process.env || {};
const targetConfig = {
  api: {
    branch: 'http://4246041-sql-analysis.test.za.biz',
    dev: 'http://4246041-sql-analysis.test.za.biz',
    test: 'http://4246041-sql-analysis.test.za.biz',
    pre: 'http://4246041-sql-analysis.test.za.biz',
    prd: 'http://4246041-sql-analysis.test.za.biz',
  },
};

function getProxyTarget(name) {
  const config = targetConfig[name];
  // @ts-ignore
  let target = config[DEPLOY_ENV] || config.prd;
  // 应用编排配置
  if (['dev', 'test'].indexOf(DEPLOY_ENV) !== -1) {
    const envKey = name.toUpperCase();
    if (process.env[envKey]) {
      target = process.env[envKey];
      console.log('使用应用编排 =>', target);
    }
  }
  console.log(`${name} target: ${target}`);
  return target;
}

const proxyConfig = {
  '/api/': {
    target: getProxyTarget('api'),
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api/': '',
    },
  },
};

module.exports = proxyConfig;
