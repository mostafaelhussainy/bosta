import { format, parseISO } from "date-fns";
import { enUS, arSA } from "date-fns/locale";

/**
 * Formats the given date string into a human-readable form (ar/en).
 *
 * @param {string} dateString - The ISO date string to format.
 * @param {string} locale - The locale code ('en' for English, 'ar' for Arabic).
 * @returns {string} The formatted date string.
 */
const formatDate = (dateString, locale) => {
  const date = parseISO(dateString);

  const localeMap = {
    en: enUS,
    ar: arSA,
  };

  return format(date, "MMMM dd, yyyy, h:mm aa", { locale: localeMap[locale] });
};

export default formatDate;
