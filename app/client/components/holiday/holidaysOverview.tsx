import { navigate } from "@reach/router";
import React from "react";
import {
  MDA_TEST_USER_HEADER,
  MembersDataApiResponseContext,
  ProductDetail
} from "../../../shared/productResponse";
import {
  ProductTypeWithHolidayStopsFlow,
  WithProductType
} from "../../../shared/productTypes";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { ReFetch } from "../asyncLoader";
import { Button } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { GenericErrorScreen } from "../genericErrorScreen";
import { NavigateFnContext } from "../payment/update/updatePaymentFlow";
import { InfoIcon } from "../svgs/infoIcon";
import {
  ReturnToYourProductButton,
  RouteableStepProps,
  WizardStep
} from "../wizardRouterAdapter";
import {
  creditExplainerSentence,
  HolidayQuestionsModal
} from "./holidayQuestionsModal";
import {
  calculateIssuesImpactedPerYear,
  embellishExistingHolidayStops,
  GetHolidayStopsAsyncLoader,
  GetHolidayStopsResponse,
  HolidayStopsResponseContext,
  momentiseDateStr
} from "./holidayStopApi";
import { SummaryTable } from "./summaryTable";

export type HolidayStopsRouteableStepProps = RouteableStepProps &
  WithProductType<ProductTypeWithHolidayStopsFlow>;

export interface OverviewRowProps {
  heading: string;
  children: React.ReactFragment;
}

