import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { Link, navigate } from "@reach/router";
import { FlexWrapProperty, FontWeightProperty } from "csstype";
import { startCase } from "lodash";
import { Moment } from "moment";
import { DateRange } from "moment-range";
import * as Raven from "raven-js";
import React from "react";
import { OnSelectCallbackParam } from "react-daterange-picker";
import {
  friendlyLongDateFormat,
  momentiseDateStr
} from "../../../shared/dates";
import {
  isProduct,
  MembersDataApiItemContext,
  ProductDetail
} from "../../../shared/productResponse";
import { IsInAccountOverviewContext } from "../../accountOverviewRelease";
import palette from "../../colours";
import { maxWidth, minWidth, queries } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import { trackEvent } from "../analytics";
import { Button } from "../buttons";
import { DatePicker } from "../datePicker";
import { GenericErrorScreen } from "../genericErrorScreen";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { ProgressIndicator } from "../progressIndicator";
import { Spinner } from "../spinner";
import { InfoIcon } from "../svgs/infoIcon";
import { visuallyNavigateToParent, WizardStep } from "../wizardRouterAdapter";
import { HolidayAnniversaryDateExplainerModal } from "./holidayAnniversaryDateExplainerModal";
import {
  creditExplainerSentence,
  HolidayQuestionsModal
} from "./holidayQuestionsModal";
import { HolidayStopsRouteableStepProps } from "./holidaysOverview";
import {
  calculateIssuesImpactedPerYear,
  convertRawPotentialHolidayStopDetail,
  getPotentialHolidayStopsFetcher,
  HolidayStopDetail,
  HolidayStopsResponseContext,
  isHolidayStopsResponse,
  isNotBulkSuspension,
  isNotWithdrawn,
  IssuesImpactedPerYear,
  PotentialHolidayStopsResponse,
  ReloadableGetHolidayStopsResponse
} from "./holidayStopApi";

export const cancelLinkCss = {
  marginRight: "20px",
  fontFamily: sans,
  fontWeight: "bold" as FontWeightProperty,
  textDecoration: "underline",
  fontSize: "16px",
  color: palette.neutral["2"]
};

export const buttonBarCss = {
  display: "flex",
  alignItems: "center",
  marginTop: "40px",
  flexWrap: "wrap" as FlexWrapProperty
};

const fixedButtonFooterCss = {
  [maxWidth.mobileLandscape]: {
    justifyContent: "space-between"
  },
  [maxWidth.phablet]: {
    position: "fixed",
    zIndex: 998,
    bottom: 0,
    left: 0,
    right: 0,
    background: palette.white,
    padding: "10px",
    boxShadow: "0 0 5px" + palette.neutral["4"]
  }
};

const displayNumberOfIssuesAsText = (
  numberOfIssues: number,
  issueKeyword: string
) => {
  return (
    <strong>
      {numberOfIssues}&nbsp;{issueKeyword}
      {numberOfIssues !== 1 ? "s" : ""}
    </strong>
  );
};

const anniversaryDateToElement = (renewalDateMoment: Moment) => (
  <>{renewalDateMoment.format(friendlyLongDateFormat)}*</>
);

const extractMaybeLockedStartDate = (
  holidayStopsResponse: ReloadableGetHolidayStopsResponse
) =>
  !!holidayStopsResponse.existingHolidayStopToAmend &&
  holidayStopsResponse.existingHolidayStopToAmend.mutabilityFlags &&
  !holidayStopsResponse.existingHolidayStopToAmend.mutabilityFlags
    .isFullyMutable &&
  holidayStopsResponse.existingHolidayStopToAmend.mutabilityFlags
    .isEndDateEditable
    ? holidayStopsResponse.existingHolidayStopToAmend.dateRange.start
    : null;

export interface SharedHolidayDateChooserState {
  selectedRange: DateRange;
  publicationsImpacted: HolidayStopDetail[];
}

export const HolidayDateChooserStateContext: React.Context<
  SharedHolidayDateChooserState | {}
> = React.createContext({});

export function isSharedHolidayDateChooserState(
  state: any
): state is SharedHolidayDateChooserState {
  return !!state && state.selectedRange && state.publicationsImpacted;
}

