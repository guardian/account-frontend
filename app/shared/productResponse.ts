import React from "react";
import AsyncLoader from "../client/components/asyncLoader";
import { CardProps } from "../client/components/payment/cardDisplay";

export type MembersDataApiResponse = ProductDetail | {};

export class MembersDatApiAsyncLoader extends AsyncLoader<
  MembersDataApiResponse[]
> {}

export const MembersDataApiResponseContext: React.Context<
  MembersDataApiResponse
> = React.createContext({});

export const formatDate = (shortForm: string) => {
  return new Date(shortForm).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

export const MDA_TEST_USER_HEADER = "X-Gu-Membership-Test-User";

export const annotateMdaResponseWithTestUserFromHeaders = async (
  response: Response
) =>
  ((await response.json()) as MembersDataApiResponse[]).map(data =>
    Object.assign(data, {
      isTestUser: response.headers.get(MDA_TEST_USER_HEADER) === "true"
    })
  );

export interface ProductDetail extends WithSubscription {
  isTestUser: boolean; // THIS IS NOT PART OF THE RESPONSE (but inferred from a header)
  regNumber?: string;
  tier: string;
  isPaidTier: boolean;
  joinDate: string;
  alertText?: string;
}

export function hasProduct(
  data: MembersDataApiResponse | undefined
): data is ProductDetail {
  return !!data && data.hasOwnProperty("tier");
}

export interface Card extends CardProps {
  stripePublicKeyForUpdate: string;
  email?: string;
}

export interface DirectDebitDetails {
  accountName: string;
  accountNumber: string;
  sortCode: string;
}

export interface SubscriptionPlan {
  currency: string;
  currencyISO: string;
  interval: string;
}

export interface Subscription {
  subscriberId: string;
  start: string;
  end: string;
  cancelledAt: boolean;
  nextPaymentDate: string;
  nextPaymentPrice: number;
  paymentMethod?: string;
  card?: Card;
  payPalEmail?: string;
  mandate?: DirectDebitDetails;
  plan: SubscriptionPlan;
}

export interface WithSubscription {
  subscription: Subscription;
}
