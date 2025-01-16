import { ReactNode } from 'react';

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TItemsProp = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TItemsProp[];
};

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};
