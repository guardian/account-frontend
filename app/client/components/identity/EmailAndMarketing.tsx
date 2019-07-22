import React, { useEffect, useState } from "react";
import palette from "../../colours";
import { headline } from "../../styles/fonts";
import { MembershipLinks } from "../membershipLinks";
import { navLinks } from "../nav";
import { PageContainer, PageHeaderContainer } from "../page";
import { Spinner } from "../spinner";
import { ConsentSection } from "./ConsentSection";
import { EmailSettingsSection } from "./EmailSettingsSection";
import { Lines } from "./Lines";
import { MarginWrapper } from "./MarginWrapper";
import { NewsletterSection } from "./NewsletterSection";
import { OptOutSection } from "./OptOutSection";
import { Actions, useConsentOptions } from "./useConsentOptions";

import {
  ConsentOptionCollection,
  Consents,
  filterConsents,
  filterNewsletters,
  memoReadEmail,
  Newsletters,
  updateRemoveAllConsents
} from "./identity";

export const EmailAndMarketing = (props: { path?: string }) => {
  const { options, error, subscribe, unsubscribe, unsubscribeAll } = Actions;
  const [email, setEmail] = useState();
  const [removed, setRemoved] = useState(false);
  const [state, dispatch] = useConsentOptions();

  const toggleSubscription = (collection: ConsentOptionCollection) => async (
    id: string
  ) => {
    const subscribed = state.options.find((o: any) => id === o.id).subscribed;
    try {
      if (subscribed) {
        await collection.unsubscribe(id);
        dispatch(unsubscribe(id));
      } else {
        await collection.subscribe(id);
        dispatch(subscribe(id));
      }
    } catch (e) {
      // @TODO: LOGGER
      dispatch(error());
    }
  };

  const setRemoveAllEmailConsents = async () => {
    try {
      await updateRemoveAllConsents();
      setRemoved(true);
      dispatch(unsubscribeAll());
    } catch (e) {
      // @TODO: LOGGER
      dispatch(error());
    }
  };

  const toggleNewsletterSubscription = toggleSubscription(Newsletters);
  const toggleConsentSubscription = toggleSubscription(Consents);

  const newsletters = filterNewsletters(state.options);
  const consents = filterConsents(state.options);
  const loading = newsletters.length === 0 && consents.length === 0;

  useEffect(() => {
    try {
      Newsletters.getAll().then(n => dispatch(options(n)));
      Consents.getAll().then(c => dispatch(options(c)));
      memoReadEmail().then(primaryEmailAddress => {
        setEmail(primaryEmailAddress);
      });
    } catch (e) {
      // @TODO: Logger
      dispatch(error());
    }
  }, []);

  const errorMessage = (
    <PageContainer>
      <div
        css={{
          fontSize: "0.8125rem",
          lineHeight: "1.125rem",
          backgroundColor: "#ffe1e1",
          borderBottom: `0.0625rem solid ${palette.red.light}`,
          borderTop: `0.0625rem solid ${palette.red.light}`,
          color: palette.red.medium,
          marginTop: "0.375rem",
          padding: "0.4375rem 0.5rem"
        }}
      >
        Sorry, something went wrong!
      </div>
    </PageContainer>
  );

  const content = (
    <>
      {state.error ? errorMessage : null}
      <PageContainer>
        <NewsletterSection
          newsletters={newsletters}
          clickHandler={toggleNewsletterSubscription}
        />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <Lines n={4} />
        </MarginWrapper>
      </PageContainer>
      <PageContainer>
        <ConsentSection
          consents={consents}
          clickHandler={toggleConsentSubscription}
        />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <Lines n={1} />
        </MarginWrapper>
      </PageContainer>
      <PageContainer>
        <EmailSettingsSection
          email={email}
          actionHandler={setRemoveAllEmailConsents}
          removed={removed}
        />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <Lines n={4} />
        </MarginWrapper>
      </PageContainer>
      <PageContainer>
        <OptOutSection
          consents={consents}
          clickHandler={toggleConsentSubscription}
        />
      </PageContainer>
      <PageContainer>
        <MarginWrapper>
          <MembershipLinks />
        </MarginWrapper>
      </PageContainer>
    </>
  );

  const loader = (
    <PageContainer>
      <Spinner loadingMessage="Loading your subscripton information..." />
    </PageContainer>
  );
  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.emailPrefs}>
        <h1
          css={{
            fontSize: "2rem",
            lineHeight: "2.25rem",
            fontFamily: headline,
            marginBottom: "30px",
            marginTop: "0"
          }}
        >
          Edit your profile
        </h1>
      </PageHeaderContainer>
      {loading ? loader : content}
    </>
  );
};
