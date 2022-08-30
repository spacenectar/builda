import React, { SVGAttributes } from 'react';

// import styles
import styles from './styles.module.scss';

// types
export type Props = SVGAttributes<SVGElement>;

// Render component
export const Spinner: React.FC<Props> = ({
  fill = 'currentColour',
  ...props
}: Props) => {
  return (
    <svg
      className={styles['spinner']}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
        fill={fill}
      />
      <path
        d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
        fill={fill}
      />
    </svg>
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;
