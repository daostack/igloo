import moment, { Moment } from "moment";
import millify from "millify";
import { DateFormat } from "../constants";
import { BigNumberish } from "ethers";
import { isBigNumberish } from "@ethersproject/bignumber/lib/bignumber";
import { formatEther } from "ethers/lib/utils";
import { TransactionState } from "@usedapp/core";
import { t } from "i18next";

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

export const formatDate = (value: Date | Moment | string | undefined, foramt: DateFormat = DateFormat.MomentLong) => {
  return moment(value).format(foramt);
}

export const formatNumber = (value: number | string | BigNumberish, precision: number = 2) => {
  return millify(Number(isBigNumberish(value) ? formatEther(value) : value), { precision: precision });
}

export const getTxLoadingText = (transactionState: TransactionState) => {
  return transactionState === "PendingSignature" ? t("Shared.follow-wallet") : transactionState === "Mining" ? "Mining..." : "";
}

export const getAllTrueIndexes = (array: (boolean | undefined)[]): number[] => {
  return array.reduce((out, bool, index) => bool ? out.concat(index as any) : out, []);
}

export const isValidURL = (value: string) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$', 'i');
  return !!pattern.test(value);
}
