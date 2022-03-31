import CircularTreemapChart from "circlepack-chart";
import { ChartData } from "../shared/dataset";
import styles from "./CircularTreemap.module.css";
import { useChart } from "../shared/chart";
export interface Props {
  chartData: ChartData;
}

function CircularTreemap({ chartData }: Props) {
  const chartContainerRef = useChart(chartData, CircularTreemapChart);

  return <div className={styles.chartContainer} ref={chartContainerRef}></div>;
}

export default CircularTreemap;
