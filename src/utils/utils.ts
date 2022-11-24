import moment from "moment";
import { DateFormat } from "../constants";

export const getAppName = (): string => {
  const packageJSON = require("../../package.json");
  return packageJSON.name;
}

export const toUnixTime = (value: Date) => {
  return moment(value).unix();
}

export const fromUnixTime = (value: number, foramt: DateFormat = DateFormat.MomentLong) => {
  return moment.unix(value).local().format(foramt)
}
