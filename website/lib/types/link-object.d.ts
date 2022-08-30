import type { ReactNode } from 'react';

export interface LinkObject {
  href: string;
  label: string;
  icon?: ReactNode;
}

export default LinkObject;
