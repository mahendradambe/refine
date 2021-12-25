import { ReactNode } from "react";

export type INotificationType = "success" | "error" | "info" | "warning";

export interface INotificationArgs {
    message: ReactNode;
    type?: INotificationType;
    description?: ReactNode;
    key?: string;
    duration?: number;
}

export interface INotificationApi {
    open: (
        args?: INotificationArgs | false,
        fallbackArgs?: INotificationArgs
    ) => void;
    error: (
        args?: INotificationArgs | false,
        fallbackArgs?: INotificationArgs
    ) => void;
    success: (
        args?: INotificationArgs | false,
        fallbackArgs?: INotificationArgs
    ) => void;
    warning: (
        args?: INotificationArgs | false,
        fallbackArgs?: INotificationArgs
    ) => void;
    info: (
        args?: INotificationArgs | false,
        fallbackArgs?: INotificationArgs
    ) => void;
    close: ( key: string ) => void;
}

export type SuccessErrorNotification = {
    successNotification?: INotificationArgs | false;
    errorNotification?: INotificationArgs | false;
};

export interface IMutationNotification {
    id: string;
    resource: string;
    cancelMutation: () => void;
    doMutation: () => void;
    seconds: number;
    isRunning: boolean;
    isSilent: boolean;
}
