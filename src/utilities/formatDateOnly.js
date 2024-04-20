/**
 * Formats a date string to the format "M/D/YYYY".
 * @param {string} dateString - ISO date string
 * @return {string} - Formatted date
 */
export const formatDateOnly = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
};