interface HolidayDateChooserProps extends HolidayStopsRouteableStepProps {
  requiresExistingHolidayStopToAmendInContext?: true;
}

interface HolidayDateChooserState {
  selectedRange?: DateRange;
  publicationsImpacted?: HolidayStopDetail[];
  issuesImpactedPerYearBySelection?: IssuesImpactedPerYear | null;
  validationErrorMessage: React.ReactNode | null;
}

export class HolidayDateChooser extends React.Component<
  HolidayDateChooserProps,
  HolidayDateChooserState
> {
  // https://stackoverflow.com/questions/53575461/react-typescript-context-in-react-component-class
  public static contextType = HolidayStopsResponseContext;
  public context!: React.ContextType<typeof HolidayStopsResponseContext>;

  public state: HolidayDateChooserState = {
    issuesImpactedPerYearBySelection: null,
    validationErrorMessage: null
  };

  public componentDidMount = () => {
    const holidayStopsResponse = this.context;
    if (
      isHolidayStopsResponse(holidayStopsResponse) &&
      holidayStopsResponse.existingHolidayStopToAmend
    ) {
      const maybeLockedStartDate = extractMaybeLockedStartDate(
        holidayStopsResponse
      );

      this.setState({
        selectedRange:
          holidayStopsResponse.existingHolidayStopToAmend.dateRange,
        validationErrorMessage: `Please select your new ${
          maybeLockedStartDate
            ? "end date (the start date is locked because it is within notice period) "
            : "dates"
        }...`
      });
    }
  };

  public render = () => (
    <HolidayStopsResponseContext.Consumer>
      {holidayStopsResponse =>
        isHolidayStopsResponse(holidayStopsResponse) ? (
          <MembersDataApiItemContext.Consumer>
            {productDetail => {
              if (isProduct(productDetail)) {
                const existingHolidayStopToAmendId =
                  holidayStopsResponse.existingHolidayStopToAmend &&
                  holidayStopsResponse.existingHolidayStopToAmend.id;

                const renewalDateMoment = momentiseDateStr(
                  productDetail.subscription.renewalDate
                );

                const combinedIssuesImpactedPerYear = calculateIssuesImpactedPerYear(
                  holidayStopsResponse.existing
                    .filter(isNotWithdrawn)
                    .filter(isNotBulkSuspension)
                    .filter(_ => _.id !== existingHolidayStopToAmendId)
                    .flatMap(_ => _.publicationsImpacted),
                  renewalDateMoment
                );

                const allIssuesImpactedPerYear = calculateIssuesImpactedPerYear(
                  holidayStopsResponse.existing
                    .filter(isNotWithdrawn)
                    .filter(isNotBulkSuspension)
                    .flatMap(_ => _.publicationsImpacted),
                  renewalDateMoment
                );

                return (
                  <HolidayDateChooserStateContext.Provider
                    value={this.state || {}}
                  >
                    <IsInAccountOverviewContext.Consumer>
                      {isInAccountOverview => (
                        <WizardStep
                          routeableStepProps={this.props}
                          hideBackButton
                          {...(isInAccountOverview ? { fullWidth: true } : {})}
                        >
                          {isInAccountOverview ? (
                            <>
                              <PageHeaderContainer
                                title="Manage suspensions"
                                breadcrumbs={[
                                  {
                                    title: navLinks.accountOverview.title,
                                    link: navLinks.accountOverview.link
                                  },
                                  {
                                    title: "Manage suspensions",
                                    currentPage: true
                                  }
                                ]}
                              />
                              <PageNavAndContentContainer
                                selectedNavItem={navLinks.accountOverview}
                              >
                                {this.innerContent(
                                  holidayStopsResponse,
                                  existingHolidayStopToAmendId,
                                  renewalDateMoment,
                                  combinedIssuesImpactedPerYear,
                                  allIssuesImpactedPerYear,
                                  productDetail
                                )}
                              </PageNavAndContentContainer>
                            </>
                          ) : (
                            this.innerContent(
                              holidayStopsResponse,
                              existingHolidayStopToAmendId,
                              renewalDateMoment,
                              combinedIssuesImpactedPerYear,
                              allIssuesImpactedPerYear,
                              productDetail
                            )
                          )}
                        </WizardStep>
                      )}
                    </IsInAccountOverviewContext.Consumer>
                  </HolidayDateChooserStateContext.Provider>
                );
              } else {
                return (
                  <GenericErrorScreen loggingMessage="No product detail for holiday stop date chooser" />
                );
              }
            }}
          </MembersDataApiItemContext.Consumer>
        ) : (
          <GenericErrorScreen loggingMessage="No holiday stop response" />
        )
      }
    </HolidayStopsResponseContext.Consumer>
  );
  private innerContent = (
    holidayStopsResponse: ReloadableGetHolidayStopsResponse,
    existingHolidayStopToAmendId: string | undefined,
    renewalDateMoment: Moment,
    combinedIssuesImpactedPerYear: IssuesImpactedPerYear,
    allIssuesImpactedPerYear: IssuesImpactedPerYear,
    productDetail: ProductDetail
  ) => (
    <>
      <ProgressIndicator
        steps={[
          { title: "Choose dates", isCurrentStep: true },
          { title: "Review" },
          { title: "Confirmation" }
        ]}
        additionalCSS={css`
          margin: ${space[5]}px 0 ${space[12]}px;
        `}
      />
      {this.props.requiresExistingHolidayStopToAmendInContext &&
        !holidayStopsResponse.existingHolidayStopToAmend &&
        visuallyNavigateToParent(this.props)}

      <h1>Choose the dates you will be away</h1>
      <p>
        The first available date is{" "}
        <strong>
          {holidayStopsResponse.productSpecifics.firstAvailableDate.format(
            "dddd D MMMM"
          )}
        </strong>{" "}
        due to{" "}
        {this.props.productType.holidayStops.alternateNoticeString ? (
          <strong>
            {this.props.productType.holidayStops.alternateNoticeString} period
          </strong>
        ) : (
          "our printing and delivery schedule (notice period)"
        )}
        .
        <br />
        {creditExplainerSentence(
          this.props.productType.holidayStops.issueKeyword
        )}
      </p>
      <div
        css={{
          fontFamily: sans,
          fontSize: "14px",
          marginBottom: "27px"
        }}
      >
        <div css={{ margin: "10px" }}>
          <InfoIcon />
          You can schedule one suspension at a time.
        </div>
        <div
          css={{
            [minWidth.mobileLandscape]: { display: "none" }
          }}
        >
          <HolidayQuestionsModal
            annualIssueLimit={holidayStopsResponse.annualIssueLimit}
            holidayStopFlowProperties={this.props.productType.holidayStops}
          />
        </div>
      </div>

      <DatePicker
        firstAvailableDate={
          holidayStopsResponse.productSpecifics.firstAvailableDate
        }
        issueDaysOfWeek={holidayStopsResponse.productSpecifics.issueDaysOfWeek}
        issueKeyword={startCase(
          this.props.productType.holidayStops.issueKeyword
        )}
        existingDates={holidayStopsResponse.existing
          .filter(isNotWithdrawn)
          .filter(
            holidayStopRequest =>
              holidayStopRequest.id !== existingHolidayStopToAmendId
          )
          .map(hsr => hsr.dateRange)}
        amendableDateRange={
          holidayStopsResponse.existingHolidayStopToAmend &&
          holidayStopsResponse.existingHolidayStopToAmend.dateRange
        }
        selectedRange={this.state.selectedRange}
        maybeLockedStartDate={extractMaybeLockedStartDate(holidayStopsResponse)}
        selectionInfo={this.getSelectionInfoElement(
          renewalDateMoment,
          combinedIssuesImpactedPerYear,
          holidayStopsResponse.annualIssueLimit
        )}
        onSelect={this.onSelect(
          renewalDateMoment,
          productDetail.subscription.subscriptionId,
          combinedIssuesImpactedPerYear,
          allIssuesImpactedPerYear,
          holidayStopsResponse.annualIssueLimit,
          productDetail.isTestUser
        )}
        dateToAsterisk={renewalDateMoment}
      />
      <div
        css={{
          ...buttonBarCss,
          justifyContent: "flex-end",
          ...fixedButtonFooterCss
        }}
      >
        <div
          css={{
            marginRight: "30px",
            [maxWidth.mobileLandscape]: {
              display: "none"
            }
          }}
        >
          <HolidayQuestionsModal
            annualIssueLimit={holidayStopsResponse.annualIssueLimit}
            holidayStopFlowProperties={this.props.productType.holidayStops}
          />
        </div>
        <Link
          css={{
            marginRight: "20px",
            fontFamily: sans,
            fontWeight: "bold" as FontWeightProperty,
            textDecoration: "underline",
            fontSize: "16px",
            color: palette.neutral["2"]
          }}
          to=".."
          replace={true}
        >
          Cancel
        </Link>
        <div>
          <Button
            text="Review details"
            right
            disabled={
              !!this.state.validationErrorMessage ||
              !this.state.selectedRange ||
              !this.state.issuesImpactedPerYearBySelection
            }
            onClick={() => (this.props.navigate || navigate)("review")}
            primary
          />
        </div>
      </div>
      <div css={{ height: "10px" }} />
    </>
  );
  private onSelect = (
    renewalDateMoment: Moment,
    subscriptionName: string,
    combinedIssuesImpactedPerYear: IssuesImpactedPerYear,
    allIssuesImpactedPerYear: IssuesImpactedPerYear,
    annualIssueLimit: number,
    isTestUser: boolean
  ) => ({ start, end }: OnSelectCallbackParam) =>
    this.setState(
      {
        selectedRange: new DateRange(start, end),
        issuesImpactedPerYearBySelection: null,
        validationErrorMessage: null
      },
      () =>
        getPotentialHolidayStopsFetcher(
          subscriptionName,
          start,
          end,
          isTestUser
        )()
          .then(response => {
            const locationHeader = response.headers.get("Location");
            if (
              response.status === 401 &&
              locationHeader &&
              window !== undefined
            ) {
              window.location.replace(locationHeader);
              return Promise.resolve([]);
            } else if (response.ok) {
              return response.json();
            }
            return Promise.reject(`${response.status} from holiday-stop-api`);
          })
          .then(({ potentials }: PotentialHolidayStopsResponse) => {
            const publicationsImpacted = potentials.map(
              convertRawPotentialHolidayStopDetail
            );

            const issuesImpactedPerYearBySelection = calculateIssuesImpactedPerYear(
              publicationsImpacted,
              renewalDateMoment
            );

            const issuesRemainingThisYear =
              Math.max(
                annualIssueLimit,
                allIssuesImpactedPerYear.issuesThisYear.length
              ) - combinedIssuesImpactedPerYear.issuesThisYear.length;

            const issuesRemainingNextYear =
              Math.max(
                annualIssueLimit,
                allIssuesImpactedPerYear.issuesNextYear.length
              ) - combinedIssuesImpactedPerYear.issuesNextYear.length;

            const validationErrorMessage: React.ReactNode = this.validateIssuesSelected(
              renewalDateMoment,
              annualIssueLimit,
              issuesImpactedPerYearBySelection.issuesThisYear.length,
              issuesRemainingThisYear,
              issuesImpactedPerYearBySelection.issuesNextYear.length,
              issuesRemainingNextYear
            );
            this.setState({
              publicationsImpacted,
              issuesImpactedPerYearBySelection,
              validationErrorMessage
            });
          })
          .catch(error => {
            this.setState({
              validationErrorMessage: `Failed to calculate ${this.props.productType.holidayStops.issueKeyword}s impacted by selected dates. Please try again later...`
            });
            trackEvent({
              eventCategory: "holidayDateChooser",
              eventAction: "error",
              eventLabel: error ? error.toString() : undefined
            });
            Raven.captureException(error);
          })
    );

  private validateIssuesSelected = (
    renewalDateMoment: Moment,
    annualIssueLimit: number,
    numPotentialIssuesThisYear: number,
    issuesRemainingThisYear: number,
    numPotentialIssuesNextYear: number,
    issuesRemainingNextYear: number
  ) => {
    if (numPotentialIssuesThisYear > issuesRemainingThisYear) {
      const dateElement = anniversaryDateToElement(renewalDateMoment);
      return (
        <>
          Exceeded {this.props.productType.holidayStops.issueKeyword} limit of{" "}
          {annualIssueLimit} before {dateElement}{" "}
          <HolidayAnniversaryDateExplainerModal
            dateElement={dateElement}
            issueKeyword={this.props.productType.holidayStops.issueKeyword}
          />
          <br />
          Please choose fewer/different days...
        </>
      );
    } else if (numPotentialIssuesNextYear > issuesRemainingNextYear) {
      const firstDateElement = anniversaryDateToElement(renewalDateMoment);
      return (
        <>
          Exceeded {this.props.productType.holidayStops.issueKeyword} limit of{" "}
          {annualIssueLimit} between {firstDateElement} and{" "}
          {anniversaryDateToElement(renewalDateMoment.clone().add(1, "year"))}{" "}
          <HolidayAnniversaryDateExplainerModal
            dateElement={firstDateElement}
            issueKeyword={this.props.productType.holidayStops.issueKeyword}
          />
          <br />
          Please choose fewer/different days...
        </>
      );
    } else if (
      numPotentialIssuesThisYear < 1 &&
      numPotentialIssuesNextYear < 1
    ) {
      return `No ${this.props.productType.holidayStops.issueKeyword}s occur during selected period`;
    }
    return null; // important don't remove
  };

  private getSelectionInfoElement = (
    renewalDateMoment: Moment,
    combinedIssuesImpactedPerYear: IssuesImpactedPerYear,
    annualIssueLimit: number
  ) => {
    const issuesRemainingThisYear = Math.max(
      0,
      annualIssueLimit -
        combinedIssuesImpactedPerYear.issuesThisYear.length -
        (this.state.issuesImpactedPerYearBySelection
          ? this.state.issuesImpactedPerYearBySelection.issuesThisYear.length
          : 0)
    );

    const issuesRemainingNextYear = Math.max(
      0,
      annualIssueLimit -
        combinedIssuesImpactedPerYear.issuesNextYear.length -
        (this.state.issuesImpactedPerYearBySelection
          ? this.state.issuesImpactedPerYearBySelection.issuesNextYear.length
          : 0)
    );

    if (this.state.validationErrorMessage) {
      return (
        <div
          css={{
            color: palette.red.medium,
            fontWeight: "bold",
            marginTop: "10px"
          }}
        >
          {this.state.validationErrorMessage}
        </div>
      );
    } else if (
      !this.state.selectedRange ||
      this.state.issuesImpactedPerYearBySelection
    ) {
      return (
        <>
          <div
            css={{
              marginTop: "10px",
              fontSize: "16px",
              [maxWidth.desktop]: {
                marginRight: "20px"
              }
            }}
          >
            Suspending{" "}
            {displayNumberOfIssuesAsText(
              (this.state.publicationsImpacted || []).length,
              this.props.productType.holidayStops.issueKeyword
            )}
          </div>
          <div
            css={{
              [queries.maxHeight(600)]: {
                display: "none"
              },
              [maxWidth.desktop]: {
                marginTop: "10px"
              }
            }}
          >
            <hr css={{ [maxWidth.desktop]: { display: "none" } }} />
            Leaving you with{" "}
            {displayNumberOfIssuesAsText(
              issuesRemainingThisYear,
              this.props.productType.holidayStops.issueKeyword
            )}{" "}
            available to suspend before{" "}
            {anniversaryDateToElement(renewalDateMoment)}
            {this.state.issuesImpactedPerYearBySelection &&
              this.state.issuesImpactedPerYearBySelection.issuesNextYear
                .length > 0 && (
                <>
                  {" "}
                  and{" "}
                  {displayNumberOfIssuesAsText(
                    issuesRemainingNextYear,
                    this.props.productType.holidayStops.issueKeyword
                  )}{" "}
                  available the following year
                </>
              )}{" "}
            <HolidayAnniversaryDateExplainerModal
              dateElement={anniversaryDateToElement(renewalDateMoment)}
              issueKeyword={this.props.productType.holidayStops.issueKeyword}
            />
          </div>
        </>
      );
    } else {
      return (
        <div css={{ [maxWidth.phablet]: { width: "100%" } }}>
          <Spinner />
        </div>
      );
    }
  };
}
