// @ts-nocheck
import { Graph, Cell } from '@antv/x6';
import { DagreLayout } from '@antv/layout';
import { useCallback, useEffect, useRef } from 'react';
import { initGraph } from './logic';
import { useSqlStore } from '@/models/sql';
import { debounce, throttle } from 'lodash';

export const LINE_HEIGHT = 24;
export const NODE_WIDTH = 220;
export const COLOR_MAP = {
  fontColor: '#ffffff',
  hoverBg: '#e5c2ff',
  activeBg: '#1febf6',
  defaultBg: '#ebfdec',
  defaultEdge: '#A2B1C3',
  sourceTable: {
    primary: '#fa541c',
    bg: '#fff2e8',
  },
  targetTable: {
    primary: '#a0d911',
    bg: '#fcffe6',
  },
  selectColumns: {
    primary: '#1677ff',
    bg: '#e6f4ff',
  },
  viewTable: {
    primary: '#eb2f96',
    bg: '#fff0f6',
  },
};

// 初始化画布
initGraph();

function SqlFlowView2() {
  const graphRef = useRef<Graph>();
  const sqlInfo = useSqlStore((state) => state.sqlInfo);
  const curMockData = useSqlStore((state) => state.curMockData);

  const init = () => {
    graphRef.current = new Graph({
      container: document.getElementById('container')!,
      autoResize: true,
      panning: true,
      mousewheel: true,
      // background: {
      //   color: '#eee',
      // },
      // grid: {
      //   visible: true,
      //   type: 'doubleMesh',
      //   args: [
      //     {
      //       color: '#eee', // 主网格线颜色
      //       thickness: 1, // 主网格线宽度
      //     },
      //     {
      //       color: '#ddd', // 次网格线颜色
      //       thickness: 1, // 次网格线宽度
      //       factor: 4, // 主次网格线间隔
      //     },
      //   ],
      // },

      interacting: {
        nodeMovable: true, // 节点是否可以被移动
        vertexAddable: false, // 边的路径点是否可以被删除
        vertexDeletable: false, // 是否可以添加边的路径点
        vertexMovable: false, // 边的路径点是否可以被移动
        arrowheadMovable: false, // 边的起始/终止箭头（在使用 arrowhead 工具后）是否可以被移动
        edgeLabelMovable: false, // 边的标签是否可以被移动
        edgeMovable: false, // 边是否可以被移动
        magnetConnectable: false, // 当在具有 magnet 属性的元素上按下鼠标开始拖动时，是否触发连线交互。
      },
      connecting: {
        router: {
          name: 'er',
          args: {
            offset: 25,
            direction: 'H',
          },
        },
      },
    });
  };

  // 处理数据绘制图表
  const generate = (data: any) => {
    const cells: Cell[] = [];

    let num = 1;

    const res1 = data.source.map((item, index) => {
      if (num < item?.columns?.length) {
        num = item?.columns?.length;
      }
      return {
        id: item.name,
        shape: item.type,
        label: item.name,
        width: NODE_WIDTH,
        height: LINE_HEIGHT,
        ports: item?.columns?.map((_item) => ({
          id: item.name + '&' + _item,
          group: 'list',
          attrs: {
            portNameLabel: {
              text: _item,
            },
          },
        })),
      };
    });
    const res2 = data.statements.map((item, index) => {
      if (item?.mappings?.length > 0) {
        return [
          ...item?.mappings.map((_item, _index) => {
            return {
              id: index + '-' + _index,
              shape: 'edge',
              source: {
                cell: item.source,
                port: item.source + '&' + _item.sourceColumn,
              },
              target: {
                cell: item.target,
                port: item.target + '&' + _item.targetColumn,
              },
              connector: { name: 'rounded' },
              attrs: {
                line: {
                  stroke: COLOR_MAP.defaultEdge,
                  strokeWidth: 1,
                  // sourceMarker: {
                  //   name: 'circle',
                  //   size: 2,
                  // },
                  targetMarker: {
                    name: 'classic',
                    size: 6,
                  },
                },
              },
              zIndex: 0,
            };
          }),
        ];
      } else {
        return [
          {
            id: index,
            shape: 'edge',
            source: {
              cell: item.source,
            },
            target: {
              cell: item.target,
            },
            connector: { name: 'rounded' },
            attrs: {
              line: {
                stroke: COLOR_MAP.defaultEdge,
                strokeWidth: 1,
                // sourceMarker: {
                //   name: 'circle',
                //   size: 2,
                // },
                targetMarker: {
                  name: 'classic',
                  size: 6,
                },
              },
            },
            zIndex: 0,
          },
        ];
      }
    });

    [...res1, ...res2.flat(Infinity)].forEach((item: any) => {
      if (item.shape === 'edge') {
        cells.push(graphRef.current?.createEdge(item));
      } else {
        cells.push(graphRef.current?.createNode(item));
      }
    });

    console.log('renderCells', cells);

    // 渲染图形
    graphRef.current?.clearCells();
    graphRef.current?.resetCells(cells);
    graphRef.current?.centerPoint();

    applyDagreLayout(graphRef.current, num);
  };

  // 自动排布
  const applyDagreLayout = (graph: Graph, num: number) => {
    const nodes = graph.getNodes();
    const edges = graph.getEdges();

    const dagreLayout = new DagreLayout({
      type: 'dagre',
      rankdir: 'LR',
      align: 'UL',
      ranksep: 80,
      nodesep: num * 8,
      controlPoints: true,
    });

    const model = {
      nodes: nodes.map((node) => ({
        id: node.id,
        width: node.size().width,
        height: node.size().height,
      })),
      edges: edges.map((edge) => ({
        source: edge.getSourceCellId(),
        target: edge.getTargetCellId(),
      })),
    };

    const newPositions = dagreLayout.layout(model);

    newPositions.nodes.forEach((node) => {
      const cell = graph.getCellById(node.id);
      if (cell.isNode()) {
        // @ts-ignore
        cell.setPosition(node.x, node.y);
      }
    });

    graph.centerPoint();
  };

  // 往前找关联节点
  const highlightRelatedCellPrev = (cell, port, arr) => {
    cell.setPortProp(port, 'attrs/rect', {
      fill: COLOR_MAP.hoverBg,
    });
    const connectedEdges = graphRef.current?.getConnectedEdges(cell, { incoming: true }).filter((edge) => edge.getSourcePortId() === port || edge.getTargetPortId() === port);
    const edge = connectedEdges[0];
    if (!edge) return;
    // 高亮边
    edge.attr('line/stroke', COLOR_MAP.hoverBg);
    edge.attr('line/strokeWidth', 4);

    // 高亮边的源端口和目标端口
    const sourceCell = edge.getSourceCell();
    const sourcePort = edge.getSourcePortId();

    if (sourceCell && sourcePort && sourceCell.isNode()) {
      highlightRelatedCellPrev(sourceCell, sourcePort, arr);
    }

    let str1 = sourcePort;
    const arr2 = str1.split('&');

    arr.push([
      {
        type: 'table',
        value: arr2[0],
      },
      {
        type: 'feild',
        value: arr2[1],
      },
    ]);
  };

  // 往后找关联节点
  const highlightRelatedCellNext = (cell, port, arr) => {
    cell.setPortProp(port, 'attrs/rect', {
      fill: COLOR_MAP.hoverBg,
    });
    const connectedEdges = graphRef.current?.getConnectedEdges(cell, { outgoing: true }).filter((edge) => edge.getSourcePortId() === port || edge.getTargetPortId() === port);
    const edge = connectedEdges[0];
    if (!edge) return;

    // 高亮边
    edge.attr('line/stroke', COLOR_MAP.hoverBg);
    edge.attr('line/strokeWidth', 4);

    // 高亮边的源端口和目标端口
    const targetCell = edge.getTargetCell();
    const targetPort = edge.getTargetPortId();

    if (targetCell && targetPort && targetCell.isNode()) {
      highlightRelatedCellNext(targetCell, targetPort, arr);
    }

    let str2 = targetPort;
    const arr2 = str2.split('&');

    arr.push([
      {
        type: 'table',
        value: arr2[0],
      },
      {
        type: 'feild',
        value: arr2[1],
      },
    ]);
  };

  const highlightRef = useRef('');
  const handlePortMouseEnter = ({ node, view, cell, port }) => {
    if (highlightRef.current === port) {
      console.log('=======================>', highlightRef.current);
      return;
    }

    highlightRef.current = port;

    handleGraphMouseEnter();

    console.log('+++++++++++++++++++++++>', highlightRef.current);

    let str3 = port;
    const arr2 = str3?.split('&');

    let arr = [{ type: 'table', value: arr2[0] }];

    highlightRelatedCellPrev(cell, port, arr);
    highlightRelatedCellNext(cell, port, arr);

    useSqlStore.setState({
      highlightWords: [arr2[1]],
      highlightTableWords: arr
        .flat(Infinity)
        .filter((item) => item.type === 'table')
        .map((item) => item.value),
      highlightFeildWords: arr
        .flat(Infinity)
        .filter((item) => item.type === 'feild')
        .map((item) => item.value),
    });
  };

  const handleGraphMouseEnter = () => {
    console.log('handleGraphMouseEnter');

    useSqlStore.setState({
      highlightWords: [],
      highlightTableWords: [],
      highlightFeildWords: [],
    });
    const cells = graphRef.current?.getCells();
    const edges = graphRef.current?.getEdges();
    cells?.forEach((c) => {
      if (c.isNode()) {
        const ports = c.getPorts();
        ports.forEach((p) => {
          c.setPortProp(p.id, 'attrs/rect', {
            fill: COLOR_MAP[c.shape].bg,
          });
        });
      }
    });
    edges?.forEach((e) => {
      e.attr('line/stroke', COLOR_MAP.defaultEdge);
      e.attr('line/strokeWidth', 1);
    });
  };

  const handleNodeMouseLeave = () => {
    highlightRef.current = '';
    handleGraphMouseEnter();
  };

  useEffect(() => {
    if (graphRef.current) {
      if (sqlInfo.graph && Object.keys(sqlInfo.graph).length > 0) {
        console.log('render sqlInfo', sqlInfo);
        generate(sqlInfo.graph);
      } else {
        if (curMockData?.data?.graph) {
          console.log('render curMockData', curMockData);
          generate(curMockData.data.graph);
        }
      }

      graphRef.current?.on('node:port:mouseenter', handlePortMouseEnter);
      graphRef.current?.on('graph:mouseenter', handleGraphMouseEnter);
      graphRef.current?.on('node:mouseleave', handleNodeMouseLeave);
      return () => {
        graphRef.current?.off('node:port:mouseenter', handlePortMouseEnter);
        graphRef.current?.off('graph:mouseenter', handleGraphMouseEnter);
        graphRef.current?.off('node:mouseleave', handleNodeMouseLeave);
      };
    }
  }, [sqlInfo, curMockData]);

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {(sqlInfo.desc || curMockData?.data.desc) && (
        <div
          className="desc"
          style={{
            padding: 16,
            fontSize: 16,
          }}
        >
          {sqlInfo.desc || curMockData?.data.desc}
        </div>
      )}
      <div id="container" />
    </div>
  );
}

export default SqlFlowView2;
