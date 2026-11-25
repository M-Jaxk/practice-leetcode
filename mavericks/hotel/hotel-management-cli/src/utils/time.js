const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function toMinutes(time) {
  if (typeof time !== "string") {
    throw new Error("Time must be a string in HH:MM format");
  }

  const match = TIME_PATTERN.exec(time);
  if (!match) {
    throw new Error(`Invalid time "${time}". Use HH:MM (24-hour format).`);
  }

  return Number(match[1]) * 60 + Number(match[2]);
}
