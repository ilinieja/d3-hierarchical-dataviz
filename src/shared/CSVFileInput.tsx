import { PropsWithChildren, ChangeEvent } from "react";
import styles from "./CSVFileInput.module.css";
import classnames from "classnames";

export interface Props {
  onChange: (event: File) => void;
  className?: string;
}

function CSVFileInput({
  children,
  className,
  onChange,
}: PropsWithChildren<Props>) {
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    // TODO: Validate file content.
    if (event?.target?.files && event.target.files[0]) {
      onChange(event.target.files[0]);
    }
  }
  return (
    <label className={classnames([className, styles.label])}>
      <input type="file" className={styles.input} onChange={handleFileChange} />
      {children}
    </label>
  );
}

export default CSVFileInput;
