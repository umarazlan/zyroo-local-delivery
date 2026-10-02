import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  const {
    notifications,
    markNotificationAsRead,
  } = useAppContext();

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const handleMarkAsRead = (notification) => {
    if (notification.isRead) {
      return;
    }

    markNotificationAsRead(notification.notificationId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition"
      >
        <span className="text-xl">🔔</span>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          <div className="flex justify-between items-center px-4 py-3 border-b">
            <div>
              <h3 className="text-sm font-black text-gray-900">
                Notifications
              </h3>

              <p className="text-[10px] text-gray-400">
                {unreadCount} unread notifications
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.notificationId}
                  onClick={() => handleMarkAsRead(notification)}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    !notification.isRead
                      ? "bg-indigo-50/40"
                      : "bg-white"
                  }`}
                >
                  <div className="flex gap-3">

                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      🔔
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-2">
                        <p className="text-xs font-bold text-gray-900">
                          {notification.title}
                        </p>

                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-indigo-600 rounded-full mt-1 shrink-0"></span>
                        )}
                      </div>

                      <p className="text-[11px] text-gray-500 mt-1">
                        {notification.message}
                      </p>

                      <p className="text-[10px] text-gray-400 mt-1">
                        {notification.date}
                      </p>

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}