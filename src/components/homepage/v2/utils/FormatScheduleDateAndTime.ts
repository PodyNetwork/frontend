import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

export const formatScheduledDate = (scheduledTime: number) => {
    const scheduledDate = dayjs(scheduledTime);
    if (scheduledDate.isSame(dayjs(), "minute")) return "Now";
    if (scheduledDate.isToday()) return "Today";
    if (scheduledDate.isTomorrow()) return "Tomorrow";
    if (scheduledDate.isSame(dayjs().subtract(1, "day"), "day"))
      return "Yesterday";
    return scheduledDate.format("MMM D, YYYY");
  };
  
export  const formatScheduledTime = (scheduledTime: number) => {
    return dayjs(scheduledTime).format("HH:mm");
  };