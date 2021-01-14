import { css } from "@emotion/core";
import { Button, LinkButton } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";
import { SvgArrowLeftStraight } from "@guardian/src-icons";
import { navigate } from "@reach/router";
import * as Sentry from "@sentry/browser";
import React, { useState } from "react";
import {
  isPaidSubscriptionPlan,
  MembersDataApiItemContext
} from "../../../../shared/productResponse";
import { getMainPlan, isProduct } from "../../../../shared/productResponse";
import { PRODUCT_TYPES } from "../../../../shared/productTypes";
import {
  contributionAmountsLookup,
  ContributionInterval,
  ContributionUpdateAmountForm
} from "../../accountoverview/contributionUpdateAmountForm";
import { trackEventInOphanOnly } from "../../analytics";
import { GenericErrorMessage } from "../../identity/GenericErrorMessage";

const container = css`
  & > * + * {
    margin-top: ${space[6]}px;
`;

const ContributionsCancellationFlowPaymentIssueSaveAttempt: React.FC = () => {
  const [showAmountUpdateForm, setShowUpdateForm] = useState(false);

  const onManageClicked = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    trackEventInOphanOnly({
      eventCategory: "cancellation_flow_payment_issue",
      eventAction: "click",
      eventLabel: "manage"
    });

    navigate("/contributions");
  };

  const onUpdateConfirmed = (updatedAmount: number) => {
    trackEventInOphanOnly({
      eventCategory: "cancellation_flow_payment_issue",
      eventAction: "click",
      eventLabel: "change"
    });

    navigate(`mma_payment_issue/saved`, { state: { updatedAmount } });
  };

  const onReduceClicked = () => {
    trackEventInOphanOnly({
      eventCategory: "cancellation_flow_payment_issue",
      eventAction: "click",
      eventLabel: "reduce"
    });

    setShowUpdateForm(true);
  };

  const onCancelClicked = () => {
    trackEventInOphanOnly({
      eventCategory: "cancellation_flow_payment_issue",
      eventAction: "click",
      eventLabel: "cancel"
    });

    navigate(`mma_payment_issue/confirmed`);
  };

  const onReturnClicked = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <MembersDataApiItemContext.Consumer>
      {productDetail => {
        if (!isProduct(productDetail)) {
          Sentry.captureMessage(
            "MembersDataApiItem is not a productDetail in ContributionsCancellationFlowPaymentIssueSaveAttempt"
          );
          return <GenericErrorMessage />;
        }

        const mainPlan = getMainPlan(productDetail.subscription);

        if (!isPaidSubscriptionPlan(mainPlan)) {
          Sentry.captureMessage(
            "mainPlan is not a PaidSubscriptionPlan in ContributionsCancellationFlowPaymentIssueSaveAttempt"
          );
          return <GenericErrorMessage />;
        }

        const currentContributionOptions = (contributionAmountsLookup[
          mainPlan.currencyISO
        ] || contributionAmountsLookup.international)[
          mainPlan.interval as ContributionInterval
        ];

        const isAlreadyPayingMinAmount =
          mainPlan.amount / 100 <= currentContributionOptions.minAmount;

        return (
          <div css={container}>
            <div
              css={css`
                & > * + * {
                  margin-top: ${space[6]}px;
                }
              `}
            >
              <p>
                Before cancelling your contribution, please double-check your
                payment details. You can update these quickly and easily.
              </p>

              <div
                css={css`
                  & > * + * {
                    margin-left: ${space[4]}px;
                  }
                `}
              >
                <LinkButton href="/contributions" onClick={onManageClicked}>
                  Manage payment method
                </LinkButton>

                {isAlreadyPayingMinAmount && (
                  <Button onClick={onCancelClicked} priority="subdued">
                    I still want to cancel
                  </Button>
                )}
              </div>
            </div>
            {!isAlreadyPayingMinAmount && (
              <div>
                <p>
                  If your contribution is no longer affordable, please consider
                  reducing its size rather than cancelling it. Simply pick a new
                  amount and we’ll do the rest.
                </p>

                {showAmountUpdateForm ? (
                  <ContributionUpdateAmountForm
                    currentAmount={mainPlan.amount / 100}
                    subscriptionId={productDetail.subscription.subscriptionId}
                    mainPlan={mainPlan}
                    productType={PRODUCT_TYPES.contributions}
                    nextPaymentDate={productDetail.subscription.nextPaymentDate}
                    mode="CANCELLATION_SAVE"
                    onUpdateConfirmed={onUpdateConfirmed}
                  />
                ) : (
                  <div
                    css={css`
                      & > * + * {
                        margin-left: ${space[4]}px;
                      }
                    `}
                  >
                    <Button onClick={onReduceClicked} priority="secondary">
                      Reduce amount
                    </Button>

                    <Button onClick={onCancelClicked} priority="subdued">
                      I still want to cancel
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div
              css={css`
                margin-top: ${space[24]}px;
              `}
            >
              <LinkButton
                href="/"
                onClick={onReturnClicked}
                priority="tertiary"
                icon={<SvgArrowLeftStraight />}
                iconSide="left"
              >
                Return to your account
              </LinkButton>
            </div>
          </div>
        );
      }}
    </MembersDataApiItemContext.Consumer>
  );
};

export default ContributionsCancellationFlowPaymentIssueSaveAttempt;
