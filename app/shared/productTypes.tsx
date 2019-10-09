import React from "react";
import {
  CancellationReason,
  OptionalCancellationReasonId
} from "../client/components/cancel/cancellationReason";
import { contributionsCancellationFlowStart } from "../client/components/cancel/contributions/contributionsCancellationFlowStart";
import { contributionsCancellationReasons } from "../client/components/cancel/contributions/contributionsCancellationReasons";
import { membershipCancellationFlowStart } from "../client/components/cancel/membership/membershipCancellationFlowStart";
import { membershipCancellationReasons } from "../client/components/cancel/membership/membershipCancellationReasons";
import { NavItem, navLinks } from "../client/components/nav";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "./identity";
import { OphanProduct } from "./ophanTypes";
import { formatDate, ProductDetail, Subscription } from "./productResponse";

export type ProductFriendlyName =
  | "membership"
  | "recurring contribution" // TODO use payment frequency instead of 'recurring' e.g. monthly annual etc
  | "newspaper subscription"
  | "digital subscription"
  | "Guardian Weekly subscription"
  | "subscription";
export type ProductUrlPart =
  | "membership"
  | "contributions"
  | "paper"
  | "digital"
  | "guardianweekly"
  | "subscriptions";
export type SfProduct = "Membership" | "Contribution";
export type ProductTitle = "Membership" | "Contributions" | "Subscriptions";
export type AllProductsProductTypeFilterString =
  | "Weekly"
  | "Paper"
  | "Contribution"
  | "Membership"
  | "Digipack"
  | "ContentSubscription";
export type HolidayStopsApiProductNamePrefix = "Guardian Weekly";

export interface CancellationFlowProperties {
  reasons: CancellationReason[];
  sfProduct: SfProduct;
  linkOnProductPage?: true;
  startPageBody: JSX.Element;
  saveTitlePrefix?: string;
  summaryMainPara: (subscription: Subscription) => JSX.Element | string;
  summaryReasonSpecificPara: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  onlyShowSupportSectionIfAlternateText: boolean;
  alternateSupportButtonText: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  alternateSupportButtonUrlSuffix: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  swapFeedbackAndContactUs?: true;
}

export interface ProductPageProperties {
  title: ProductTitle;
  navLink: NavItem;
  noProductInTabCopy: string;
  tierRowLabel?: string; // no label means row is not displayed;
  tierChangeable?: true;
  showSubscriptionId?: true;
  forceShowJoinDateOnly?: true;
}

export interface ProductType {
  friendlyName: ProductFriendlyName;
  allProductsProductTypeFilterString: AllProductsProductTypeFilterString;
  urlPart: ProductUrlPart;
  legacyUrlPart?: string; // could easily adapt to be string[] if multiple were required in future
  getOphanProductType?: (
    productDetail: ProductDetail
  ) => OphanProduct | undefined;
  includeGuardianInTitles?: true;
  alternateTierValue?: string;
  alternateManagementUrl?: string;
  alternateManagementCtaLabel?: (
    productDetail: ProductDetail
  ) => string | undefined;
  noProductSupportUrlSuffix?: string;
  productPage?: ProductPageProperties | ProductUrlPart; // undefined 'productPage' means no product page
  cancellation?: CancellationFlowProperties; // undefined 'cancellation' means no cancellation flow
  showTrialRemainingIfApplicable?: true;
  mapGroupedToSpecific?: (productDetail: ProductDetail) => ProductType;
  updateAmountMdaEndpoint?: string;
  holidayStopsApiProductNamePrefix?: HolidayStopsApiProductNamePrefix;
}

export interface ProductTypeWithCancellationFlow extends ProductType {
  cancellation: CancellationFlowProperties;
}
export const hasCancellationFlow = (
  productType: ProductType
): productType is ProductTypeWithCancellationFlow =>
  productType.cancellation !== undefined;

