import { RouteChangeHandler } from "@components";
import { DefaultComponent } from "@components/layoutWrapper/components";
import {
    AccessControlContextProvider,
    defaultAccessControlContext
} from "@contexts/accessControl";
import { AuthContextProvider } from "@contexts/auth";
import {
    ComponentsContextProps,
    ComponentsContextProvider
} from "@contexts/components";
import { DataContextProvider } from "@contexts/data";
import { LiveContextProvider } from "@contexts/live";
import { MutationNotificationContextProvider } from "@contexts/notification";
import { MutationNotificationContextProviderProps } from "@contexts/notification/MutationNotificationContext";
import { RefineContextProvider } from "@contexts/refine";
import { IResourceItem, ResourceContextProvider } from "@contexts/resource";
import { RouterContextProvider } from "@contexts/router";
import {
    defaultProvider,
    TranslationContextProvider
} from "@contexts/translation";
import { UnsavedWarnContextProvider } from "@contexts/unsavedWarn";
import React from "react";
import {
    DefaultOptions,
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { LayoutContextProps, LayoutContextProvider } from "@contexts/layout";
import {
    I18nProvider,
    IAccessControlContext,
    IAuthContext,
    IDataContextProvider,
    ILiveContext,
    IRouterProvider,
    LiveModeProps,
    MutationMode,
    ResourceProps
} from "../../../interfaces";

interface QueryClientConfig {
    queryCache?: QueryCache;
    mutationCache?: MutationCache;
    defaultOptions?: DefaultOptions;
}

interface IResource extends IResourceItem, ResourceProps {}
export interface RefineProps {
    authProvider?: IAuthContext;
    dataProvider: IDataContextProvider;
    liveProvider?: ILiveContext;
    routerProvider: IRouterProvider;
    accessControlProvider?: IAccessControlContext;
    resources?: IResource[];
    i18nProvider?: I18nProvider;
    catchAll?: React.ReactNode;
    LoginPage: React.FC;
    DashboardPage?: React.FC;
    ReadyPage?: React.FC;
    mutationMode?: MutationMode;
    syncWithLocation?: boolean;
    warnWhenUnsavedChanges?: boolean;
    undoableTimeout?: number;
    Layout: LayoutContextProps["Layout"];
    components: ComponentsContextProps["components"];
    ErrorPage: React.FC;
    reactQueryClientConfig?: QueryClientConfig;
    reactQueryDevtoolConfig?: any;
    liveMode?: LiveModeProps["liveMode"];
    onLiveEvent?: LiveModeProps["onLiveEvent"];
    MutationNotification?: MutationNotificationContextProviderProps["MutationNotification"];
}

/**
 * {@link https://refine.dev/docs/api-references/components/refine-config `<Refine> component`} is the entry point of a refine app.
 * It is where the highest level of configuration of the app occurs.
 * Only a dataProvider is required to bootstrap the app. After adding a dataProvider, resources can be added as property.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config} for more details.
 */
export const Refine: React.FC<RefineProps> = ( {
    authProvider,
    dataProvider,
    routerProvider,
    accessControlProvider = defaultAccessControlContext,
    resources: resourcesFromProps,
    DashboardPage,
    ReadyPage,
    LoginPage,
    catchAll,
    children,
    liveProvider,
    i18nProvider = defaultProvider.i18nProvider,
    mutationMode = "pessimistic",
    syncWithLocation = false,
    warnWhenUnsavedChanges = false,
    undoableTimeout = 5000,
    ErrorPage = DefaultComponent,
    reactQueryClientConfig,
    reactQueryDevtoolConfig,
    liveMode,
    onLiveEvent,
    MutationNotification,
    Layout,
    components
} ) => {
    const queryClient = new QueryClient( {
        ...reactQueryClientConfig,
        defaultOptions: {
            ...reactQueryClientConfig?.defaultOptions,
            queries: {
                refetchOnWindowFocus: false,
                keepPreviousData: true,
                ...reactQueryClientConfig?.defaultOptions?.queries
            }
        }
    } );

    const resources: IResourceItem[] = [];

    resourcesFromProps?.map( resource => {
        resources.push( {
            name: resource.name,
            label: resource.options?.label,
            icon: resource.icon,
            route: resource.options?.route ?? resource.name,
            canCreate: !!resource.create,
            canEdit: !!resource.edit,
            canShow: !!resource.show,
            canDelete: resource.canDelete,
            create: resource.create,
            show: resource.show,
            list: resource.list,
            edit: resource.edit
        } );
    } );

    if ( resources.length === 0 ) {
        return ReadyPage ? <ReadyPage /> : <DefaultComponent />;
    }

    const { RouterComponent } = routerProvider;

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider {...authProvider} isProvided={!!authProvider}>
                <DataContextProvider {...dataProvider}>
                    <LiveContextProvider liveProvider={liveProvider}>
                        <RouterContextProvider {...routerProvider}>
                            <ResourceContextProvider resources={resources}>
                                <TranslationContextProvider
                                    i18nProvider={i18nProvider}
                                >
                                    <AccessControlContextProvider
                                        {...accessControlProvider}
                                    >
                                        <ComponentsContextProvider
                                            components={components}
                                        >
                                            <LayoutContextProvider
                                                Layout={Layout}
                                            >
                                                <MutationNotificationContextProvider
                                                    MutationNotification={
                                                        MutationNotification
                                                    }
                                                >
                                                    <RefineContextProvider
                                                        mutationMode={
                                                            mutationMode
                                                        }
                                                        warnWhenUnsavedChanges={
                                                            warnWhenUnsavedChanges
                                                        }
                                                        syncWithLocation={
                                                            syncWithLocation
                                                        }
                                                        undoableTimeout={
                                                            undoableTimeout
                                                        }
                                                        catchAll={catchAll}
                                                        DashboardPage={
                                                            DashboardPage
                                                        }
                                                        LoginPage={LoginPage}
                                                        ErrorPage={ErrorPage}
                                                        hasDashboard={
                                                            !!DashboardPage
                                                        }
                                                        liveMode={liveMode}
                                                        onLiveEvent={
                                                            onLiveEvent
                                                        }
                                                    >
                                                        <UnsavedWarnContextProvider>
                                                            <>
                                                                {children}
                                                                {RouterComponent ? (
                                                                    <RouterComponent>
                                                                        <RouteChangeHandler />
                                                                    </RouterComponent>
                                                                ) : (
                                                                    <RouteChangeHandler />
                                                                )}
                                                            </>
                                                        </UnsavedWarnContextProvider>
                                                    </RefineContextProvider>
                                                </MutationNotificationContextProvider>
                                            </LayoutContextProvider>
                                        </ComponentsContextProvider>
                                    </AccessControlContextProvider>
                                </TranslationContextProvider>
                            </ResourceContextProvider>
                        </RouterContextProvider>
                    </LiveContextProvider>
                </DataContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
                {...reactQueryDevtoolConfig}
            />
        </QueryClientProvider>
    );
};
