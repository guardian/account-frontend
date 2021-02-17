import format from "date-fns/format";
import parse from "date-fns/parse";

export const DATE_INPUT_FORMAT = "YYYY-MM-DD"; // remove!! example: 1969-07-16
export const DATE_FNS_INPUT_FORMAT = "yyyy-MM-dd"; // example: 1969-07-16

export const DATE_FNS_LONG_OUTPUT_FORMAT = "d MMMM yyyy"; // example: 1 July 2021
export const DATE_FNS_SHORT_OUTPUT_FORMAT = "d MMM yyyy"; // example: 5 Jan 2019
export const friendlyLongDateFormat = "D\xa0MMMM\xa0YYYY"; // example: 8 December 1937

// export const momentiseDateStr = (dateStr: string) =>
//    moment(dateStr, DATE_INPUT_FORMAT);

export const cancellationFormatDate = (cancellationEffectiveDate?: string) => {
  return cancellationEffectiveDate === undefined
    ? "today"
    : parseDate(cancellationEffectiveDate).dateStr();
};

export interface ParseDate {
  date: Date;
  dateStr: (outputFormat?: string) => string;
  isBefore: (comparisonDate: Date) => boolean;
  isSameOrAfter: (comparisonDate: Date) => boolean;
  isSame: (comparisonDate: Date) => boolean;
  isLeapYear: boolean;
}

export const parseDate = (
  inputDateStr?: string,
  dateInputFormat: string = DATE_FNS_INPUT_FORMAT
): ParseDate => {
  const dateObject = inputDateStr
    ? parse(inputDateStr, dateInputFormat, new Date())
    : new Date();
  return {
    date: dateObject,
    dateStr: (outputFormat = DATE_FNS_SHORT_OUTPUT_FORMAT) =>
      dateString(dateObject, outputFormat),
    isBefore: comparisonDate => dateIsBefore(dateObject, comparisonDate),
    isSameOrAfter: comparisonDate =>
      dateIsSameOrAfter(dateObject, comparisonDate),
    isSame: comparisonDate => dateIsSame(dateObject, comparisonDate),
    isLeapYear: dateIsLeapYear(dateObject)
  };
};

export const dateString = (
  inputDate: Date,
  outputFormat: string = DATE_FNS_SHORT_OUTPUT_FORMAT
) => format(inputDate, outputFormat);

export const dateIsBefore = (inputDate: Date, comparisonDate: Date) =>
  inputDate.valueOf() < comparisonDate.valueOf();

export const dateIsSameBefore = (inputDate: Date, comparisonDate: Date) =>
  inputDate.valueOf() <= comparisonDate.valueOf();

export const dateIsAfter = (inputDate: Date, comparisonDate: Date) =>
  inputDate.valueOf() > comparisonDate.valueOf();

export const dateIsSameOrAfter = (inputDate: Date, comparisonDate: Date) =>
  inputDate.valueOf() >= comparisonDate.valueOf();

export const dateIsSame = (inputDate: Date, comparisonDate: Date) =>
  inputDate.valueOf() === comparisonDate.valueOf();

export const dateClone = (inputDate: Date) => new Date(inputDate.valueOf());

export const dateIsLeapYear = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const dateAddDays = (inputDate:Date, daysModifier:number) => {
  const modifiedDate = new Date(inputDate.valueOf());
  modifiedDate.setDate(modifiedDate.getDate() + daysModifier);
  return modifiedDate;
}

export const dateAddYears = (inputDate:Date, yearsModifier:number) => {
  const modifiedDate = new Date(inputDate.valueOf());
  modifiedDate.setFullYear(modifiedDate.getFullYear() + yearsModifier);
  return modifiedDate;
}

export interface DateRange {
  start: Date;
  end: Date;
}
export const dateRange = (
  startDate: string | Date,
  endDate: string | Date,
  dateInputFormat: string = DATE_FNS_INPUT_FORMAT
): DateRange => {
  const start =
    startDate instanceof Date
      ? startDate
      : parse(startDate, dateInputFormat, new Date());
  const end =
    endDate instanceof Date
      ? endDate
      : parse(endDate, dateInputFormat, new Date());
  return {
    start,
    end
  };
};

export const getOldestDate = (dates: Date[]) =>
  dates.reduce((dateA: Date, dateB: Date) =>
    dateA.valueOf() <= dateB.valueOf() ? dateA : dateB
  );