export interface ProductTypeWithProductPageProperties extends ProductType {
  productPage: ProductPageProperties;
}
export const hasProductPageProperties = (
  productType: ProductType
): productType is ProductTypeWithProductPageProperties =>
  productType.productPage !== undefined &&
  typeof productType.productPage === "object";

export interface ProductTypeWithProductPageRedirect extends ProductType {
  productPage: ProductUrlPart;
}
export const hasProductPageRedirect = (
  productType: ProductType
): productType is ProductTypeWithProductPageRedirect =>
  productType.productPage !== undefined &&
  typeof productType.productPage === "string";

export interface WithProductType<ProductTypeVariant extends ProductType> {
  productType: ProductTypeVariant;
}

export const shouldCreatePaymentUpdateFlow = (productType: ProductType) =>
  !productType.mapGroupedToSpecific;

export const shouldHaveHolidayStopsFlow = (productType: ProductType) =>
  !!productType.holidayStopsApiProductNamePrefix;

export const createProductDetailFetcher = (
  productType: ProductType,
  subscriptionName?: string
) => async () =>
  await fetch(
    "/api/me/mma" +
      (subscriptionName
        ? `/${subscriptionName}`
        : `?productType=${productType.allProductsProductTypeFilterString}`),
    {
      credentials: "include",
      mode: "same-origin",
      headers: {
        [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
          window.location.href
        )
      }
    }
  );

const domainSpecificSubsManageURL = `https://subscribe.${
  typeof window !== "undefined" && window.guardian && window.guardian.domain
    ? window.guardian.domain
    : "theguardian.com"
}/manage`;

