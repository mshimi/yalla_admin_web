import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type NotificationType = "error" | "success" | "info" | "warning";

export interface Notification {
  id: string; // Unique ID for tracking
  message: string;
  type: NotificationType;
  details?:string[];
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, "id">>) => {
      state.notifications.push({ id: Date.now().toString(), ...action.payload });
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, clearNotifications } = notificationSlice.actions;

export const selectNotifications = (state: { notification: NotificationState }) =>
  state.notification.notifications;

export default notificationSlice;