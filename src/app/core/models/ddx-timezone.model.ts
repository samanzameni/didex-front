// export interface TimeZone {
//   value: string;
//   abbr: string;
//   offset: number;
//   isdst: boolean;
//   text: string;
//   utc: string[];
// }
export interface TimeZone {
  genericName: string;
  abbreviation?: string;
  ianaTimeZoneId: string;
  windowsTimeZoneId: string;
  utcOffset: string;
}
