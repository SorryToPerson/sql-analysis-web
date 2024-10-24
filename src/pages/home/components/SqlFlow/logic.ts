import { Graph } from '@antv/x6';
import { COLOR_MAP, LINE_HEIGHT, NODE_WIDTH } from './SqlFlowView';

export const initGraph = () => {
  Graph.registerPortLayout(
    'erPortPosition',
    (portsPositionArgs) => {
      return portsPositionArgs.map((_, index) => {
        return {
          position: {
            x: 0,
            y: (index + 1) * LINE_HEIGHT,
          },
          angle: 0,
        };
      });
    },
    true,
  );

  Graph.registerNode(
    'sourceTable',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
          attrs: {
            cursor: 'pointer',
          },
        },
        {
          tagName: 'text',
          selector: 'label',
          attrs: {
            cursor: 'pointer',
          },
        },
      ],
      attrs: {
        rect: {
          strokeWidth: 1,
          stroke: COLOR_MAP.sourceTable.primary,
          fill: COLOR_MAP.sourceTable.primary,
        },
        label: {
          fontWeight: 'bold',
          fill: COLOR_MAP.fontColor,
          fontSize: 12,
        },
      },
      ports: {
        groups: {
          list: {
            markup: [
              {
                tagName: 'rect',
                selector: 'portBody',
              },
              {
                tagName: 'text',
                selector: 'portNameLabel',
              },
              {
                tagName: 'text',
                selector: 'portTypeLabel',
              },
            ],
            attrs: {
              portBody: {
                width: NODE_WIDTH,
                height: LINE_HEIGHT,
                strokeWidth: 1,
                stroke: COLOR_MAP.sourceTable.primary,
                fill: COLOR_MAP.sourceTable.bg,
                magnet: true,
              },
              portNameLabel: {
                ref: 'portBody',
                refX: 6,
                refY: 6,
                fontSize: 10,
              },
              portTypeLabel: {
                ref: 'portBody',
                refX: 95,
                refY: 6,
                fontSize: 10,
              },
            },
            position: 'erPortPosition',
          },
        },
      },
    },
    true,
  );

  Graph.registerNode(
    'targetTable',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
          attrs: {
            cursor: 'pointer',
          },
        },
        {
          tagName: 'text',
          selector: 'label',
          attrs: {
            cursor: 'pointer',
          },
        },
      ],
      attrs: {
        rect: {
          strokeWidth: 1,
          stroke: COLOR_MAP.targetTable.primary,
          fill: COLOR_MAP.targetTable.primary,
        },
        label: {
          fontWeight: 'bold',
          fill: COLOR_MAP.fontColor,
          fontSize: 12,
        },
      },
      ports: {
        groups: {
          list: {
            markup: [
              {
                tagName: 'rect',
                selector: 'portBody',
              },
              {
                tagName: 'text',
                selector: 'portNameLabel',
              },
              {
                tagName: 'text',
                selector: 'portTypeLabel',
              },
            ],
            attrs: {
              portBody: {
                width: NODE_WIDTH,
                height: LINE_HEIGHT,
                strokeWidth: 1,
                stroke: COLOR_MAP.targetTable.primary,
                fill: COLOR_MAP.targetTable.bg,
                magnet: true,
              },
              portNameLabel: {
                ref: 'portBody',
                refX: 6,
                refY: 6,
                fontSize: 10,
              },
              portTypeLabel: {
                ref: 'portBody',
                refX: 95,
                refY: 6,
                fontSize: 10,
              },
            },
            position: 'erPortPosition',
          },
        },
      },
    },
    true,
  );

  Graph.registerNode(
    'selectColumns',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
          attrs: {
            cursor: 'pointer',
          },
        },
        {
          tagName: 'text',
          selector: 'label',
          attrs: {
            cursor: 'pointer',
          },
        },
      ],
      attrs: {
        rect: {
          strokeWidth: 1,
          stroke: COLOR_MAP.selectColumns.primary,
          fill: COLOR_MAP.selectColumns.primary,
        },
        label: {
          fontWeight: 'bold',
          fill: COLOR_MAP.fontColor,
          fontSize: 12,
        },
      },
      ports: {
        groups: {
          list: {
            markup: [
              {
                tagName: 'rect',
                selector: 'portBody',
              },
              {
                tagName: 'text',
                selector: 'portNameLabel',
              },
              {
                tagName: 'text',
                selector: 'portTypeLabel',
              },
            ],
            attrs: {
              portBody: {
                width: NODE_WIDTH,
                height: LINE_HEIGHT,
                strokeWidth: 1,
                stroke: COLOR_MAP.selectColumns.primary,
                fill: COLOR_MAP.selectColumns.bg,
                magnet: true,
              },
              portNameLabel: {
                ref: 'portBody',
                refX: 6,
                refY: 6,
                fontSize: 10,
              },
              portTypeLabel: {
                ref: 'portBody',
                refX: 95,
                refY: 6,
                fontSize: 10,
              },
            },
            position: 'erPortPosition',
          },
        },
      },
    },
    true,
  );

  Graph.registerNode(
    'viewTable',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
          attrs: {
            cursor: 'pointer',
          },
        },
        {
          tagName: 'text',
          selector: 'label',
          attrs: {
            cursor: 'pointer',
          },
        },
      ],
      attrs: {
        rect: {
          strokeWidth: 1,
          stroke: COLOR_MAP.viewTable.primary,
          fill: COLOR_MAP.viewTable.primary,
        },
        label: {
          fontWeight: 'bold',
          fill: COLOR_MAP.fontColor,
          fontSize: 12,
        },
      },
      ports: {
        groups: {
          list: {
            markup: [
              {
                tagName: 'rect',
                selector: 'portBody',
              },
              {
                tagName: 'text',
                selector: 'portNameLabel',
              },
              {
                tagName: 'text',
                selector: 'portTypeLabel',
              },
            ],
            attrs: {
              portBody: {
                width: NODE_WIDTH,
                height: LINE_HEIGHT,
                strokeWidth: 1,
                stroke: COLOR_MAP.viewTable.primary,
                fill: COLOR_MAP.viewTable.bg,
                magnet: true,
              },
              portNameLabel: {
                ref: 'portBody',
                refX: 6,
                refY: 6,
                fontSize: 10,
              },
              portTypeLabel: {
                ref: 'portBody',
                refX: 95,
                refY: 6,
                fontSize: 10,
              },
            },
            position: 'erPortPosition',
          },
        },
      },
    },
    true,
  );
};
