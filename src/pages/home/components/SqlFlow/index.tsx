import { Tabs, Spin } from 'antd';
import type { TabsProps } from 'antd';
import ReactJsonView from './ReactJsonView';
import SqlFlowView from './SqlFlowView';
import './index.less';
import { useState } from 'react';
import { useSqlStore } from '@/models/sql';

function SqlFlow() {
  const [tab, setTab] = useState('1');
  const loading = useSqlStore((state) => state.loading);

  const onChange = (key: string) => {
    setTab(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Sql Flow',
      children: <SqlFlowView />,
    },
    {
      key: '2',
      label: 'Data Lineage',
      children: <ReactJsonView />,
    },
  ];
  return (
    <div className="sql-flow">
      <Spin spinning={loading}>
        <Tabs items={items} activeKey={tab} onChange={onChange} />
      </Spin>
    </div>
  );
}

export default SqlFlow;
