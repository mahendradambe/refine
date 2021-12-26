import React from "react";
import {
    DashboardMenuItemOptions,
    LayoutProps,
    LiveModeProps,
    MutationMode,
    TitleProps
} from "../../interfaces";

export interface IRefineContext {
    hasDashboard: boolean;
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    catchAll?: React.ReactNode;
    DashboardPage?: React.FC;
    LoginPage: React.FC | false;
    ErrorPage: React.FC;
    Title: React.FC<TitleProps>;
    Layout: React.FC<LayoutProps>;
    dashboardMenu?: DashboardMenuItemOptions;
    Sider: React.FC;
    Header: React.FC;
    Footer: React.FC;
    OffLayoutArea: React.FC;
    liveMode?: LiveModeProps["liveMode"];
    onLiveEvent?: LiveModeProps["onLiveEvent"];
}
