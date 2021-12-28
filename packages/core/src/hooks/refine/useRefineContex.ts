import { useContext } from "react";
import { RefineContext } from "../../contexts/refine";
import { IRefineContext } from "../../contexts/refine/IRefineContext";

export const useRefineContext = (): IRefineContext => {
    const {
        hasDashboard,
        mutationMode,
        syncWithLocation,
        undoableTimeout,
        warnWhenUnsavedChanges,
        DashboardPage,
        LoginPage,
        catchAll,
        ErrorPage,
        liveMode,
        onLiveEvent
    } = useContext( RefineContext );

    return {
        hasDashboard,
        mutationMode,
        syncWithLocation,
        undoableTimeout,
        warnWhenUnsavedChanges,
        DashboardPage,
        LoginPage,
        catchAll,
        ErrorPage,
        liveMode,
        onLiveEvent
    };
};
