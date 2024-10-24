import { Splitter } from 'antd';
import CodeEditor from './components/CodeEditor';
import SqlFlow from './components/SqlFlow';
import './index.less';

function Home() {
  return (
    <div className="home">
      <Splitter>
        <Splitter.Panel defaultSize="30%" min="30%" max="70%">
          <CodeEditor />
        </Splitter.Panel>
        <Splitter.Panel>
          <SqlFlow />
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}

export default Home;
