import React from "react";

/* Stylesheet */
import styles from "./styles.module.scss";

/* Types */
interface Props extends React.ComponentProps<"div"> {
  /**
   * The component text
   */
  text: string;
}

/**
 * The Test component component
 */
export const TestComponent: React.FC<Props> = ({
  text = "Made with Builda",
  className,
  ...props
}: Props) => {
  return (
    <div className={`${styles["test-component"]} ${className}`} {...props}>
      <div className={styles["builda-tag"]}>{text}</div>
    </div>
  );
};

TestComponent.displayName = "TestComponent";

export default TestComponent;
export type { Props };
