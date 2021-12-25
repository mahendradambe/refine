// contexts
export * from "../contexts/data/IDataContext";
export * from "../contexts/live/ILiveContext";
export * from "../contexts/auth/IAuthContext";
export * from "../contexts/refine/IRefineContext";
export * from "../contexts/translation/ITranslationContext";
export * from "../contexts/components/IComponentsContext";
export * from "../contexts/notification/INotificationContext";
export * from "../contexts/resource/IResourceContext";
export * from "../contexts/unsavedWarn/IUnsavedWarnContext";
export * from "../contexts/router/IRouterContext";
export * from "../contexts/accessControl/IAccessControlContext";

// buttons
export { CreateButtonProps } from "../components/buttons/create/index";

export * from "../components/pages/login";

// field
export * from "./field";

// notification
export * from "./notification";

// match
export * from "./match";

// mutationMode
export * from "./mutationMode";

// mutationMode
export * from "./HttpError";

// custom components
export * from "./customComponents";

// resourceRouterParams
export * from "./resourceRouterParams";

// resourceErrorRouterParams
export * from "./resourceErrorRouterParams";

// redirection
export * from "./redirectionTypes";

// upload
export * from "./upload";

// mapData
export * from "./mapDataFn";

// successErrorNotification
export * from "./successErrorNotification";

//metaData
export * from "./metaData";

//metaData
export * from "./live";

export type BaseRecord = {
    id?: string;
    [key: string]: any;
};
export interface Option {
    label: string;
    value: string;
}
