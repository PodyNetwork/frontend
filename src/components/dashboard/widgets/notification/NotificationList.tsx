import { Bell } from "lucide-react";
import useGetNotification from "@/hooks/notification/useGetNotification";

export default function NotificationList() {
  const {
    notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetNotification();

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
      <h2 className="text-lg font-medium mb-6">Notifications</h2>
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
                    {new Date(notif.timeCreated).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
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
