import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import React from "react";
import { formatDateStr } from "../../../shared/dates";
import {
  augmentInterval,
  getMainPlan,
  PaidSubscriptionPlan,
  ProductDetail
} from "../../../shared/productResponse";
import { ProductTypes } from "../../../shared/productTypes";
import { maxWidth } from "../../styles/breakpoints";
import { LinkButton } from "../buttons";
import { FlowStartMultipleProductDetailHandler } from "../flowStartMultipleProductDetailHandler";
import { navLinks } from "../nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "../page";
import { CardDisplay } from "../payment/cardDisplay";
import { DirectDebitDisplay } from "../payment/directDebitDisplay";
import { PaypalLogo } from "../payment/paypalLogo";
import { ProductDescriptionListTable } from "../productDescriptionListTable";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";
import { RouteableStepProps } from "../wizardRouterAdapter";

export const ManageMembership = (props: RouteableStepProps) => {
  const subHeadingCss = `
    border-top: 1px solid ${palette.neutral["86"]};
    ${headline.small()};
    font-weight: bold;
    margin-top: 50px;
    ${maxWidth.tablet} {
      font-size: 1.25rem;
      line-height: 1.6;
    };
  `;

  return (
    <FlowStartMultipleProductDetailHandler
      {...props}
      headingPrefix={"Manage contribution"}
      hideHeading
      hasLeftNav={{
        pageTitle: "Manage contribution",
        selectedNavItem: navLinks.subscriptions
      }}
      supportRefererSuffix="manage_contribution_flow"
      loadingMessagePrefix="Retrieving details of your"
      cancelledExplainer={`This ${props.productType.friendlyName} has been cancelled. You cannot view any of its delivery history.
    Please contact us if you would like to re-start this ${props.productType.friendlyName}, make any amendments or need further help.`}
      allowCancelledSubscription
      singleProductDetailRenderer={(
        routeableStepProps: RouteableStepProps,
        productDetail: ProductDetail
      ) => {
        const productType =
          ProductTypes.contentSubscriptions.mapGroupedToSpecific?.(
            productDetail
          ) || props.productType;

        const membershipTier =
          productType?.alternateTierValue || productDetail.tier;

        const mainPlan = getMainPlan(
          productDetail.subscription
        ) as PaidSubscriptionPlan;

        const mainPlanInterval = augmentInterval(mainPlan.interval);

        return (
          <>
            <PageHeaderContainer
              selectedNavItem={navLinks.accountOverview}
              title="Manage membership"
              breadcrumbs={[
                {
                  title: navLinks.accountOverview.title,
                  link: navLinks.accountOverview.link
                },
                {
                  title: "Manage membership",
                  currentPage: true
                }
              ]}
            />
            <PageNavAndContentContainer
              selectedNavItem={navLinks.accountOverview}
            >
              <h2
                css={css`
                  ${subHeadingCss}
                `}
              >
                Membership details
              </h2>
              <ProductDescriptionListTable
                content={[
                  {
                    title: "Membership tier",
                    value: membershipTier
                  },
                  {
                    title: "Start date",
                    value: productDetail.subscription.start
                      ? formatDateStr(productDetail.subscription.start)
                      : "-"
                  }
                ]}
              />
              <LinkButton
                colour={palette.brand[800]}
                textColour={palette.brand[400]}
                fontWeight="bold"
                text="Change tier"
                to={`/account-overview`}
                state={productDetail}
              />
              <a
                href="/account-overview"
                css={css`
                display: inline-block;
                margin-left: ${space["5"]}px;
                ${textSans.medium({ fontWeight: "bold" })}
                color: ${palette.brand["400"]};
                border-bottom: 1px solid ${palette.neutral["100"]};
                transition: border-color .15s ease-out;
                :hover: {
                  borderBottom: 1px solid ${palette.brand["400"]};
                }
              `}
              >
                Cancel membership
              </a>
              <h2
                css={css`
                  ${subHeadingCss}
                `}
              >
                Payment
              </h2>
              <ProductDescriptionListTable
                borderColour={palette.neutral[86]}
                alternateRowBgColors
                content={[
                  {
                    title: `Next ${mainPlanInterval} payment`,
                    ...(productDetail.subscription.nextPaymentDate &&
                      productDetail.subscription.autoRenew && {
                        value: `${mainPlan.currency}${(
                          mainPlan.amount / 100.0
                        ).toFixed(2)}${" "}${mainPlan.currencyISO}`
                      })
                  },
                  {
                    title: "Next payment date",
                    ...(productDetail.subscription.nextPaymentDate &&
                      productDetail.subscription.autoRenew && {
                        value: formatDateStr(
                          productDetail.subscription.nextPaymentDate
                        )
                      })
                  },
                  {
                    title: "Payment method",
                    value: (
                      <>
                        {productDetail.subscription.card && (
                          <CardDisplay
                            margin="0"
                            {...productDetail.subscription.card}
                          />
                        )}
                        {productDetail.subscription.payPalEmail && (
                          <PaypalLogo />
                        )}
                        {productDetail.subscription.mandate && (
                          <DirectDebitDisplay
                            {...productDetail.subscription.mandate}
                          />
                        )}
                        {productDetail.subscription
                          .stripePublicKeyForCardAddition && (
                          <span>No Payment Method</span>
                        )}
                      </>
                    )
                  },
                  {
                    title: "Expiry date",
                    ...(productDetail.subscription.card?.expiry && {
                      value: `${
                        productDetail.subscription.card.expiry.month < 10
                          ? "0"
                          : ""
                      }${productDetail.subscription.card.expiry.month}
                    ${" / "}
                    ${productDetail.subscription.card.expiry.year}`
                    })
                  }
                ]}
              />
              <LinkButton
                colour={palette.brand[800]}
                textColour={palette.brand[400]}
                fontWeight="bold"
                text="Update payment method"
                to={`/payment/${productType.urlPart}`}
                state={productDetail}
              />
              <p
                css={css`
                  ${textSans.medium()};
                  margin: ${space["9"]}px 0;
                  padding: 0;
                `}
              >
                We no longer have a membership programme but you can still
                continue to support The Guardian via a contribution or
                subscription.
              </p>
              <SupportTheGuardianButton supportReferer={productType.urlPart} />
            </PageNavAndContentContainer>
          </>
        );
      }}
    />
  );
};
