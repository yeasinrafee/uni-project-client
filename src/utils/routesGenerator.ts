import { ReactNode } from 'react';

type TRoute = {
  path: string;
  element: ReactNode;
};

type TItemsProp = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TRoute[];
};

export const routesGenerator = (items: TItemsProp[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);

  return routes;
};
