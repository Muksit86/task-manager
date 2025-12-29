import * as Notifications from "expo-notifications";

export const scheduleTaskNotification = async (task) => {
  console.log("This is notification date: ", task.date);
  const triggerDate = new Date(task.date);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder ⏰",
      body: task.title,
      sound: true,
    },
    trigger: triggerDate, // ✅ fires exactly on that date/time
  });
};
