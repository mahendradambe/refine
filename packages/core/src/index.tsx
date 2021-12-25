// import "node_modules/antd/dist/antd.css";

export * from "./components";
export * from "./components/antd";
export * from "./hooks";

export { IAuthContext as AuthProvider, Pagination } from "./interfaces";
export {
    IDataContextProvider as DataProvider,
    ILiveContext as LiveProvider,
    LiveEvent,
    ITranslationContext as TranslationProvider,
    IAccessControlContext as AccessControlProvider,
    I18nProvider,
    MutationMode,
    IResourceComponents,
    IResourceComponentsProps,
    ILoginForm,
    HttpError,
    UploadedFile,
    LayoutProps,
    TitleProps,
    CrudFilter,
    CrudFilters,
    CrudOperators,
    CrudSorting,
    CrudSort,
    GetListResponse,
    GetOneResponse,
    GetManyResponse,
    CreateResponse,
    CreateManyResponse,
    UpdateManyResponse,
    UpdateResponse,
    CustomResponse,
    SuccessErrorNotification,
    IRouterProvider,
    PromptProps,
    ResourceRouterParams,
    IResourceItem
} from "./interfaces";

// antd upload (useStrapiUpload)
export { RcFile, UploadFile } from "antd/lib/upload/interface";

// antd filterDropDownProps (using for <FilterDropDown> component)
export { FilterDropdownProps } from "antd/lib/table/interface";
