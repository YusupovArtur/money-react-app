import { PieTooltipProps } from '@nivo/pie';
import { PieChartData } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/types/PieChartData.ts';
import { formatPieChartNumber } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/config/formatPieChartNumber.ts';
import { getDeviceType } from 'shared/helpers';

export const PieChartTooltip = ({ datum }: PieTooltipProps<PieChartData>) => {
  const deviceType = getDeviceType();

  if (deviceType === 'mobile') {
    return <></>;
  }

  return (
    <div className="bg-body text-body p-2 rounded border d-flex flex-column">
      <span>{datum.label}</span>
      <span style={{ whiteSpace: 'nowrap' }}>{`${formatPieChartNumber(datum.value, 2)} ₽`}</span>
    </div>
  );
};
