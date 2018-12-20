import React from "react";
import { DirectDebitDetails } from "../../../shared/productResponse";
import palette from "../../colours";
import { DirectDebitLogo } from "./directDebitLogo";

const NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW = 3;

export const cleanSortCode = (sortCode: string) =>
  sortCode.replace(/[^0-9]/g, "");

export const dashifySortCode = (sortCode: string) => {
  const cleanedSortCode = cleanSortCode(sortCode);
  if (cleanedSortCode.length !== 6) {
    return cleanedSortCode;
  }
  return (
    cleanedSortCode.substr(0, 2) +
    "-" +
    cleanedSortCode.substr(2, 2) +
    "-" +
    cleanedSortCode.substr(4, 2)
  );
};

export interface DirectDebitDisplayProps extends DirectDebitDetails {
  showAccountName?: true;
}

export const DirectDebitDisplay = (mandate: DirectDebitDisplayProps) => (
  <div
    css={{
      display: "flex",
      alignItems: "top"
    }}
  >
    <DirectDebitLogo fill={palette.neutral["1"]} />
    <div
      css={{
        display: "flex",
        flexWrap: "wrap"
      }}
    >
      <span
        css={{
          marginLeft: "10px"
        }}
      >
        {mandate.accountNumber &&
        mandate.sortCode.length > NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW
          ? "•".repeat(
              mandate.accountNumber.length -
                NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW
            ) +
            mandate.accountNumber.substr(
              mandate.accountNumber.length -
                NUMBER_OF_ACCOUNT_NUMBER_DIGITS_TO_SHOW
            )
          : undefined}
      </span>
      {mandate.sortCode ? (
        <span
          css={{
            marginLeft: "10px"
          }}
        >
          {dashifySortCode(mandate.sortCode)}
        </span>
      ) : (
        undefined
      )}
      {mandate.showAccountName && mandate.accountName ? (
        <span
          css={{
            marginLeft: "10px"
          }}
        >
          {mandate.accountName}
        </span>
      ) : (
        undefined
      )}
    </div>
  </div>
);
