import { scaleSequential } from 'd3-scale';
import { interpolateGreens, interpolateReds } from 'd3-scale-chromatic';
import { PieChartData } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/types/PieChartData.ts';

export const getColorSchema = (props: {
  data: PieChartData[];
  colorMode?: 'greens' | 'reds';
}): ((datum: PieChartData) => string) => {
  const { data, colorMode } = props;

  const values = data.map((d) => d.value);
  const min = Math.min(...values) / 1.5;
  const max = Math.max(...values) * 1.5;
  // const sum = values.reduce((acc, cur) => acc + cur, 0);

  if (colorMode === undefined) {
    return (datum: PieChartData) => datum.color || '#f66';
  }

  const colorScale = scaleSequential()
    .domain([min, max])
    .interpolator(colorMode === 'reds' ? interpolateReds : interpolateGreens);

  return (datum: PieChartData) => colorScale(datum.value);
};
