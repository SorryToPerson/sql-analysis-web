import ReactJson from 'react-json-view';
import { useSqlStore } from '@/models/sql';

function ReactJsonView() {
  const curMockData = useSqlStore((state) => state.curMockData);
  const sqlInfo = useSqlStore((state) => state.sqlInfo);
  return <ReactJson src={sqlInfo.lineage || curMockData.data.lineage} collapsed={3} iconStyle="square" theme="monokai" />;
}

export default ReactJsonView;
