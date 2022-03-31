import SunburstChart from "sunburst-chart";
import { ChartData } from "../shared/dataset";
import styles from "./Sunburst.module.css";
import { useChart } from "../shared/chart";

export interface Props {
  chartData: ChartData;
}

function Sunburst({ chartData }: Props) {
  const chartContainerRef = useChart(chartData, SunburstChart);

  return <div className={styles.chartContainer} ref={chartContainerRef}></div>;
}

export default Sunburst;
