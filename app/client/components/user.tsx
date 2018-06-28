import { Location, Router, ServerLocation } from "@reach/router";
import React, { ReactNode } from "react";
import { injectGlobal } from "../styles/emotion";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { ContributionsFlow } from "./cancel/contributionsFlow";
import { FreeMembershipFlow } from "./cancel/freeMembershipFlow";
import { NotFound } from "./cancel/notFound";
import {
  membershipCancellationReasonMatrix,
  PaidMembershipFlow
} from "./cancel/paidMembershipFlow";
import { CardProps } from "./card";
import { Main } from "./main";
import {
  loadMembershipData,
  MembersDataApiResponse,
  Membership
} from "./membership";
import { GenericSaveAttempt } from "./cancel/stages/genericSaveAttempt";
import { ExecuteCancellation } from "./cancel/stages/executeCancellation";

export const CALL_CENTRE_NUMBER = "XXXXXXXXXXXXXX";

export interface Subscription {
  subscriberId: string;
  start: string;
  end: string;
  cancelledAt: boolean;
  nextPaymentDate: string;
  card?: CardProps;
  plan: {
    amount: number;
    currency: string;
  };
}

export interface WithSubscription {
  subscription: Subscription;
}

export interface CancellationReason {
  reasonId: string;
  linkLabel: string;
  saveTitle: string;
  saveBody: string | ReactNode;
  alternateCallUsPrefix?: string;
  alternateFeedbackIntro?: string;
  skipFeedback?: boolean;
}

export const CancellationReasonContext: React.Context<
  string
> = React.createContext("");

export const CancellationCaseIdContext: React.Context<
  string
> = React.createContext("");

export const MembersDataApiResponseContext: React.Context<
  MembersDataApiResponse
> = React.createContext({});

export const formatDate = (shortForm: string) => {
  return new Date(shortForm).toDateString();
};

const User = () => (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}

    <Router>
      <Membership path="/" />

      <PaidMembershipFlow path="/cancel/membership">
        {membershipCancellationReasonMatrix.map(
          (reason: CancellationReason) => (
            <GenericSaveAttempt
              sfProduct="Membership"
              reason={reason}
              key={reason.reasonId}
              path={reason.reasonId}
              linkLabel={reason.linkLabel}
            >
              <ExecuteCancellation
                path="confirmed"
                cancelApiUrlSuffix="membership"
                cancelType="membership"
                withSubscriptionPromiseFetcher={loadMembershipData}
              />
            </GenericSaveAttempt>
          )
        )}
      </PaidMembershipFlow>

      <FreeMembershipFlow path="/cancel/friend" />

      <ContributionsFlow path="/cancel/contributions" />

      <NotFound default={true} />
    </Router>
  </Main>
);

export const ServerUser = (url: string) => (
  <>
    <User />
    <ServerLocation url={url} />
  </>
);

export const BrowserUser = (trackPath: (path: string) => void) => {
  return (
    <>
      <User />
      <Location>
        {({ location }) => {
          trackPath(location.pathname);
          return null; // null is a valid React node type, but void is not.
        }}
      </Location>
    </>
  );
};
