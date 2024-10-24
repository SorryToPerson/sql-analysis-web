export interface Usage {
  sevenDaysAccepts: string;
  totalAccepts: string;
  acceptDays: string;
  heatmap: Array<{ date: string, count: number }>;
  idePiechart: Array<{ label: string, value: number }>;
  langPiechart: Array<{ label: string, value: number }>;
}