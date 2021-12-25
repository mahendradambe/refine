import { IMutationNotification } from "../../interfaces";

export interface NotificationComponentProps {
    notifications: IMutationNotification[];
}

export interface IMutationNotificationContext {
    notifications: IMutationNotification[];
    notificationDispatch: React.Dispatch<any>;
}
