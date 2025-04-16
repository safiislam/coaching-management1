export const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
export const getFormattedClassTime = (classTime) => {
  if (!classTime) return "";

  const [startTime, endTime] = classTime.split(" - "); // Split start and end time
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};
