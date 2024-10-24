import React, { useEffect, useRef, useState } from 'react';
import { Select, Space, Button, message } from 'antd';
import AceEditor, { IAceEditorProps } from 'react-ace';
import * as sqlFormatter from 'sql-formatter';
import { useSqlStore } from '@/models/sql';
import { parse } from '@/services/common';
import { Range } from 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/mode-mysql';
import './index.less';

interface ICodeEditor extends IAceEditorProps {
  disabled?: boolean;
}

export default React.forwardRef((props: ICodeEditor) => {
  const { mode, height, width, name, theme, placeholder, value, onChange, disabled = false, ...rest } = props;
  const editorRef = useRef<AceEditor>(null);
  const highlightWords = useSqlStore((state) => state.highlightWords);
  const highlightTableWords = useSqlStore((state) => state.highlightTableWords);
  const highlightFeildWords = useSqlStore((state) => state.highlightFeildWords);
  const mockData = useSqlStore((state) => state.mockData);
  const loading = useSqlStore((state) => state.loading);
  const curMockData = useSqlStore((state) => state.curMockData);
  const [sqlValue, setSqlValue] = useState(curMockData.data.sql);

  const handleClick = async () => {
    if (mockData.find((item) => item.data.sql === sqlValue)) {
      useSqlStore.setState({
        loading: true,
      });
      const obj = mockData.find((item) => item.data.sql === sqlValue);
      setTimeout(() => {
        useSqlStore.setState({
          curMockData: obj,
          sqlInfo: {
            desc: '',
            graph: undefined,
            lineage: undefined,
            sql: '',
          },
        });
        obj?.data?.sql && setSqlValue(obj.data.sql);
        useSqlStore.setState({
          loading: false,
        });
      }, 2000);
    } else {
      useSqlStore.setState({
        loading: true,
      });
      const res = await parse({
        originalSql: sqlValue,
      }).finally(() =>
        useSqlStore.setState({
          loading: false,
        }),
      );

      if (res.code === '0') {
        console.log(res.data);
        useSqlStore.setState({
          sqlInfo: res.data,
        });
      } else {
        message.error('服务端异常，请稍后再试');
      }
    }
  };

  const handleChange = (v: any) => {
    setSqlValue(v);
  };

  const handleHighlightWords = (words: string[], tableWords: string[], feildWords: string[]) => {
    const editor = editorRef.current?.editor;
    if (!editor) return;

    const session = editor.getSession();

    // 清除现有的 markers
    const markers = session.getMarkers();
    Object.keys(markers).forEach((key: any) => {
      if (['highlight-marker', 'highlight-table', 'highlight-feild'].includes(markers[key].clazz)) {
        session.removeMarker(markers[key].id);
      }
    });

    // 为每个单词添加新的 marker
    feildWords.forEach((word) => {
      const content = session.getValue();
      let match;
      const regex = new RegExp(word, 'g');

      while ((match = regex.exec(content)) !== null) {
        const startPosition = session.doc.indexToPosition(match.index, 0);
        const endPosition = session.doc.indexToPosition(match.index + word.length, 0);
        const range = new Range(startPosition.row, startPosition.column, endPosition.row, endPosition.column);
        session.addMarker(range, 'highlight-feild', 'text');
      }
    });

    // 为每个单词添加新的 marker
    tableWords.forEach((word) => {
      const content = session.getValue();
      let match;
      const regex = new RegExp(word, 'g');

      while ((match = regex.exec(content)) !== null) {
        const startPosition = session.doc.indexToPosition(match.index, 0);
        const endPosition = session.doc.indexToPosition(match.index + word.length, 0);
        const range = new Range(startPosition.row, startPosition.column, endPosition.row, endPosition.column);
        session.addMarker(range, 'highlight-table', 'text');
      }
    });

    // 为每个单词添加新的 marker
    words.forEach((word) => {
      const content = session.getValue();
      let match;
      const regex = new RegExp(word, 'g');
      while ((match = regex.exec(content)) !== null) {
        const startPosition = session.doc.indexToPosition(match.index, 0);
        const endPosition = session.doc.indexToPosition(match.index + word.length, 0);
        const range = new Range(startPosition.row, startPosition.column, endPosition.row, endPosition.column);
        session.addMarker(range, 'highlight-marker', 'text');
      }
    });
  };

  const handleSelectChange = (v: string) => {
    const obj = mockData.find((item) => item.name === v);
    if (obj) {
      setSqlValue(obj?.data.sql ?? '');
      useSqlStore.setState({
        curMockData: {
          name: obj?.name,
          data: {
            desc: '',
            graph: undefined,
            lineage: undefined,
            sql: '',
          },
        },
      });
    }
  };

  useEffect(() => {
    handleHighlightWords(highlightWords, highlightTableWords, highlightFeildWords);
  }, [highlightWords, highlightTableWords, highlightFeildWords]);

  return (
    <div className="code-editor">
      <div className="code-editor-tool">
        <Space>
          <Select
            style={{
              width: 200,
            }}
            options={mockData.map((item) => ({
              label: item.name,
              value: item.name,
            }))}
            value={curMockData.name}
            onChange={handleSelectChange}
          />
          <Button loading={loading} onClick={handleClick}>
            执行
          </Button>
        </Space>
      </div>
      <AceEditor
        ref={editorRef}
        width="100%"
        mode="mysql"
        theme="tomorrow"
        placeholder=""
        onChange={handleChange}
        name="ace-editor"
        value={sqlValue}
        editorProps={{ $blockScrolling: true }}
        fontSize={14}
        showGutter // 显示行号
        highlightActiveLine
        showPrintMargin={false}
        setOptions={{
          enableBasicAutocompletion: true, // 启用基本自动完成功能
          enableLiveAutocompletion: true, // 启用实时自动完成功能 （比如：智能代码提示）
          enableSnippets: true, // 启用代码段
          showLineNumbers: true,
          showGutter: true,
          tabSize: 2,
          useWorker: false,
        }}
        readOnly={disabled}
        debounceChangePeriod={500} // 防抖时间
        {...rest}
      />
    </div>
  );
});
