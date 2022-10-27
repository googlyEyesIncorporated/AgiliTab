import { DateTime } from "luxon";
import "./Clock.css";

const getTimeString = (currentTime: number) => {
  const timeString = `${currentTime}`;
  if (currentTime < 10) {
    return `0${timeString}`;
  }
  return timeString;
};

export const Clock = ({
  date,
  h24 = true,
}: {
  date: DateTime;
  h24: boolean;
}) => {
  const hoursObj = {
    hour24: date.hour,
    hour12: 0,
  };
  if (!h24) {
    hoursObj.hour12 = hoursObj.hour24 % 12 || 12;
  }
  const thisHour = `${hoursObj.hour12 || hoursObj.hour24}`;
  const thisMeridiem = hoursObj.hour24 > 11 ? "PM" : "AM";
  const second = getTimeString(date.second);
  const minute = getTimeString(date.minute);

  return (
    <div className="clock">{`${thisHour}:${minute}:${second} ${thisMeridiem}`}</div>
  );
};
