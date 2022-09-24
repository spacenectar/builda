import React, { SVGAttributes } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const AppLogo: React.FC<Props> = ({
  fill = 'currentColor',
  ...props
}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 188.99 188.99"
    {...props}
  >
    <path
      d="M151.59,37.4V151.59H37.4V37.4H151.59M173.31,0H15.68A15.68,15.68,0,0,0,0,15.68V173.31A15.68,15.68,0,0,0,15.68,189H173.31A15.68,15.68,0,0,0,189,173.31V15.68A15.68,15.68,0,0,0,173.31,0Z"
      fill={fill}
    />
    <polygon
      points="138.5 97.02 94.5 53.02 50.49 97.02 76.77 97.02 84.58 89.22 84.58 135.97 104.42 135.97 104.42 89.22 112.22 97.02 138.5 97.02"
      fill={fill}
    />
  </svg>
);

AppLogo.displayName = 'AppLogo';

export default AppLogo;
