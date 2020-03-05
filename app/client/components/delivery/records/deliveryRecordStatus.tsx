import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { capitalize } from "lodash";
import React from "react";
import { ErrorIcon } from "../../svgs/errorIcon";
import { HolidayStopIcon } from "../../svgs/holidayStopIcon";
import { InfoIconDark } from "../../svgs/infoIconDark";
import { TickInCircle } from "../../svgs/tickInCircle";

interface RecordStatusProps {
  isDispatched: boolean;
  isHolidayStop: boolean;
  isChangedAddress: boolean;
  isChangedDeliveryInstruction: boolean;
  isFutureRecord: boolean;
  deliveryProblem: string | null;
}
export const RecordStatus = (props: RecordStatusProps) => {
  let changesMessage = `${props.isChangedAddress ? "Delivery address" : ""}`;
  if (props.isChangedAddress && !props.isChangedDeliveryInstruction) {
    changesMessage = `${changesMessage} changed`;
  }
  if (props.isChangedDeliveryInstruction) {
    changesMessage = `${changesMessage} ${
      props.isChangedAddress ? " and d" : "D"
    }elivery instructions changed`;
  }
  return (
    <>
      {props.deliveryProblem && (
        <span
          css={css`
            display: block;
            font-weight: bold;
            padding-left: 30px;
            position: relative;
            margin-bottom: ${space[2]}px;
          `}
        >
          <i
            css={css`
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
            <ErrorIcon />
          </i>
          Problem reported ({capitalize(props.deliveryProblem)})
        </span>
      )}
      {!props.deliveryProblem && props.isDispatched && (
        <span
          css={css`
            display: block;
            font-weight: bold;
            padding-left: 30px;
            position: relative;
            margin-bottom: ${space[2]}px;
          `}
        >
          <i
            css={css`
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
            <TickInCircle />
          </i>
          {props.isFutureRecord ? "Scheduled" : "Dispatched"}
        </span>
      )}
      {!props.deliveryProblem && props.isHolidayStop && (
        <span
          css={css`
            display: block;
            font-weight: bold;
            padding-left: 30px;
            position: relative;
            margin-bottom: ${space[2]}px;
          `}
        >
          <i
            css={css`
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
            <HolidayStopIcon />
          </i>
          Holiday stop
        </span>
      )}
      {!props.isHolidayStop && changesMessage && (
        <span
          css={css`
            display: block;
            font-weight: bold;
            padding-left: 30px;
            position: relative;
            margin-bottom: ${space[2]}px;
          `}
        >
          <i
            css={css`
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
            <InfoIconDark fillColor={palette.brand.bright} size={22} />
          </i>
          {changesMessage}
        </span>
      )}
    </>
  );
};
