import { navigate } from "@reach/router";
import moment from "moment";
import { DateRange } from "moment-range";
import React from "react";
import {
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../shared/productResponse";
import { Button } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { QuestionsFooter } from "../footer/in_page/questionsFooter";
import { GenericErrorScreen } from "../genericErrorScreen";
import { NavigateFnContext } from "../payment/update/updatePaymentFlow";
import {
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";
import {
  calculateIssuesImpactedPerYear,
  createGetHolidayStopsFetcher,
  DATE_INPUT_FORMAT,
  embellishExistingHolidayStops,
  GetHolidayStopsAsyncLoader,
  GetHolidayStopsResponse,
  HolidayStopRequest,
  HolidayStopsResponseContext,
  IssuesImpactedPerYear
} from "./holidayStopApi";
import { sans } from "../../styles/fonts";
import palette from "../../colours";
export interface OverviewRowProps {
  heading: string;
  content: React.ReactFragment;
}

export const holidayQuestionsTopicString = "scheduling a suspension";

const tableCellCss = {
  padding: "8px 16px 8px 16px",
  borderBottom: "1px solid " + palette.neutral["5"]
};

const tableCss = {
  width: "100%",
  fontFamily: sans,
  fontSize: "16px",
  border: "1px solid " + palette.neutral["5"],
  borderCollapse: "collapse",
  td: {
    ...tableCellCss
  },
  th: {
    ...tableCellCss,
    backgroundColor: palette.neutral["7"],
    margin: 0
  }
};

const OverviewRow = (props: OverviewRowProps) => (
  <div
    css={{
      display: "flex",
      flexWrap: "wrap",
      textAlign: "top",
      marginBottom: "2%"
    }}
  >
    <div css={{ flex: "1 1 150px" }}>
      <h3 css={{ marginTop: "0", paddingTop: "0" }}>{props.heading}</h3>
    </div>
    <div
      css={{
        flex: "4 4 350px"
      }}
    >
      {props.content}
    </div>
  </div>
);

const friendlyDateFormatPrefix = "D MMM";

const friendlyDateFormatSuffix = " YYYY";

const formatDateRangeAsFriendly = (range: DateRange) =>
  range.start.format(
    friendlyDateFormatPrefix +
      (range.start.year() !== range.end.year() ? friendlyDateFormatSuffix : "")
  ) +
  " - " +
  range.end.format(friendlyDateFormatPrefix + friendlyDateFormatSuffix);

const DetailsTableRow = (holidayStopRequest: HolidayStopRequest) => (
  <tr>
    <td>{formatDateRangeAsFriendly(holidayStopRequest.dateRange)}</td>
    <td>
      {holidayStopRequest.publicationDatesToBeStopped.length} issue{holidayStopRequest
        .publicationDatesToBeStopped.length !== 1
        ? "s"
        : ""}{" "}
      {holidayStopRequest.publicationDatesToBeStopped.map((date, index) => (
        <div key={index}>- {date.format("D MMM")}</div>
      ))}
    </td>
  </tr>
);

const renderHolidayStopsOverview = (
  productDetail: ProductDetail,
  routeableStepProps: RouteableStepProps
) => (holidayStopsResponse: GetHolidayStopsResponse) => {
  const renewalDateMoment = moment(
    productDetail.subscription.renewalDate,
    DATE_INPUT_FORMAT
  );

  const combinedIssuesImpactedPerYear = calculateIssuesImpactedPerYear(
    holidayStopsResponse.existing
      .map(existing => existing.publicationDatesToBeStopped)
      .flat(),
    renewalDateMoment
  );

  return (
    <HolidayStopsResponseContext.Provider value={holidayStopsResponse}>
      <MembersDataApiResponseContext.Provider value={productDetail}>
        <WizardStep
          routeableStepProps={routeableStepProps}
          extraFooterComponents={
            <QuestionsFooter topic={holidayQuestionsTopicString} />
          }
          hideBackButton
        >
          <div>
            <h2>
              Suspend Guardian Weekly ({
                productDetail.subscription.subscriptionId
              })
            </h2>

            <OverviewRow
              heading="How"
              content={
                <>
                  <div>
                    You can suspend up to{" "}
                    {holidayStopsResponse.productSpecifics.annualIssueLimit}{" "}
                    issues per year and you will be credited on your future
                    bills.<br />You can schedule one suspension at a time.
                  </div>
                </>
              }
            />
            <OverviewRow
              heading="Summary"
              content={
                holidayStopsResponse.existing.length > 0 ? (
                  <>
                    <div>
                      You have suspended{" "}
                      <strong>
                        {
                          combinedIssuesImpactedPerYear.issueDatesThisYear
                            .length
                        }/{
                          holidayStopsResponse.productSpecifics.annualIssueLimit
                        }
                      </strong>{" "}
                      issues until {renewalDateMoment.format("D MMMM YYYY")}
                      {combinedIssuesImpactedPerYear.issueDatesNextYear.length >
                      0 ? (
                        <span>
                          {" "}
                          and{" "}
                          <strong>
                            {
                              combinedIssuesImpactedPerYear.issueDatesNextYear
                                .length
                            }/{
                              holidayStopsResponse.productSpecifics
                                .annualIssueLimit
                            }
                          </strong>{" "}
                          issues the following year.
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  <div>
                    You have{" "}
                    <strong>
                      {holidayStopsResponse.productSpecifics.annualIssueLimit}
                    </strong>{" "}
                    issues remainining to suspend until {productDetail.joinDate}
                  </div>
                )
              }
            />
            <OverviewRow
              heading="Details"
              content={
                holidayStopsResponse.existing.length > 0 ? (
                  <table css={tableCss}>
                    <tbody>
                      <tr css={{ textAlign: "left" }}>
                        <th>When</th>
                        <th>Suspended</th>
                      </tr>
                      {holidayStopsResponse.existing.map(
                        (holidayStopRequest, index) => (
                          <DetailsTableRow
                            key={index}
                            {...holidayStopRequest}
                          />
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  "You currently don't have any scheduled suspensions."
                )
              }
            />
            <div
              css={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <ReturnToYourProductButton
                productType={routeableStepProps.productType}
              />
              <div css={{ marginRight: "24px" }} />
              <Button
                text="Create suspension"
                right
                primary
                onClick={() =>
                  (routeableStepProps.navigate || navigate)("create")
                }
              />
            </div>
          </div>
        </WizardStep>
      </MembersDataApiResponseContext.Provider>
    </HolidayStopsResponseContext.Provider>
  );
};

export const HolidaysOverview = (props: RouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix="Manage suspensions of"
    supportRefererSuffix="holiday_stop_flow"
    loadingMessagePrefix="Retrieving details of your"
    singleProductDetailRenderer={(
      routeableStepProps: RouteableStepProps,
      productDetail: ProductDetail
    ) => (
      <MembersDataApiResponseContext.Provider value={productDetail}>
        <NavigateFnContext.Provider value={{ navigate: props.navigate }}>
          {" "}
          {productDetail.subscription.start ? (
            <GetHolidayStopsAsyncLoader
              fetch={createGetHolidayStopsFetcher(
                routeableStepProps.productType.urlPart,
                productDetail.subscription.subscriptionId
              )}
              render={renderHolidayStopsOverview(
                productDetail,
                routeableStepProps
              )}
              loadingMessage="Loading existing suspensions"
              readerOnOK={embellishExistingHolidayStops(
                productDetail.subscription.start
              )}
            />
          ) : (
            <GenericErrorScreen loggingMessage="Subscription had no start date" />
          )}
        </NavigateFnContext.Provider>
      </MembersDataApiResponseContext.Provider>
    )}
  />
);
