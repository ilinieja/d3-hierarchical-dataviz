import {
  PropsWithChildren,
  useCallback,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import styles from "./RandomDataGenerator.module.css";
import classnames from "classnames";
import {
  RandomDataGenerationParams,
  DEFAULT_LEVELS,
  DEFAULT_MIN_CHILDREN,
  DEFAULT_MAX_CHILDREN,
} from "./dataset";
import { Portal } from "react-portal";
import useResizeObserver from "@react-hook/resize-observer";

const settingsIcon = (
  <svg
    className={styles.settingsIcon}
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#FFFFFF"
  >
    <g>
      <path d="M0,0h24v24H0V0z" fill="none" />
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </g>
  </svg>
);

interface InputProps {
  id: string;
  value: number;
  setter: (value: number) => void;
}

function Input({ id, value, setter, children }: PropsWithChildren<InputProps>) {
  const handleChange = useCallback(
    (event: ChangeEvent) => {
      const intValue = Number(
        (event.target as HTMLInputElement).value.replace(/\D/, "")
      );
      setter(intValue);
    },
    [setter]
  );

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      <div className={styles.inputContainer}>
        <button
          className={styles.inputDecrement}
          onClick={() => setter(--value)}
        >
          -
        </button>
        <input
          id={id}
          className={styles.input}
          value={value}
          onFocus={(event) => event.target.select()}
          onChange={handleChange}
        />
        <button
          className={styles.inputIncrement}
          onClick={() => setter(++value)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export interface Props {
  onGenerate: (params: RandomDataGenerationParams) => void;
  nodesCount: number;
  className?: string;
}

function RandomDataGenerator({
  children,
  className,
  onGenerate,
  nodesCount,
}: PropsWithChildren<Props>) {
  const [levels, setLevels] = useState<number>(DEFAULT_LEVELS);
  const [minChildren, setMinChildren] = useState<number>(DEFAULT_MIN_CHILDREN);
  const [maxChildren, setMaxChildren] = useState<number>(DEFAULT_MAX_CHILDREN);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [settingsFormPosition, setSettingsFormPosition] = useState<{
    top: number;
    right: number;
  }>({ top: 0, right: 0 });
  const [settingsOverlayElement, setSettingsOverlayElement] =
    useState<HTMLDivElement | null>(null);

  const settingsOverlayRef = useCallback((element) => {
    setSettingsOverlayElement(element);
  }, []);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  const handleGenerate = useCallback(() => {
    onGenerate({ levels, minChildren, maxChildren });
  }, [onGenerate, levels, minChildren, maxChildren]);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const getInputSetter = (setter: (value: number) => void) => {
    return (value: number) => {
      setter(value);
      handleGenerate();
    };
  };

  useResizeObserver(settingsOverlayElement, () => {
    if (settingsButtonRef.current) {
      setSettingsFormPosition({
        right: Math.max(
          window.innerWidth -
            settingsButtonRef.current.getBoundingClientRect().right,
          8
        ),
        top: settingsButtonRef.current.getBoundingClientRect().bottom + 6,
      });
    }
  });

  return (
    <div className={classnames([styles.container, className])}>
      <button className={styles.generateButton} onClick={handleGenerate}>
        {children}
      </button>
      <button
        ref={settingsButtonRef}
        className={classnames([
          styles.settingsButton,
          { [styles.settingsButtonActive]: isSettingsOpen },
        ])}
        onClick={toggleSettings}
      >
        {settingsIcon}
      </button>
      {isSettingsOpen && (
        <Portal>
          <div
            ref={settingsOverlayRef}
            className={styles.settingsOverlay}
            onClick={toggleSettings}
          >
            <div
              className={styles.settingsForm}
              style={{
                right: settingsFormPosition.right,
                top: settingsFormPosition.top,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <Input
                id="levels"
                value={levels}
                setter={getInputSetter(setLevels)}
              >
                Tree depth
              </Input>
              <Input
                id="minChildren"
                value={minChildren}
                setter={getInputSetter(setMinChildren)}
              >
                Min node children
              </Input>
              <Input
                id="maxChildren"
                value={maxChildren}
                setter={getInputSetter(setMaxChildren)}
              >
                Max node children
              </Input>
              <div className={styles.field}>
                <span className={styles.label}>Total nodes count</span>
                <span className={styles.label}>{nodesCount}</span>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

export default RandomDataGenerator;
