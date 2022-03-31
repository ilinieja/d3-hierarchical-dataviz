import TreemapChart from "treemap-chart";
import { ChartData } from "../shared/dataset";
import styles from "./Treemap.module.css";
import { useChart } from "../shared/chart";
export interface Props {
  chartData: ChartData;
}

function Treemap({ chartData }: Props) {
  const chartContainerRef = useChart(chartData, TreemapChart);

  return <div className={styles.chartContainer} ref={chartContainerRef}></div>;
}

export default Treemap;
