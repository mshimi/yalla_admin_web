import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearNotifications, selectNotifications } from "./notificationSlice";

const Notifier: React.FC = () => {
  const notifications = useAppSelector(selectNotifications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((notification) => {
        switch (notification.type) {
          case "success":
            toast.success(notification.message, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          case "info":
            toast.info(notification.message, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          case "warning":
            toast.warn(notification.message, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          case "error":
          default:
            toast.error(notification.message, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
        }
      });
      dispatch(clearNotifications());
    }
  }, [notifications, dispatch]);

  return <ToastContainer />;
};

export default Notifier;