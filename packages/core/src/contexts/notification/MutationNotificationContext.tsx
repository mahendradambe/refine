import React, { ComponentType, Fragment, useReducer } from "react";
import {
    IMutationNotification,
    IMutationNotificationContext
} from "../../interfaces";
import { ActionTypes } from "./actionTypes";

export const MutationNotificationContext = React.createContext<
    IMutationNotificationContext
>( {
    notifications: [],
    notificationDispatch: () => false
} );

const initialState: IMutationNotification[] = [];

export const mutationNotificationReducer = (
    state: IMutationNotification[],
    action: any
) => {
    switch ( action.type ) {
        case ActionTypes.ADD:
            return [
                ...state.filter(
                    ( notificationItem: IMutationNotification ) =>
                        notificationItem.id.toString() !==
                            action.payload.id.toString() &&
                        notificationItem.resource === action.payload.resource
                ),
                {
                    ...action.payload,
                    isRunning: true
                }
            ];
        case ActionTypes.REMOVE:
            return state.filter(
                ( notificationItem: IMutationNotification ) =>
                    notificationItem.id.toString() !==
                        action.payload.id.toString() &&
                    notificationItem.resource === action.payload.resource
            );
        case ActionTypes.DECREASE_NOTIFICATION_SECOND:
            return state.map( ( notificationItem: IMutationNotification ) => {
                if (
                    notificationItem.id.toString() ===
                        action.payload.id.toString() &&
                    notificationItem.resource === action.payload.resource
                ) {
                    return {
                        ...notificationItem,
                        seconds: action.payload.seconds - 1000
                    };
                }
                return notificationItem;
            } );
        default:
            return state;
    }
};

export interface NotificationComponentProps {
    notifications: IMutationNotification[];
}

export interface MutationNotificationContextProviderProps {
    MutationNotification?: ComponentType<NotificationComponentProps>;
}

export const MutationNotificationContextProvider: React.FC<MutationNotificationContextProviderProps> = ( {
    children,
    MutationNotification: NotificationComp = () => <Fragment />
} ) => {
    const [ notifications, notificationDispatch ] = useReducer(
        mutationNotificationReducer,
        initialState
    );

    const notificationData = { notifications, notificationDispatch };

    return (
        <MutationNotificationContext.Provider value={notificationData}>
            {children}
            <NotificationComp notifications={notifications} />
        </MutationNotificationContext.Provider>
    );
};
