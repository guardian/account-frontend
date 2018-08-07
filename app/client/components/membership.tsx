import { css } from "emotion";
import React from "react";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { serif } from "../styles/fonts";
import AsyncLoader from "./asyncLoader";
import { LinkButton } from "./buttons";
import { CardDisplay } from "./card";
import { PageContainer, PageHeaderContainer } from "./page";
import { formatDate, WithSubscription } from "./user";
import { RouteableProps } from "./wizardRouterAdapter";

export interface MembershipData extends WithSubscription {
  regNumber?: string;
  tier: string;
  isPaidTier: boolean;
  joinDate: string;
}

export type MembersDataApiResponse = MembershipData | {};

export function hasMembership(
  data: MembersDataApiResponse
): data is MembershipData {
  return data.hasOwnProperty("tier");
}

export class MembershipAsyncLoader extends AsyncLoader<
  MembersDataApiResponse
> {}

export const loadMembershipData: () => Promise<Response> = async () =>
  await fetch("/api/me/membership", { credentials: "include" });

interface MembershipRowProps {
  label: string;
  data: string | React.ReactNode;
}

const membershipRowStyles = css({
  textAlign: "left",
  marginBottom: "15px",
  verticalAlign: "top",

  [minWidth.phablet]: {
    display: "flex"
  }
});

const MembershipRow = (props: MembershipRowProps) => {
  return (
    <div className={membershipRowStyles}>
      <div
        css={{
          flexBasis: "320px"
        }}
      >
        <p
          css={{
            fontSize: "18px",
            margin: "0 0 5px 0",
            fontWeight: "bold"
          }}
        >
          {props.label}
        </p>
      </div>
      <div>{props.data}</div>
    </div>
  );
};

const renderMembershipData = (data: MembersDataApiResponse) => {
  if (hasMembership(data)) {
    let paymentPart;
    if (data.subscription.cancelledAt) {
      paymentPart = (
        <React.Fragment>
          <MembershipRow label={"Membership Status"} data={"Cancelled"} />
          <MembershipRow
            label={"Effective end date"}
            data={formatDate(data.subscription.end)}
          />
        </React.Fragment>
      );
    } else if (data.isPaidTier && data.subscription.card) {
      paymentPart = (
        <React.Fragment>
          <MembershipRow
            label={"Next payment date"}
            data={formatDate(data.subscription.nextPaymentDate)}
          />
          <MembershipRow
            label={"Annual payment"}
            data={
              data.subscription.plan.currency +
              (data.subscription.plan.amount / 100.0).toFixed(2)
            }
          />
          <MembershipRow
            label={"Card details"}
            data={
              <CardDisplay
                last4={data.subscription.card.last4}
                type={data.subscription.card.type}
              />
            }
          />
        </React.Fragment>
      );
    } else {
      paymentPart = <MembershipRow label={"Annual payment"} data={"FREE"} />;
    }

    return (
      <div>
        {data.regNumber ? (
          <MembershipRow label={"Membership number"} data={data.regNumber} />
        ) : (
          undefined
        )}
        <MembershipRow
          label={"Membership tier"}
          data={
            <React.Fragment>
              <span css={{ marginRight: "15px" }}>{data.tier}</span>
              {data.subscription.cancelledAt ? (
                undefined
              ) : (
                <LinkButton
                  to="/cancel/membership"
                  text="Cancel Membership"
                  textColor={palette.white}
                  color={palette.neutral["1"]}
                />
              )}
            </React.Fragment>
          }
        />
        <MembershipRow
          label={"Start date"}
          data={formatDate(data.subscription.start || data.joinDate)}
        />
        {paymentPart}
      </div>
    );
  }
  return <h2>No Membership</h2>;
};

const headerCss = css({
  fontSize: "2rem",
  lineHeight: "2.25rem",
  fontFamily: serif,
  marginBottom: "30px"
});

export const Membership = (props: RouteableProps) => (
  <>
    <PageHeaderContainer>
      <h1 className={headerCss}>Membership</h1>
    </PageHeaderContainer>
    <PageContainer>
      <MembershipAsyncLoader
        fetch={loadMembershipData}
        render={renderMembershipData}
        loadingMessage="Loading your membership details..."
      />
    </PageContainer>
  </>
);
