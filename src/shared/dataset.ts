import { scaleSequential } from "d3";
import { interpolateRdYlBu } from "d3-scale-chromatic";
import faker from "@faker-js/faker";

export interface ChartData {
  name: string;
  value: number;
  color: string;
  children?: ChartData[];
}

const MAX_LEVELS = 5;
const MIN_CHILDREN = 3;
const MAX_CHILDREN = 10;
const MAX_VALUE = 5000;

const colorFn = scaleSequential()
  .domain([MAX_VALUE, 0])
  .interpolator(interpolateRdYlBu);

export function generateRandomChartData(name = "root", level = 0): ChartData {
  const value = faker.datatype.number({ max: MAX_VALUE });

  return {
    name,
    value,
    color: colorFn(value),
    children:
      level < MAX_LEVELS
        ? [
            ...Array(
              faker.datatype.number({ min: MIN_CHILDREN, max: MAX_CHILDREN })
            ),
          ].map(() => generateRandomChartData(faker.lorem.word(), ++level))
        : undefined,
  };
}

export function generateChartDataFromFile() {}
