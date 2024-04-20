/**
 * Formats a date string to the format "h:mm AM/PM".
 * @param {string} dateString - ISO date string
 * @return {string} - Formatted time
 */
export const formatTimeOnly = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};
