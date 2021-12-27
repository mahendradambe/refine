// contexts
export * from "../contexts/data/IDataContext";
export * from "../contexts/live/ILiveContext";
export * from "../contexts/auth/IAuthContext";
export * from "../contexts/refine/IRefineContext";
export * from "../contexts/translation/ITranslationContext";
export * from "../contexts/components/IComponentsContext";
export * from "../contexts/notification/IMutationNotificationContext";
export * from "../contexts/resource/IResourceContext";
export * from "../contexts/unsavedWarn/IUnsavedWarnContext";
export * from "../contexts/router/IRouterContext";
export * from "../contexts/accessControl/IAccessControlContext";

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

// mapData
export * from "./mapDataFn";

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
