import { TimeSpan } from "app/models/profile.model";
import * as _ from "lodash";
import * as moment from "moment";

export function toMoment(value: Date | string | null | undefined): moment.Moment {
  if(!value || value === 'NOW') return moment();
  return moment(value);
}

export function toDate(value: Date | string | null | undefined): Date {
  if(_.isDate(value)) return value;
  if(!value || value === 'NOW') return new Date();
  return new Date(value);
}

export function getMonthDifference(startDate?: Date | string, endDate?: Date | string): number {
  if (startDate === undefined || endDate === undefined) return 0;
  return (
    toDate(endDate).getMonth() -
    toDate(startDate).getMonth() +
    12 * (toDate(endDate).getFullYear() - toDate(startDate).getFullYear())
  );
}

export function timespan(value?: TimeSpan): TimeSpan | undefined {
  if(value) {
    value.from = toDate(value.from);
    value.to = toDate(value.to);
  }
  return value;
}

