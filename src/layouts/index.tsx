import { useState } from 'react';
import { ConfigProvider } from 'antd';
import { Routes, Route } from 'react-router-dom';
import routes from '@/router';
import './index.less';

function Layouts() {
  return (
    <ConfigProvider
      theme={{
        // 主题定制
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#7f56d9',
          borderRadius: 8,

          // 派生变量，影响范围小
          // colorBgContainer: '#f6ffed',
        },
      }}
    >
      <Routes>
        {routes.map((item: any) => (
          <Route key={item.path} {...item} />
        ))}
      </Routes>
    </ConfigProvider>
  );
}

export default Layouts;
