import { BorderCollapseProperty, TextAlignProperty } from "csstype";
import { DateRange } from "moment-range";
import React from "react";
import {
  getMainPlan,
  isPaidSubscriptionPlan,
  Subscription
} from "../../../shared/productResponse";
import palette from "../../colours";
import { ExpanderButton } from "../../expanderButton";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { CollatedCredits } from "./collatedCredits";
import {
  isSharedHolidayDateChooserState,
  SharedHolidayDateChooserState
} from "./holidayDateChooser";
import {
  HolidayStopDetail,
  HolidayStopRequest,
  MinimalHolidayStopRequest
} from "./holidayStopApi";

const cellCss = {
  padding: "8px 16px 8px 16px",
  border: "1px solid " + palette.neutral["5"]
};

export interface SummaryTableProps {
  data: HolidayStopRequest[] | SharedHolidayDateChooserState;
  subscription: Subscription;
  issueKeyword: string;
  alternateSuspendedColumnHeading?: string;
}

const friendlyDateFormatPrefix = "D MMMM";

const friendlyDateFormatSuffix = " YYYY";

const formatDateRangeAsFriendly = (range: DateRange) =>
  range.start.format(
    friendlyDateFormatPrefix +
      (range.start.year() !== range.end.year() ? friendlyDateFormatSuffix : "")
  ) +
  " - " +
  range.end.format(friendlyDateFormatPrefix + friendlyDateFormatSuffix);

interface SummaryTableRowProps extends MinimalHolidayStopRequest {
  issueKeyword: string;
  shouldShowExpectedCredit: boolean;
  currency?: string;
  asTD?: true;
}

const formattedCreditIfAvailable = (
  detail: HolidayStopDetail,
  currency?: string
) => {
  const rawAmount = detail.actualPrice || detail.estimatedPrice;
  const amountTwoDecimalPlaces = rawAmount ? rawAmount.toFixed(2) : undefined;
  return currency && rawAmount
    ? ` (${currency}${amountTwoDecimalPlaces})`
    : undefined;
};

const SummaryTableRow = (props: SummaryTableRowProps) => {
  const dateRangeStr = formatDateRangeAsFriendly(props.dateRange);

  const detailPart = (
    <ExpanderButton
      buttonLabel={
        <strong>
          {props.publicationsImpacted.length} {props.issueKeyword}
          {props.publicationsImpacted.length !== 1 ? "s" : ""}
        </strong>
      }
    >
      {props.publicationsImpacted.map((detail, index) => (
        <div key={index}>
          -{" "}
          {detail.publicationDate.format(
            friendlyDateFormatPrefix + friendlyDateFormatSuffix
          )}
          {formattedCreditIfAvailable(detail, props.currency)}
        </div>
      ))}
    </ExpanderButton>
  );

  return props.asTD ? (
    <tr>
      <td>{dateRangeStr}</td>
      <td>{detailPart}</td>
      {props.shouldShowExpectedCredit && (
        <td>
          <CollatedCredits {...props} />
        </td>
      )}
    </tr>
  ) : (
    <div css={{ marginBottom: "20px" }}>
      <div
        css={{
          ...cellCss,
          backgroundColor: palette.neutral["7"],
          borderBottom: 0
        }}
      >
        {dateRangeStr}
      </div>
      <div css={cellCss}>{detailPart}</div>
      {props.shouldShowExpectedCredit && (
        <div css={{ ...cellCss, borderTop: 0 }}>
          <strong>Expected Credits</strong>
          <CollatedCredits {...props} withBullet />
        </div>
      )}
    </div>
  );
};

export const SummaryTable = (props: SummaryTableProps) => {
  const holidayStopRequestsList: MinimalHolidayStopRequest[] = isSharedHolidayDateChooserState(
    props.data
  )
    ? [
        {
          dateRange: props.data.selectedRange,
          publicationsImpacted: props.data.publicationsImpacted
        }
      ]
    : props.data;

  const mainPlan = getMainPlan(props.subscription);
  const currency = isPaidSubscriptionPlan(mainPlan)
    ? mainPlan.currency
    : undefined;

  const shouldShowExpectedCredit = isSharedHolidayDateChooserState(props.data);

  return (
    <div
      css={{
        fontFamily: sans,
        fontSize: "16px"
      }}
    >
      <table
        css={{
          width: "100%",
          borderCollapse: "collapse" as BorderCollapseProperty,
          tr: {
            textAlign: "left" as TextAlignProperty
          },
          th: {
            ...cellCss,
            backgroundColor: palette.neutral["7"],
            margin: 0
          },
          td: {
            ...cellCss
          },
          [maxWidth.tablet]: {
            display: "none"
          }
        }}
      >
        <tbody>
          <tr>
            <th>Duration</th>
            <th css={{ minWidth: "250px" }}>
              {props.alternateSuspendedColumnHeading || "Suspended"}
            </th>
            {shouldShowExpectedCredit && <th>Expected Credits</th>}
          </tr>
          {holidayStopRequestsList.map((holidayStopRequest, index) => (
            <SummaryTableRow
              asTD
              shouldShowExpectedCredit={shouldShowExpectedCredit}
              issueKeyword={props.issueKeyword}
              key={index}
              currency={currency}
              {...holidayStopRequest}
            />
          ))}
        </tbody>
      </table>
      <div
        css={{
          [minWidth.tablet]: {
            display: "none"
          }
        }}
      >
        {holidayStopRequestsList.map((holidayStopRequest, index) => (
          <SummaryTableRow
            key={index}
            shouldShowExpectedCredit={shouldShowExpectedCredit}
            issueKeyword={props.issueKeyword}
            currency={currency}
            {...holidayStopRequest}
          />
        ))}
      </div>
    </div>
  );
};
