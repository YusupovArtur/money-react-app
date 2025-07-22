import { FC } from 'react';
import { getDeviceType, getStringCurrencyValue } from 'shared/helpers';
import { PieChartData } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/types/PieChartData.ts';

interface PieChartLegendProps {
  data: PieChartData[];
  colorMode?: 'greens' | 'reds';
  colorSchema: (datum: PieChartData) => string;
}

export const PieChartLegend: FC<PieChartLegendProps> = ({ data, colorMode, colorSchema }) => {
  const result = data.reduce((acc, cur) => acc + cur.value, 0);

  const resultLabel = getStringCurrencyValue({
    value: result,
    sign: colorMode === 'greens' ? 'positive' : colorMode === 'reds' ? 'negative' : undefined,
  });
  const resultColor = colorMode === 'greens' ? 'text-success' : colorMode === 'reds' ? 'text-danger' : 'text-body';

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ width: '100%', position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
    >
      <span style={{ fontSize: '1.1rem', fontWeight: 700 }} className={resultColor}>
        {resultLabel}
      </span>
      <div className="d-flex align-self-center justify-content-center flex-wrap gap-3">
        {data
          .sort((a, b) => b.value - a.value)
          .map((datum, index) => (
            <div key={datum.id + index.toString()} className="d-flex align-items-center">
              <div className="me-1" style={{ height: 8, width: 8, backgroundColor: colorSchema(datum) }}></div>
              <span
                style={{ fontSize: getDeviceType() === 'mobile' ? '0.7rem' : '1rem' }}
              >{`${datum.label || 'Категория без имени'}`}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
