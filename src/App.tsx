import { Outlet } from "react-router-dom";
import NavLink from "./shared/NavLink";
import styles from "./App.module.css";
import { useState } from "react";
import CSVFileInput from "./shared/CSVFileInput";

function App() {
  const [file, setFile] = useState<File>();

  return (
    <div className={styles.layoutRoot}>
      <nav className={styles.nav}>
        <NavLink className={styles.navLink} to="/tree">
          Tree
        </NavLink>
        <NavLink className={styles.navLink} to="/icicle">
          Icicle
        </NavLink>
        <NavLink className={styles.navLink} to="/sunburst">
          Sunburst
        </NavLink>
        <NavLink className={styles.navLink} to="/treemap">
          Treemap
        </NavLink>
        <NavLink className={styles.navLink} to="/circular-treemap">
          Circular treemap
        </NavLink>
        <CSVFileInput className={styles.fileInput} onChange={setFile}>
          Load CSV file
        </CSVFileInput>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
