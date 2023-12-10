import { PropsWithChildren } from "react";

import { TaskColumn } from "../../pages/Dashboard/Dashboard.styled";

type ColumnProps = PropsWithChildren<{}>;

export const Column = ({ children }: ColumnProps) => {
  return <TaskColumn>{children}</TaskColumn>;
};
