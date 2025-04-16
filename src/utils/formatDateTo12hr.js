export const format12Hour = (range) => {
  const [start, end] = range.split(" - ");

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    console.log(minute);
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
};
