import { createContext, FC, ReactElement } from "react";
import { INotificationApi } from "../../interfaces/notification";

export const NotificationApiContext = createContext<INotificationApi>( {
    close: () => void 0,
    open: () => void 0,
    info: () => void 0,
    error: () => void 0,
    success: () => void 0,
    warning: () => void 0
} );

export interface NotificationApiContextProviderProps {
    children: ReactElement<{}>;
}

export const NotificationApiContextProvider: FC = () => {
    return null;
};
