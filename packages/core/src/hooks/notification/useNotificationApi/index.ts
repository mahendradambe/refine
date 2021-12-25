import { useContext } from "react";
import { NotificationApiContext } from "../../../contexts/notification/NotificationApiContext";

export const useNotificationApi = () => useContext( NotificationApiContext );
