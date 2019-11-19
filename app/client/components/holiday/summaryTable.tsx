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
import { ReFetch } from "../asyncLoader";
import { CollatedCredits } from "./collatedCredits";
import { ExistingHolidayStopActions } from "./existingHolidayStopActions";
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
  reloadParent?: ReFetch;
  setExistingHolidayStopToAmend?: (newValue: HolidayStopRequest | null) => void;
}

const friendlyDateFormatPrefix = "D\xa0MMMM"; // non-breaking space

const friendlyDateFormatSuffix = "\xa0YYYY"; // non-breaking space

export const formatDateRangeAsFriendly = (range: DateRange) =>
  range.start.format(
    friendlyDateFormatPrefix +
      (range.start.year() !== range.end.year() ? friendlyDateFormatSuffix : "")
  ) +
  " - " +
  range.end.format(friendlyDateFormatPrefix + friendlyDateFormatSuffix);

interface SummaryTableRowProps extends MinimalHolidayStopRequest {
  issueKeyword: string;
  isOperatingOnNewHolidayStop: boolean;
  reloadParent?: ReFetch;
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

  const withdrawnRelatedCSS = props.withdrawnDate
    ? { textDecoration: "line-through" }
    : {};

  return props.asTD ? (
    <tr>
      <td css={withdrawnRelatedCSS}>{dateRangeStr}</td>
      <td css={withdrawnRelatedCSS}>{detailPart}</td>
      <td>
        {props.isOperatingOnNewHolidayStop ? (
          <CollatedCredits {...props} />
        ) : (
          <ExistingHolidayStopActions {...props} />
        )}
      </td>
    </tr>
  ) : (
    <div css={{ marginBottom: "20px", ...withdrawnRelatedCSS }}>
      <div
        css={{
          ...cellCss,
          ...withdrawnRelatedCSS,
          backgroundColor: palette.neutral["7"],
          borderBottom: 0
        }}
      >
        {dateRangeStr}
      </div>
      <div css={{ ...cellCss, ...withdrawnRelatedCSS }}>{detailPart}</div>
      <div css={{ ...cellCss, borderTop: 0 }}>
        {props.isOperatingOnNewHolidayStop ? (
          <>
            <strong>Expected Credits</strong>
            <CollatedCredits {...props} withBullet />
          </>
        ) : (
          <ExistingHolidayStopActions {...props} />
        )}
      </div>
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

  const isOperatingOnNewHolidayStop = isSharedHolidayDateChooserState(
    props.data
  );

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
            {isOperatingOnNewHolidayStop ? (
              <th>Expected Credits</th>
            ) : (
              <th css={{ minWidth: "205px" }}>Actions</th>
            )}
          </tr>
          {holidayStopRequestsList.map((holidayStopRequest, index) => (
            <SummaryTableRow
              {...props}
              key={index}
              isOperatingOnNewHolidayStop={isOperatingOnNewHolidayStop}
              currency={currency}
              {...holidayStopRequest}
              asTD
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
            {...props}
            key={index}
            isOperatingOnNewHolidayStop={isOperatingOnNewHolidayStop}
            currency={currency}
            {...holidayStopRequest}
          />
        ))}
      </div>
    </div>
  );
};
