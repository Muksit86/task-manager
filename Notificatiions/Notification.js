import * as Notifications from "expo-notifications";

export const scheduleTaskNotification = async (task) => {
  const triggerDate = task.date;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder ⏰",
      body: task.title,
      sound: true,
    },
    trigger: triggerDate, // ✅ fires exactly on that date/time
  });
};
