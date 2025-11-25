import React from "react";

export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
    icon?: React.ReactNode;
};
