import { useContext } from "react";

import { MutationNotificationContext } from "@contexts/notification";
import {
    IMutationNotification,
    IMutationNotificationContext
} from "../../../interfaces";

export type UseMutationNotificationType = () => {
    notifications: IMutationNotification[];
    notificationDispatch: React.Dispatch<any>;
};

export const useMutationNotification: UseMutationNotificationType = () => {
    const { notifications, notificationDispatch } = useContext<
        IMutationNotificationContext
    >( MutationNotificationContext );

    return { notifications, notificationDispatch };
};
