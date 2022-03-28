import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tree from './tree/Tree';
import Icicle from './icicle/Icicle';
import Sunburst from './sunburst/Sunburst';
import Treemap from './treemap/Treemap';
import CircularTreemap from './circular-treemap/CircularTreemap';
import About from './about/About';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="tree" element={<Tree />}></Route>
          <Route path="icicle" element={<Icicle />}></Route>
          <Route path="sunburst" element={<Sunburst />}></Route>
          <Route path="treemap" element={<Treemap />}></Route>
          <Route path="circular-treemap" element={<CircularTreemap />}></Route>
          <Route index element={<About />}></Route>
          <Route path="*" element={<About />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
