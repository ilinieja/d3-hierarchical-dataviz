import IcicleChart from "icicle-chart";
import { ChartData } from "../shared/dataset";
import styles from "./Icicle.module.css";
import { useChart } from "../shared/chart";
export interface Props {
  chartData: ChartData;
}

function Icicle({ chartData }: Props) {
  const chartContainerRef = useChart(chartData, IcicleChart);

  return <div className={styles.chartContainer} ref={chartContainerRef}></div>;
}

export default Icicle;