const OverviewRow = (props: OverviewRowProps) => (
  <div
    css={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "top",
      marginBottom: "20px"
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
      {props.children}
    </div>
  </div>
);

const friendlyLongDateFormat = "D MMMM YYYY";

const renderHolidayStopsOverview = (
  productDetail: ProductDetail,
  props: HolidayStopsRouteableStepProps
) => (holidayStopsResponse: GetHolidayStopsResponse, reload: ReFetch) => {
  const renewalDateMoment = momentiseDateStr(
    productDetail.subscription.renewalDate
  );

  const combinedIssuesImpactedPerYear = calculateIssuesImpactedPerYear(
    holidayStopsResponse.existing.flatMap(
      existing => existing.publicationsImpacted
    ),
    renewalDateMoment
  );

  return (
    <HolidayStopsResponseContext.Provider
      value={{ ...holidayStopsResponse, reload }}
    >
      <MembersDataApiResponseContext.Provider value={productDetail}>
        <WizardStep routeableStepProps={props} hideBackButton>
          <div>
            <h1>Suspend {props.productType.friendlyName}</h1>
            <OverviewRow heading="How">
              <>
                <div>
                  You can suspend up to{" "}
                  <strong>
                    {holidayStopsResponse.annualIssueLimit}{" "}
                    {props.productType.holidayStops.issueKeyword}s
                  </strong>{" "}
                  per year of your subscription. <br />
                </div>
                {props.productType.holidayStops.alternateNoticeString && (
                  <div>
                    Please provide{" "}
                    <strong>
                      {props.productType.holidayStops.alternateNoticeString}
                    </strong>.
                  </div>
                )}
                <div>
                  {creditExplainerSentence(
                    props.productType.holidayStops.issueKeyword
                  )}
                </div>
                {props.productType.holidayStops.additionalHowAdvice && (
                  <div>
                    {props.productType.holidayStops.additionalHowAdvice}
                  </div>
                )}
                <div
                  css={{
                    fontFamily: sans,
                    fontSize: "14px",
                    margin: "10px",
                    display: "flex",
                    alignItems: "top"
                  }}
                >
                  <InfoIcon />
                  <div>
                    <strong>
                      {renewalDateMoment.format(friendlyLongDateFormat)}
                    </strong>{" "}
                    is the next anniversary of your subscription.
                    <br />The number of{" "}
                    {props.productType.holidayStops.issueKeyword}s you can
                    suspend per year is reset on this date.
                  </div>
                </div>
                <HolidayQuestionsModal
                  annualIssueLimit={holidayStopsResponse.annualIssueLimit}
                  holidayStopFlowProperties={props.productType.holidayStops}
                />
              </>
            </OverviewRow>
            <OverviewRow heading="Summary">
              <>
                {holidayStopsResponse.existing.length > 0 ? (
                  <>
                    <div>
                      You have suspended{" "}
                      <strong>
                        {combinedIssuesImpactedPerYear.issuesThisYear.length}/{
                          holidayStopsResponse.annualIssueLimit
                        }
                      </strong>{" "}
                      {props.productType.holidayStops.issueKeyword}s until{" "}
                      {renewalDateMoment.format(friendlyLongDateFormat)}
                      {combinedIssuesImpactedPerYear.issuesNextYear.length >
                        0 && (
                        <span>
                          {" "}
                          and{" "}
                          <strong>
                            {
                              combinedIssuesImpactedPerYear.issuesNextYear
                                .length
                            }/{holidayStopsResponse.annualIssueLimit}
                          </strong>{" "}
                          {props.productType.holidayStops.issueKeyword}s the
                          following year
                        </span>
                      )}.
                    </div>
                  </>
                ) : (
                  <div>
                    You have{" "}
                    <strong>{holidayStopsResponse.annualIssueLimit}</strong>{" "}
                    {props.productType.holidayStops.issueKeyword}s available to
                    suspend until{" "}
                    {renewalDateMoment.format(friendlyLongDateFormat)}.
                  </div>
                )}
                <div
                  css={{
                    textAlign: "right",
                    marginTop: "10px",
                    [minWidth.phablet]: {
                      display: "none"
                    }
                  }}
                >
                  <Button
                    text="Create suspension"
                    right
                    primary
                    onClick={() => (props.navigate || navigate)("create")}
                  />
                </div>
              </>
            </OverviewRow>
            <OverviewRow heading="Details">
              {holidayStopsResponse.existing.length > 0 ? (
                <SummaryTable
                  data={holidayStopsResponse.existing}
                  subscription={productDetail.subscription}
                  issueKeyword={props.productType.holidayStops.issueKeyword}
                />
              ) : (
                "You currently don't have any scheduled suspensions."
              )}
            </OverviewRow>
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "30px",
                [maxWidth.phablet]: {
                  flexDirection: "column-reverse"
                }
              }}
            >
              <div css={{ marginTop: "10px", alignSelf: "flex-start" }}>
                <ReturnToYourProductButton productType={props.productType} />
              </div>
              <div css={{ marginTop: "10px", alignSelf: "flex-end" }}>
                <Button
                  text="Create suspension"
                  right
                  primary
                  onClick={() => (props.navigate || navigate)("create")}
                />
              </div>
            </div>
          </div>
        </WizardStep>
      </MembersDataApiResponseContext.Provider>
    </HolidayStopsResponseContext.Provider>
  );
};

const createGetHolidayStopsFetcher = (
  subscriptionName: string,
  isTestUser: boolean
) => () =>
  fetch(`/api/holidays/${subscriptionName}`, {
    headers: {
      [MDA_TEST_USER_HEADER]: `${isTestUser}`
    }
  });

export const HolidaysOverview = (props: HolidayStopsRouteableStepProps) => (
  <FlowStartMultipleProductDetailHandler
    {...props}
    headingPrefix="Manage suspensions of"
    hideHeading
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
                productDetail.subscription.subscriptionId,
                productDetail.isTestUser
              )}
              render={renderHolidayStopsOverview(productDetail, props)}
              loadingMessage="Loading existing suspensions..."
              readerOnOK={embellishExistingHolidayStops}
            />
          ) : (
            <GenericErrorScreen loggingMessage="Subscription had no start date" />
          )}
        </NavigateFnContext.Provider>
      </MembersDataApiResponseContext.Provider>
    )}
  />
);
