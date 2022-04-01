import { Outlet } from "react-router-dom";
import NavLink from "./NavLink";
import styles from "./MainLayout.module.css";
import FileInput, { Props as FileInputProps } from "./FileInput";
import { MouseEventHandler } from "react";

export interface Props {
  onFileChange: FileInputProps["onChange"];
  onRandomDataGenerate: MouseEventHandler<HTMLButtonElement>;
}

function MainLayout({ onFileChange, onRandomDataGenerate }: Props) {
  return (
    <div className={styles.layoutRoot}>
      <nav className={styles.nav}>
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
        <div className={styles.rightSection}>
          <button className={styles.button} onClick={onRandomDataGenerate}>
            Generate random dataset
          </button>
          <FileInput className={styles.fileInput} onChange={onFileChange}>
            Load custom dataset
          </FileInput>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default MainLayout;
