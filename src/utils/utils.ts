import moment from "moment"; //, { Moment }
import { DateFormat } from "../constants";

export const getAppName = (): string => {
  const packageJSON = require("../../package.json");
  return packageJSON.name;
}

//export const formatDate = (date: string | Date | Moment, format: DateFormat = DateFormat.Long): string => moment(date).format(format);

export const toUnixTime = (value: Date) => {
  return moment(value).unix();
}

export const fromUnixTime = (value: number) => {
  return moment.unix(value).local().format(DateFormat.Long)
}
