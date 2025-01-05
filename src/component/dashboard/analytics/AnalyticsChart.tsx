import { useMemo } from 'react';
import { SxProps, useTheme } from '@mui/material';
import * as echarts from 'echarts/core';
import ReactEchart from '../../../base/ReactEchart';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GraphicComponent,
} from 'echarts/components';

echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GraphicComponent,
  CanvasRenderer,
]);

interface AnalyticsChartProps {
  data: {
    id: number | string;
    value: number;
    name: string;
  }[];
  sx?: SxProps;
}

const AnalyticsChart = ({ data, ...rest }: AnalyticsChartProps) => {
  const theme = useTheme();
  let qTaskWithoutExpired = 0;
  let qTaskExpired = 0;
  data.forEach(task => {
    if (task.name == 'Expired') {
      qTaskWithoutExpired += task.value;
    }
    qTaskExpired += task.value;
  })

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: '0%',
        itemGap: 35,
        icon: 'roundRect',
        itemWidth: 15,
        itemHeight: 15,
        textStyle: {
          padding: [0, 0, 0, 5],
          fontSize: theme.typography.body2.fontSize,
          color: theme.palette.text.primary,
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['60%', '80%'],
          avoidLabelOverlap: false,
          startAngle: 90,
          label: {
            show: false,
          },
          data: data.map((item) => {
            return {
              ...item,
              itemStyle: {
                color:
                  item.id === 1
                    ? theme.palette.secondary.main
                    : item.id === 2
                      ? theme.palette.warning.main
                      : item.id === 3
                        ? theme.palette.error.light
                        : 'transparent',
                borderRadius: [100, 100, 15, 15],
              },
              tooltip: {
                show: item.id === 4 ? false : true,
              },
            };
          }),
          z: 1,
        },
        {
          type: 'pie',
          radius: ['68%', '80%'],
          silent: true,
          label: {
            show: false,
          },
          data: [
            {
              value: 1,
              name: '',
              itemStyle: {
                color: '#f7f9ff',
              },
            },
          ],
          z: 0,
        },
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: qTaskExpired === 0 ? 0 : Math.floor(qTaskWithoutExpired / qTaskExpired * 100) + '%',
            fontWeight: 600,
            textAlign: 'center',
            fontSize: theme.typography.h2.fontSize,
            fill: theme.palette.text.primary,
          },
        },
        {
          type: 'text',
          left: 'center',
          top: '60%',
          style: {
            text: 'Tasks Expried',
            textAlign: 'center',
            fontSize: theme.typography.body1.fontSize,
          },
        },
      ],
    }),
    [theme, data],
  );

  return <ReactEchart echarts={echarts} option={option} {...rest} />;
};

export default AnalyticsChart;
