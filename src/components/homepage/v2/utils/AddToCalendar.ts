import { EventAttributes, createEvent } from "ics";

interface EventData {
  scheduledTime?: number | string | undefined;
  title: string;
  userId: string;
  url: string;
}

interface Profile {
  username: string
}

export const handleAddToCalendar = ({
  data,
  profile,
}: {
  data: EventData;
  profile: Profile;
}) => {
  const scheduledTime = data.scheduledTime ?? "0";
  const scheduledDate = new Date(scheduledTime);
  const alarms = [];

  const eventStart: [number, number, number, number, number] = [
    scheduledDate.getFullYear(),
    scheduledDate.getMonth() + 1,
    scheduledDate.getDate(),
    scheduledDate.getHours(),
    scheduledDate.getMinutes(),
  ];

  alarms.push({
    action: "DISPLAY",
    description: `Pody Classroom with ${profile?.username}`,
    trigger: {
      minutes: 10,
      before: true,
    },
    repeat: 1,
    attachType: "VALUE=TEXT",
    attach: `Reminder: Pody Classroom with ${profile?.username}`,
  });

  const event: EventAttributes = {
    start: eventStart,
    duration: { hours: 1, minutes: 0 },
    title: data.title,
    description: `Join ${data.userId} Classroom on Pody`,
    location: "Pody Classroom",
    url: `https://pody.network/call/${data.url}`,
    status: "CONFIRMED",
    busyStatus: "BUSY",
  };

  createEvent(event, (error, value) => {
    if (error) {
      console.error(error);
    } else {
      const blob = new Blob([value], { type: "text/calendar" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.title}.ics`;
      a.click();
      URL.revokeObjectURL(url);
    }
  });
};
