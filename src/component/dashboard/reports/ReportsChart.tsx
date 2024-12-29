import { useMemo } from 'react';
import { SxProps, useTheme } from '@mui/material';
import * as echarts from 'echarts/core';
import ReactEchart from '../../../base/ReactEchart';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { formatNumber } from '../../../helpers/formatNumber';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';

echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
]);

interface ClientChartProps {
  data: number[];
  sx?: SxProps;
}

const ReportsChart = ({ data, ...rest }: ClientChartProps) => {
  const theme = useTheme();
  let isTopOffset: boolean;

  const option = useMemo(
    () => ({
      grid: {
        top: 36,
        bottom: 36,
        left: 45,
        right: 0,
        containerLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          snap: true,
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: theme.palette.primary.main,
          },
        },
        backgroundColor: theme.palette.text.primary,
        padding: [8, 28, 8, 28],
        borderRadius: 10,
        borderWidth: 0,
        textStyle: {
          color: theme.palette.info.light,
          fontFamily: theme.typography.fontFamily,
        },
        extraCssText: 'border: none; box-shadow: none',
        confine: true,
        position: (
          point: [number, number],
          _params: Array<{ data: number }>,
          _dom: HTMLElement,
          _rect: unknown,
          size: { contentSize: [number, number]; viewSize: [number, number] },
        ) => {
          const [x, y] = point;
          const tooltipHeight = size.contentSize[1];
          const topOffset = y - tooltipHeight - 20;
          const bottomOffset = y + 20;

          if (topOffset > 0) {
            isTopOffset = true;
            return [x - size.contentSize[0] / 2, topOffset];
          } else {
            isTopOffset = false;
            return [x - size.contentSize[0] / 2, bottomOffset];
          }
        },
        formatter: (params: Array<{ data: number }>) => {
          if (Array.isArray(params)) {
            const dataValue = Math.round(params[0].data);
            const arrowPosition = isTopOffset ? 'bottom:-14px;' : 'top:-14px;';
            return `<div style="position:relative; border-radius:10px;">
              <p style="font-size:${theme.typography.caption.fontSize}; font-weight:400; text-align:center;">Sales</p>
              <p style="font-size:${theme.typography.body2.fontSize}; font-weight:600; text-align:center;">${formatNumber(dataValue)}</p>
              <span style="position:absolute; ${arrowPosition} left:50%; transform:translate(-50%) rotate(45deg); width:12px; height:12px; background:${theme.palette.text.primary}; border-top:none; border-left:none; border-right:none; border-bottom:none; z-index:-10000;"></span>
            </div>`;
          }
          return '';
        },
      },
      xAxis: {
        type: 'category',
        data: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          margin: 20,
          align: 'left',
          color: theme.palette.text.disabled,
          fontSize: theme.typography.caption.fontSize,
          fontFamily: theme.typography.fontFamily,
          fontWeight: 100,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: 0,
      },
      yAxis: {
        type: 'value',
        interval: 20000,
        max: 10,
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: 'solid',
            color: theme.palette.info.main,
          },
        },
        axisLabel: {
          margin: 15,
          color: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.caption.fontSize,
          fontWeight: 400,
          formatter: (value: number) => {
            return value >= 1000 ? `${value / 1000}K` : value;
          },
        },
      },
      series: [
        {
          data: data,
          type: 'line',
          smooth: true,
          showSymbol: false,
          emphasis: {
            focus: 'none',
            scale: 3,
            itemStyle: {
              borderWidth: 3,
              borderColor: '#ede8ff',
              color: '#ff5cf0',
            },
          },
          lineStyle: {
            width: 4,
            type: 'solid',
            cap: 'round',
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#5cc3ff' },
              { offset: 1, color: '#ff5cf0' },
            ]),
            shadowColor: '#ede8ff',
            shadowOffsetX: 0,
            shadowOffsetY: 4,
            shadowBlur: 4,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: 'rgba(94, 195, 255, 0.05)' },
              { offset: 1, color: 'rgba(253, 93, 239, 0.05)' },
            ]),
          },
        },
      ],
    }),
    [theme, data],
  );

  return <ReactEchart echarts={echarts} option={option} {...rest} />;
};

export default ReportsChart;
