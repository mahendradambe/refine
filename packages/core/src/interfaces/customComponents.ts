import React from "react";
import { ReactNode } from "react-markdown";

export type TitleProps = {
    collapsed: boolean;
};

export type DashboardMenuItemOptions = {
    name?: string;
    label?: ReactNode;
    icon?: ReactNode;
};

export type LayoutProps = {
    Sider: React.FC;
    Header: React.FC;
    Title: React.FC<TitleProps>;
    Footer: React.FC;
    OffLayoutArea: React.FC;
    dashboard?: boolean;
};