export const ProductTypes: { [productKey: string]: ProductType } = {
  membership: {
    friendlyName: "membership",
    allProductsProductTypeFilterString: "Membership",
    urlPart: "membership",
    getOphanProductType: (productDetail: ProductDetail) => {
      switch (productDetail.tier) {
        case "Supporter":
          return "MEMBERSHIP_SUPPORTER";
        case "Partner":
          return "MEMBERSHIP_PARTNER";
        case "Patron":
          return "MEMBERSHIP_PATRON";
      }
    },
    productPage: {
      title: "Membership",
      navLink: navLinks.membership,
      noProductInTabCopy:
        "To manage your existing contribution or subscription, please select from the tabs above.",
      tierRowLabel: "Membership tier",
      tierChangeable: true,
      forceShowJoinDateOnly: true
    },
    includeGuardianInTitles: true,
    cancellation: {
      reasons: membershipCancellationReasons,
      sfProduct: "Membership",
      startPageBody: membershipCancellationFlowStart,
      summaryMainPara: (subscription: Subscription) =>
        subscription.end ? (
          <>
            You will continue to receive the benefits of your membership until{" "}
            <b>{formatDate(subscription.end)}</b>. You will not be charged
            again.
          </>
        ) : (
          "Your cancellation is effective immediately."
        ),
      summaryReasonSpecificPara: () => undefined,
      onlyShowSupportSectionIfAlternateText: false,
      alternateSupportButtonText: () => undefined,
      alternateSupportButtonUrlSuffix: () => undefined
    }
  },
  contributions: {
    friendlyName: "recurring contribution",
    allProductsProductTypeFilterString: "Contribution",
    urlPart: "contributions",
    getOphanProductType: () => "RECURRING_CONTRIBUTION",
    noProductSupportUrlSuffix: "/contribute",
    updateAmountMdaEndpoint: "contribution-update-amount",
    productPage: {
      title: "Contributions",
      navLink: navLinks.contributions,
      noProductInTabCopy:
        "To manage your existing membership or subscription, please select from the tabs above."
    },
    cancellation: {
      linkOnProductPage: true,
      reasons: contributionsCancellationReasons,
      sfProduct: "Contribution",
      startPageBody: contributionsCancellationFlowStart,
      saveTitlePrefix: "Reason: ",
      summaryMainPara: () => "Thank you for your valuable support.",
      summaryReasonSpecificPara: (reasonId: OptionalCancellationReasonId) => {
        switch (reasonId) {
          case "mma_financial_circumstances":
          case "mma_value_for_money":
          case "mma_one_off":
            return "You can support The Guardian’s independent journalism with a single contribution, from as little as £1 – and it only takes a minute.";
          case "mma_wants_annual_contribution":
            return "You can support The Guardian’s independent journalism for the long term with an annual contribution.";
          case "mma_wants_monthly_contribution":
            return "You can support The Guardian’s independent journalism for the long term with a monthly contribution.";
          default:
            return undefined;
        }
      },
      onlyShowSupportSectionIfAlternateText: true,
      alternateSupportButtonText: (reasonId: OptionalCancellationReasonId) => {
        switch (reasonId) {
          case "mma_financial_circumstances":
          case "mma_value_for_money":
          case "mma_one_off":
            return "Make a single contribution";
          case "mma_wants_annual_contribution":
            return "Make an annual contribution";
          case "mma_wants_monthly_contribution":
            return "Make a monthly contribution";
          default:
            return undefined;
        }
      },
      alternateSupportButtonUrlSuffix: (
        reasonId: OptionalCancellationReasonId
      ) => "/contribute", // TODO tweak the support url to preselect single/monthly/annual once functionality is available
      swapFeedbackAndContactUs: true
    }
  },
  newspaper: {
    friendlyName: "newspaper subscription",
    allProductsProductTypeFilterString: "Paper",
    urlPart: "paper",
    getOphanProductType: () => "PRINT_SUBSCRIPTION",
    includeGuardianInTitles: true,
    alternateManagementUrl: domainSpecificSubsManageURL,
    alternateManagementCtaLabel: (productDetail: ProductDetail) =>
      productDetail.tier === "Newspaper Delivery"
        ? "manage your holiday stops"
        : undefined,
    productPage: "subscriptions"
  },
  guardianweekly: {
    friendlyName: "Guardian Weekly subscription",
    allProductsProductTypeFilterString: "Weekly",
    urlPart: "guardianweekly",
    getOphanProductType: () => "PRINT_SUBSCRIPTION", // TODO create a GUARDIAN_WEEKLY Product in Ophan data model
    alternateTierValue: "Guardian Weekly",
    alternateManagementUrl: domainSpecificSubsManageURL,
    alternateManagementCtaLabel: (productDetail: ProductDetail) =>
      productDetail.subscription.autoRenew
        ? undefined
        : "renew your one-off Guardian Weekly subscription",
    holidayStopsApiProductNamePrefix: "Guardian Weekly",
    productPage: "subscriptions"
  },
  digipack: {
    friendlyName: "digital subscription",
    allProductsProductTypeFilterString: "Digipack",
    urlPart: "digital",
    legacyUrlPart: "digitalpack",
    getOphanProductType: () => "DIGITAL_SUBSCRIPTION",
    showTrialRemainingIfApplicable: true,
    productPage: "subscriptions",
    alternateTierValue: "Digital Subscription"
  },
  contentSubscriptions: {
    friendlyName: "subscription",
    allProductsProductTypeFilterString: "ContentSubscription",
    urlPart: "subscriptions",
    productPage: {
      title: "Subscriptions",
      navLink: navLinks.subscriptions,
      noProductInTabCopy:
        "To manage your existing membership or contribution, please select from the tabs above.",
      tierRowLabel: "Subscription product",
      showSubscriptionId: true
    },
    mapGroupedToSpecific: (productDetail: ProductDetail) => {
      if (productDetail.tier === "Digital Pack") {
        return ProductTypes.digipack;
      } else if (productDetail.tier.startsWith("Newspaper")) {
        return ProductTypes.newspaper;
      } else if (productDetail.tier.startsWith("Guardian Weekly")) {
        return ProductTypes.guardianweekly;
      }
      return ProductTypes.contentSubscriptions; // This should never happen!
    }
  }
};
