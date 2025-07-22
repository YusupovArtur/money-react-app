export type PieChartData = {
  id: string;
  label?: string;
  value: number;
  color?: string;
  children?: Children[];
};

type Children = Omit<PieChartData, 'children'>;
