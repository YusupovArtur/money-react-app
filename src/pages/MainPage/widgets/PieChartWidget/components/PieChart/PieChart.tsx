import { FC, JSX, memo, ReactNode, useDeferredValue, useEffect, useState } from 'react';
// Store
import { useAppSelector } from 'store/store.ts';
import { selectTextBodyColor } from 'store/slices/themeSlice/selectors/selectTextBodyColor.ts';
// Chart
import { ResponsivePieCanvas } from '@nivo/pie';
import { PieChartData } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/types/PieChartData.ts';
// Components
import { getTextColorType } from 'shared/helpers';
import { PieChartTooltip } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/PieChartTooltip.tsx';
import { formatPieChartNumber } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/config/formatPieChartNumber.ts';
import { getColorSchema } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/config/getColorSchema.ts';
import { ButtonWithIcon } from 'shared/ui';
import { ArrowLeftIcon } from 'shared/icons';
import { PieChartLegend } from 'pages/MainPage/widgets/PieChartWidget/components/PieChart/PieChartLegend.tsx';

interface PieChartProps {
  data: PieChartData[];
  colorMode?: 'greens' | 'reds';
}

export const PieChart = memo(({ data: innerData, colorMode }: PieChartProps): JSX.Element => {
  const [data, setData] = useState<PieChartData[]>(innerData.length ? innerData : [{ id: '', value: 0, label: 'Нет данных' }]);
  const dataDeferred = useDeferredValue(data);

  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [selectedName, setSelectedName] = useState<string>('');

  const isLoadingCategories = useAppSelector((state) => state.categories.responseState.isLoading);
  const isLoadingTransactions = useAppSelector((state) => state.transactions.responseState.isLoading);
  const isLoading = isLoadingCategories !== false || isLoadingTransactions !== false;

  useEffect(() => {
    if (selectedId === null) {
      setData(innerData.length ? innerData : [{ id: '', value: 0, label: 'Нет данных' }]);
      setSelectedName('');
    } else {
      const clickedItem = innerData.find((item) => item.id === selectedId);
      if (clickedItem && clickedItem.children) {
        setData(clickedItem.children);
        setSelectedName(clickedItem.label || 'Категория без имени');
      } else {
        setSelectedId(null);
        setSelectedName('');
      }
    }
  }, [innerData, selectedId]);

  const handleOpen = (id: string | number) => {
    setSelectedId((state) => (state ? state : id));
  };
  const handleClose = () => {
    setSelectedId(null);
  };

  // Text colors
  const textBody = useAppSelector(selectTextBodyColor);
  const getArcLabelTextColor = (color: string): string => {
    const type = getTextColorType(color);
    return type === 'dark' ? '#000' : type === 'light' ? '#FFF' : '#222';
  };

  // Color schema
  const colorSchema = getColorSchema({ data: dataDeferred, colorMode: colorMode });

  const PieChartWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return <div style={{ width: '100%', maxWidth: '35rem', aspectRatio: '1 / 1' }}>{children}</div>;
  };

  if (isLoading) {
    return (
      <PieChartWrapper>
        <div className="placeholder-wave p-5" style={{ width: '100%', height: '100%' }}>
          <div className="placeholder" style={{ width: '100%', height: '100%' }}></div>
        </div>
      </PieChartWrapper>
    );
  }

  return (
    <PieChartWrapper>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <ResponsivePieCanvas
          // Chart props
          data={dataDeferred}
          sortByValue={true}
          colors={colorSchema as any}
          onClick={(event) => handleOpen(event.id)}
          // Style
          theme={pieChartTheme}
          margin={{ top: 5, right: 0, bottom: 80, left: 0 }}
          innerRadius={0.333}
          padAngle={0.5}
          cornerRadius={5}
          activeOuterRadiusOffset={2}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
          // Labels
          arcLabel={(datum) => `${formatPieChartNumber(datum.value)}`}
          arcLabelsSkipAngle={15}
          arcLabelsTextColor={({ color }) => getArcLabelTextColor(color)}
          // Link labels
          enableArcLinkLabels={false}
          arcLinkLabel={(datum) => String(datum.label)}
          arcLinkLabelsTextColor={textBody}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsOffset={-15}
          arcLinkLabelsTextOffset={4}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          // Tooltip
          tooltip={PieChartTooltip}
        />

        {/*Close button*/}
        {selectedId !== null && (
          <ButtonWithIcon
            caption={selectedName}
            onClick={handleClose}
            style={{ position: 'absolute', top: 0, left: 0 }}
            className="btn btn-primary"
          >
            <ArrowLeftIcon iconSize="1rem" />
          </ButtonWithIcon>
        )}

        {/*Legend*/}
        <PieChartLegend data={dataDeferred} colorMode={colorMode} colorSchema={colorSchema} />
      </div>
    </PieChartWrapper>
  );
});

const pieChartTheme = {
  labels: {
    text: {
      fontSize: 14,
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Not Sans", sans-serif',
      fill: '#000',
      fontWeight: 600,
    },
  },
};
