import { create } from 'zustand';
import holo from './mocks/holo.json';
import holoNode from './mocks/holoNode.json';
import holoStr from './mocks/holo';

import demo2Str from './mocks/demo2';
import demo2 from './mocks/demo2.json';
import demo2Node from './mocks/demo2Node.json';

import demo3Str from './mocks/from';
import demo3 from './mocks/from.json';
import demo3Node from './mocks/fromNode.json';

interface SqlState {
  desc: string;
  graph: any;
  lineage: any;
  sql: string;
}

const mock = [
  {
    name: 'mysql',
    data: {
      desc: '',
      graph: undefined,
      lineage: undefined,
      sql: '',
    },
  },
  {
    name: 'hologres',
    data: {
      desc: 'hologres',
      graph: holoNode,
      lineage: holo,
      sql: holoStr,
    },
  },
  {
    name: 'oracle',
    data: {
      desc: 'oracle',
      graph: demo2Node,
      lineage: demo2,
      sql: demo2Str,
    },
  },
  {
    name: 'maxcompute',
    data: {
      desc: 'maxcompute',
      graph: demo3Node,
      lineage: demo3,
      sql: demo3Str,
    },
  },
];

export const useSqlStore = create<{
  highlightWords: string[];
  highlightTableWords: string[];
  highlightFeildWords: string[];
  sqlInfo: SqlState;
  mockData: {
    name: string;
    data: SqlState;
  }[];
  curMockData: {
    name: string;
    data: SqlState;
  };
  loading: boolean;
}>(() => ({
  highlightWords: [], // 高亮词
  highlightTableWords: [], // 高亮词
  highlightFeildWords: [], // 高亮词
  sqlInfo: {
    desc: '',
    graph: undefined,
    lineage: undefined,
    sql: '',
  },
  curMockData: mock[0],
  mockData: mock,
  loading: false,
}));
