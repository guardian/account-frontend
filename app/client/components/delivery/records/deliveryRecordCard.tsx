import { css } from "@emotion/core";
import { Checkbox, CheckboxGroup } from "@guardian/src-checkbox";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import moment from "moment";
import React, { FormEvent } from "react";
import { DeliveryRecordApiItem } from "../../../../shared/productResponse";
import { minWidth } from "../../../styles/breakpoints";
import { DeliveryRecordInstructions } from "./deliveryRecordInstructions";
import { PageStatus } from "./deliveryRecords";
import { RecordAddress } from "./deliveryRecordsAddress";
import { DeliveryProblemMap } from "./deliveryRecordsApi";
import { RecordStatus } from "./deliveryRecordStatus";

interface DeliveryRecordCardProps {
  deliveryRecord: DeliveryRecordApiItem;
  listIndex: number;
  pageStatus: PageStatus;
  deliveryProblemMap: DeliveryProblemMap;
  recordCurrency?: string;
  isChecked?: boolean;
  addRecordToDeliveryProblem?: (id: string) => void;
  removeRecordFromDeliveryProblem?: (id: string) => void;
}

export const DeliveryRecordCard = (props: DeliveryRecordCardProps) => {
  const dtCss = (ignoreMinWidthAtNonMobile?: boolean) => `
        ${textSans.medium()};
        font-weight: bold;
        display: inline-block;
        vertical-align: top;
        min-width: 10ch;
        ${minWidth.tablet} {
          margin-right: 16px;
          ${ignoreMinWidthAtNonMobile ? "min-width: 9ch;" : "min-width: 12ch;"} 
        }
    `;

  const ddCss = (withMobileBlockContent?: boolean) => `
        ${textSans.medium()};
        display: inline-block;
        vertical-align: top;
        margin-left: 0;
    `;

  const recordRowCss = `
        margin-bottom: 10px;
    `;
  return (
    <dl
      css={css`
        border: 1px solid ${palette.neutral["86"]};
        margin: 0;
        padding: ${space[3]}px;
        ${props.pageStatus === PageStatus.REPORT_ISSUE_STEP_2 &&
          `padding-left: ${space[3] * 2 + 40}px;`}
        width: 100%;
        ${props.listIndex > 0 && "border-top: none;"}
        position: relative;
        opacity: ${props.pageStatus === PageStatus.REPORT_ISSUE_STEP_1
          ? "0.5"
          : "1"};
        ${minWidth.tablet} {
          padding: ${space[5]}px;
          ${props.pageStatus === PageStatus.REPORT_ISSUE_STEP_2 &&
            `padding-left: ${space[5] * 2 + 40}px;`}
        }
      `}
    >
      {props.pageStatus === PageStatus.REPORT_ISSUE_STEP_2 && (
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            padding: 0 ${space[3]}px;
            border-right: 1px solid ${palette.neutral["86"]};
            ${minWidth.tablet} {
              padding: 0 18px;
            }
          `}
        >
          <CheckboxGroup
            name={props.deliveryRecord.id}
            css={css`
              position: relative;
              top: 50%;
              transform: translateY(-50%);
            `}
          >
            <Checkbox
              value={props.deliveryRecord.id}
              checked={props.isChecked}
              label=""
              css={css`
                margin-right: 0;
              `}
              onChange={(event: FormEvent<HTMLInputElement>) => {
                const inputEl = event.target as HTMLInputElement;
                if (inputEl.checked) {
                  props.addRecordToDeliveryProblem?.(props.deliveryRecord.id);
                } else {
                  props.removeRecordFromDeliveryProblem?.(
                    props.deliveryRecord.id
                  );
                }
              }}
            />
          </CheckboxGroup>
        </div>
      )}
      <div
        css={css`
          ${recordRowCss}
          ${minWidth.tablet} {
            display: inline-block;
            width: 50%;
          }
        `}
      >
        <dt
          css={css`
            ${dtCss()}
          `}
        >
          Issue Date:
        </dt>
        <dd
          css={css`
            ${ddCss()}
          `}
        >
          {moment(props.deliveryRecord.deliveryDate).format("D MMM YYYY")}
        </dd>
      </div>
      <div
        css={css`
          ${recordRowCss}
          ${minWidth.tablet} {
            display: inline-block;
            width: 50%;
          }
        `}
      >
        <dt
          css={css`
            ${dtCss(true)}
          `}
        >
          Address:
        </dt>
        <dd
          css={css`
            ${ddCss(true)}
          `}
        >
          {props.deliveryRecord.addressLine1 &&
          !props.deliveryRecord.hasHolidayStop ? (
            <RecordAddress
              addressLine1={props.deliveryRecord.addressLine1}
              addressLine2={props.deliveryRecord.addressLine2}
              town={props.deliveryRecord.addressTown}
              postcode={props.deliveryRecord.addressPostcode}
              country={props.deliveryRecord.addressCountry}
            />
          ) : (
            "-"
          )}
        </dd>
      </div>
      <div
        css={css`
          ${recordRowCss}
        `}
      >
        <dt
          css={css`
            ${dtCss()}
          `}
        >
          Status:
        </dt>
        <dd
          css={css`
            ${ddCss()}
            width: calc(100% - 10ch);
            margin-left: -30px;
            ${minWidth.tablet} {
              margin-left: 0;
              width: calc(100% - (13ch + 16px));
            }
          `}
        >
          <RecordStatus
            isDispatched={!!props.deliveryRecord.addressLine1}
            isHolidayStop={!!props.deliveryRecord.hasHolidayStop}
            isChangedAddress={!!props.deliveryRecord.isChangedAddress}
            isChangedDeliveryInstruction={
              !!props.deliveryRecord.isChangedDeliveryInstruction
            }
            deliveryProblem={
              (props.deliveryRecord.problemCaseId &&
                props.deliveryProblemMap[props.deliveryRecord.problemCaseId]
                  ?.problemType) ||
              null
            }
          />
        </dd>
      </div>
      {props.deliveryRecord.problemCaseId && props.deliveryRecord.credit && (
        <>
          <div
            css={css`
              ${recordRowCss}
              margin-top: 10px;
            `}
          >
            <dt
              css={css`
                ${dtCss()}
              `}
            >
              Credit:
            </dt>
            <dd
              css={css`
                ${ddCss()}
                width: calc(100% - 10ch);
                ${minWidth.tablet} {
                  width: calc(100% - (13ch + 16px));
                }
              `}
            >
              {`${props.recordCurrency}${Math.abs(
                props.deliveryRecord.credit.amount
              )} `}
              {props.deliveryRecord.credit.invoiceDate && (
                <p
                  css={css`
                    color: ${palette.neutral["60"]};
                    margin: 0;
                    ${minWidth.tablet} {
                      display: inline-block;
                    }
                  `}
                >{`off your ${moment(
                  props.deliveryRecord.credit.invoiceDate
                ).format("D MMM YYYY")} payment`}</p>
              )}
            </dd>
          </div>
        </>
      )}
      <div
        css={css`
          ${recordRowCss}
        `}
      >
        <dt
          css={css`
            ${dtCss()}
          `}
        >
          Instructions:
        </dt>
        <dd
          css={css`
            ${ddCss(true)}
          `}
        >
          {props.deliveryRecord.deliveryInstruction &&
          !props.deliveryRecord.hasHolidayStop ? (
            <DeliveryRecordInstructions
              message={props.deliveryRecord.deliveryInstruction}
            />
          ) : (
            "N/A"
          )}
        </dd>
      </div>
    </dl>
  );
};