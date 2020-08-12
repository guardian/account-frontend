import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import moment from "moment";
import React, { useState } from "react";
import { DATE_INPUT_FORMAT, formatDateStr } from "../../../shared/dates";
import { DirectDebitDetails } from "../../../shared/productResponse";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { Pagination } from "../pagination";
import { CardDisplay, CardProps } from "../payment/cardDisplay";
import { DirectDebitDisplay } from "../payment/directDebitDisplay";
import { PayPalDisplay } from "../payment/paypalDisplay";
import { DownloadIcon } from "../svgs/downloadIcon";
import { InvoiceTableYearSelect } from "./invoiceTableYearSelect";

export enum InvoiceInterval {
  quarterly,
  annually
}

interface InvoiceInfo {
  id: string;
  subscriptionId?: string;
  product?: string;
  date: string;
  downloadUrl: string;
  price: string;
  currencyISO: string;
  currency: string;
  paymentMethod: string;
  card?: CardProps;
  payPalEmail?: string;
  mandate?: DirectDebitDetails;
}

interface InvoicesTableProps {
  invoiceInterval: InvoiceInterval;
  invoiceData: InvoiceInfo[];
}

export const InvoicesTable = (props: InvoicesTableProps) => {
  const initialPage = 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const resultsPerPage = 2;

  const tableHeadings = ["Date", "Payment method", "Price", ""];
  const invoiceYears = [
    ...new Set(
      [...props.invoiceData].map(
        invoice => `${moment(invoice.date, DATE_INPUT_FORMAT).year()}`
      )
    )
  ];
  const [currentInvoiceYear, setCurrentInvoiceYear] = useState<string>(
    invoiceYears[0]
  );

  const [currentPaginationPage, setCurrentPaginationPage] = useState<number>(
    initialPage
  );

  const directPaginationUpdate = (newPageNumber: number) => {
    const targetInvoiceYear = `${moment(
      props.invoiceData[(newPageNumber - 1) * resultsPerPage].date,
      DATE_INPUT_FORMAT
    ).year()}`;
    setCurrentInvoiceYear(targetInvoiceYear);
    setCurrentPage(newPageNumber);
  };

  const directYearUpdate = (newYear: string) => {
    const targetPage = Math.ceil(
      (props.invoiceData.findIndex(
        invoice =>
          `${moment(invoice.date, DATE_INPUT_FORMAT).year()}` === newYear
      ) +
        1) *
        0.5
    );
    setCurrentPaginationPage(targetPage);
    setCurrentPage(targetPage);
  };

  const tableCss2 = css`
    display: block;
    width: 100%;
    border: 1px solid ${palette.neutral[86]};
    ${minWidth.tablet} {
      display: table;
    }
  `;

  const tableHeaderCss2 = css`
    display: block;
    ${minWidth.tablet} {
      display: table-header-group;
    }
  `;

  const tableBodyCss2 = css`
    display: block;
    ${minWidth.tablet} {
      display: table-row-group;
    }
  `;

  const invoiceYearSelectCss = css`
    display: none;
    padding: ${space[3]}px;
    background-color: ${palette.neutral[97]};
    border-bottom: 1px solid ${palette.neutral[86]};
    ${minWidth.tablet} {
      display: table-cell;
      padding: ${space[5]}px ${space[5]}px ${space[5]}px 0;
    }
  `;

  const tableTitleCss2 = css`
    display: table-cell;
    ${headline.xxsmall({ fontWeight: "bold" })};
    padding: ${space[5]}px;
    background-color: ${palette.neutral[97]};
    border-bottom: 1px solid ${palette.neutral[86]};
    ${maxWidth.tablet} {
      margin: 0;
      padding: ${space[3]}px;
      font-size: 1.0625rem;
      line-height: 1.6;
      border-bottom: 0;
      display: block;
    }
  `;

  const thCss2 = css`
    display: table-cell;
    text-align: left;
    ${textSans.medium({ fontWeight: "bold" })}
    padding: ${space[5]}px;
    ${maxWidth.tablet} {
      padding: ${space[3]}px;
    }
  `;

  const tableHeadingsRowCss2 = css`
    display: none;
    ${minWidth.tablet} {
      display: table-row;
    }
  `;

  const tableRowCss2 = css`
    display: block;
    ${minWidth.tablet} {
      display: table-row;
    }
  `;

  const tdCss2 = (rowIndex: number, title?: string) => css`
    display: block;
    ${textSans.medium()}
    padding: ${space[3]}px ${space[3]}px 0;
    :last-of-type {
      border-top: 1px solid ${palette.neutral[86]};
      border-bottom: 1px solid ${palette.neutral[86]};
      padding: ${space[3]}px;
      margin-top: ${space[3]}px;
    }
    :before {
      display: ${title ? "inline-block" : "none"};
      width: calc(60% - ${space[3]}px);
      padding-right: ${space[3]}px;
      ${textSans.medium({ fontWeight: "bold" })}
      content: "${title}";
    }
    ${minWidth.tablet} {
      display: table-cell;
      width: auto;
      padding: ${space[5]}px;
      margin: 0;
      border-top: 1px solid ${palette.neutral[86]};
      background-color: ${
        rowIndex % 2 === 0 ? palette.neutral[97] : "transparent"
      };
      :before {
        display: none;
        content:"";
      }
    }
  `;

  const paymentDetailsHolderCss = css`
    display: inline-block;
    width: calc(40% + ${space[3]}px);
    ${minWidth.tablet} {
      width: auto;
      min-width: 18ch;
    }
  `;

  const invoiceLinkCss = css`
    color: ${palette.brand[400]};
    font-weight: bold;
  `;

  const invoiceDownloadLinkCss = css`
    display: inline-block;
    width: 22px;
    margin-left: ${space[6]}px;
  `;

  return (
    <>
      <div css={tableCss2}>
        <header css={tableHeaderCss2}>
          <div css={tableRowCss2}>
            <h2 css={tableTitleCss2}>Invoices</h2>
            <div
              css={css`
                display: none;
                background-color: ${palette.neutral[97]};
                border-bottom: 1px solid ${palette.neutral[86]};
                ${minWidth.tablet} {
                  display: table-cell;
                }
              `}
            />
            <div
              css={css`
                display: none;
                background-color: ${palette.neutral[97]};
                border-bottom: 1px solid ${palette.neutral[86]};
                ${minWidth.tablet} {
                  display: table-cell;
                }
              `}
            />
            <div css={invoiceYearSelectCss}>
              <InvoiceTableYearSelect
                years={invoiceYears}
                selectedYear={currentInvoiceYear}
                setSelectedYear={setCurrentInvoiceYear}
                onDirectUpdate={directYearUpdate}
              />
            </div>
          </div>
          <div css={tableHeadingsRowCss2}>
            {tableHeadings.map((tableHeading, index) => (
              <div css={thCss2} key={`invoiceTH-${index}`}>
                {tableHeading}
              </div>
            ))}
          </div>
        </header>
        <div css={tableBodyCss2}>
          {props.invoiceData
            .filter(
              (_, index) =>
                index >= (currentPage - 1) * resultsPerPage &&
                index < (currentPage - 1) * resultsPerPage + resultsPerPage
            )
            .map((tableRow, index) => (
              <div css={tableRowCss2} key={tableRow.id}>
                <div css={tdCss2(index, tableHeadings[0])}>
                  {formatDateStr(tableRow.date)}
                </div>
                <div css={tdCss2(index, tableHeadings[1])}>
                  <div css={paymentDetailsHolderCss}>
                    {tableRow.card && (
                      <CardDisplay margin="0" {...tableRow.card} />
                    )}
                    {tableRow.payPalEmail && <PayPalDisplay />}
                    {tableRow.mandate && (
                      <DirectDebitDisplay
                        {...tableRow.mandate}
                        onlyAccountEnding
                      />
                    )}
                    {!tableRow.card &&
                      !tableRow.payPalEmail &&
                      !tableRow.mandate && <span>No Payment Method</span>}
                  </div>
                </div>
                <div css={tdCss2(index, tableHeadings[2])}>
                  {`${tableRow.currency}${tableRow.price} ${tableRow.currencyISO}`}
                </div>
                <div css={tdCss2(index)}>
                  <a css={invoiceLinkCss} href={tableRow.downloadUrl}>
                    View invoice (PDF)
                  </a>
                  <a
                    css={invoiceDownloadLinkCss}
                    download
                    href={tableRow.downloadUrl}
                  >
                    <DownloadIcon />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPaginationPage}
        setCurrentPage={setCurrentPaginationPage}
        onDirectUpdate={directPaginationUpdate}
        numberOfResults={props.invoiceData.length}
        resultsPerPage={resultsPerPage}
        additionalCSS={css`
          margin-top: ${space[5]}px;
        `}
      />
    </>
  );
};
