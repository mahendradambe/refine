import { DefaultComponent } from "@components/layoutWrapper/components";
import React from "react";
import { IRefineContext } from "./IRefineContext";

export const RefineContext = React.createContext<IRefineContext>( {
    hasDashboard: false,
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
    syncWithLocation: false,
    undoableTimeout: 5000,
    liveMode: "off",
    onLiveEvent: undefined,
    ErrorPage: DefaultComponent,
    LoginPage: DefaultComponent
} );

export const RefineContextProvider: React.FC<IRefineContext> = ( {
    hasDashboard,
    mutationMode,
    warnWhenUnsavedChanges,
    syncWithLocation,
    undoableTimeout,
    children,
    DashboardPage,
    LoginPage = DefaultComponent,
    catchAll,
    liveMode = "off",
    onLiveEvent,
    ErrorPage,
    dashboardMenu
} ) => (
    <RefineContext.Provider
        value={{
            hasDashboard,
            mutationMode,
            warnWhenUnsavedChanges,
            syncWithLocation,
            undoableTimeout,
            DashboardPage,
            LoginPage,
            catchAll,
            liveMode,
            onLiveEvent,
            ErrorPage,
            dashboardMenu
        }}
    >
        {children}
    </RefineContext.Provider>
);
