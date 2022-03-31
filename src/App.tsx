import { BrowserRouter, Route, Routes } from "react-router-dom";
import Icicle from "./icicle/Icicle";
import Sunburst from "./sunburst/Sunburst";
import Treemap from "./treemap/Treemap";
import CircularTreemap from "./circular-treemap/CircularTreemap";
import About from "./about/About";
import MainLayout from "./shared/MainLayout";
import {
  generateRandomChartData,
  generateChartDataFromFile,
} from "./shared/dataset";
import { useState, useCallback } from "react";

function App() {
  const [chartData, setChartData] = useState(generateRandomChartData());

  const generateRandomData = useCallback(() => {
    setChartData(generateRandomChartData());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              onRandomDataGenerate={generateRandomData}
              onFileChange={generateChartDataFromFile}
            />
          }
        >
          <Route
            path="icicle"
            element={<Icicle chartData={chartData} />}
          ></Route>
          <Route
            path="sunburst"
            element={<Sunburst chartData={chartData} />}
          ></Route>
          <Route
            path="treemap"
            element={<Treemap chartData={chartData} />}
          ></Route>
          <Route
            path="circular-treemap"
            element={<CircularTreemap chartData={chartData} />}
          ></Route>
          <Route index element={<About />}></Route>
          <Route path="*" element={<About />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
