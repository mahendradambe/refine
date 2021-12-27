import React from "react";
import { LayoutContextProps } from "../layout";
import { PageOptions, LiveModeProps, MutationMode } from "../../interfaces";
import { ComponentsContextProps } from "@contexts/components";

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
    dashboardMenu?: PageOptions;
    liveMode?: LiveModeProps["liveMode"];
    onLiveEvent?: LiveModeProps["onLiveEvent"];
}
