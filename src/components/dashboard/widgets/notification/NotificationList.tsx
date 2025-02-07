import { Bell } from "lucide-react";
import useGetNotification from "@/hooks/notification/useGetNotification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useMarkNotificationAsRead from "@/hooks/notification/useNotificationRead";
import useGetNotificationStat from "@/hooks/notification/useGetNotificationStat";
import useMarkAllNotificationsAsRead from "@/hooks/notification/useMarkAllNotificationsAsRead";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

const formatTime = (timestamp: string | number | Date) => {
  const now = dayjs();
  const inputTime = dayjs(timestamp);

  if (now.diff(inputTime, "day") < 1) {
    return inputTime.fromNow();
  }

  return inputTime.format("MMM D, YYYY h:mm A");
};

export default function NotificationList() {
  const {
    notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetNotification();

  const { markAsRead } = useMarkNotificationAsRead();

  const handleMarkAsRead = (id: string) => {
    markAsRead({ id });
  };

  const { stat, isLoading: notifStatLoading } = useGetNotificationStat();

  const { markAllAsRead, isLoading: notifReadAllLoading } =
    useMarkAllNotificationsAsRead();

  const handleMarkAllAsRead = () => {
    markAllAsRead(); // Call the mutation
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-6 px-8 bg-white shadow rounded-lg">
        <h2 className="text-lg font-medium mb-6">Notifications</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex items-start space-x-3 border-b last:border-0 border-slate-100 pb-3"
            >
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="space-y-2 w-full flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-8 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h2 className="text-base text-slate-700 font-medium">
          Notifications {!notifStatLoading && `(${stat?.totalNotifications})`}
        </h2>
        {stat && stat.unreadNotifications > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            disabled={isLoading}
            className="bg-blue-500 text-white px-2 py-1.5 text-xs rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {notifReadAllLoading ? "Updating.." : "Mark All as Read"}
          </button>
        )}
      </div>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">No notifications</p>
        ) : (
          <>
            {notifications.map((notif) => (
              <div
                key={notif._id}
                className="flex items-start space-x-3 border-b last:border-0 border-slate-100 pb-3 relative"
              >
                <div>
                  <Bell className="text-blue-500" size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatTime(notif.timeCreated)}
                  </p>
                </div>
                {!notif.read && ( // Show "Mark as Read" button if the notification is unread
                  <button
                    onClick={() => handleMarkAsRead(notif._id)}
                    className="text-xs text-blue-500 hover:underline absolute right-0 top-0"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))}
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="mt-4 bg-pody-dark text-sm rounded-full px-6 py-2 text-slate-200 hover:opacity-80 transition-all duration-30"
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
