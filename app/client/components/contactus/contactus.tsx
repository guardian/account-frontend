import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import { contactUsConfig } from "../../../server/contactUsConfig";
import { minWidth } from "../../styles/breakpoints";
import { trackEvent } from "../analytics";
import { ContactUsForm } from "./contactUsForm";
import { ContactUsHeader } from "./contactUsHeader";
import { ContactUsPageContainer } from "./contactUsPageContainer";
import { SelfServicePrompt } from "./selfServicePrompt";
import { SubTopicForm } from "./subTopicForm";
import { TopicButton } from "./topicButton";

interface ContactUsFormStateSnapshot {
  selectedTopic: string | undefined;
  selectedSubTopic: string | undefined;
  selectedSubSubTopic: string | undefined;
}

interface ContactUsProps extends RouteComponentProps {
  urlTopicId?: string;
  urlSubTopicId?: string;
  urlSubSubTopicId?: string;
}

export const ContactUs = (props: ContactUsProps) => {
  const validDeepLinkTopic = contactUsConfig.find(
    topic => topic.id === props.urlTopicId
  );

  const validDeepLinkSubTopic = validDeepLinkTopic?.subtopics?.find(
    subTopic => subTopic.id === props.urlSubTopicId
  );

  const validDeepLinkSubSubTopic = validDeepLinkSubTopic?.subsubtopics?.find(
    subSubTopic => subSubTopic.id === props.urlSubSubTopicId
  );

  const initialTopicSelection: string =
    validDeepLinkTopic?.id || contactUsConfig[0].id;

  const [formSubmittedSuccessfully, setFormSubmitionStatus] = useState<boolean>(
    false
  );

  const [contactUsFormStateSnapshot, setContactUsFormStateSnapshot] = useState<
    ContactUsFormStateSnapshot
  >({
    selectedTopic: initialTopicSelection,
    selectedSubTopic: validDeepLinkSubTopic?.id,
    selectedSubSubTopic: validDeepLinkSubSubTopic?.id
  });

  const [requireTopicSubmitButton, setRequireTopicSubmitButton] = useState<
    boolean
  >(!validDeepLinkTopic);

  const [
    requireSubTopicSubmitButton,
    setRequireSubTopicSubmitButton
  ] = useState<boolean>(!validDeepLinkSubTopic);

  const [
    requireSubSubTopicSubmitButton,
    setRequireSubSubTopicSubmitButton
  ] = useState<boolean>(!validDeepLinkSubSubTopic);

  const setTopic = (newTopicId: string, hasComeFromSubmitButton: boolean) => {
    setContactUsFormStateSnapshot({
      selectedTopic:
        hasComeFromSubmitButton || !requireTopicSubmitButton
          ? newTopicId
          : contactUsFormStateSnapshot.selectedTopic,
      selectedSubTopic: contactUsConfig.find(topic => topic.id === newTopicId)
        ?.subtopics?.[0].id,
      selectedSubSubTopic: undefined
    });
    setRequireSubTopicSubmitButton(true);
    setRequireSubSubTopicSubmitButton(true);
  };

  const setSubTopic = (selectedSubTopic: string) => {
    setContactUsFormStateSnapshot({
      ...contactUsFormStateSnapshot,
      selectedSubTopic,
      selectedSubSubTopic: undefined
    });
    setRequireSubSubTopicSubmitButton(true);
  };

  const setSubSubTopic = (selectedSubSubTopic: string) =>
    setContactUsFormStateSnapshot({
      ...contactUsFormStateSnapshot,
      selectedSubSubTopic
    });

  const [transientTopicSelection, setTransientTopicSelection] = useState<
    string
  >(initialTopicSelection);

  const topicSelectionCallback = (newTopicId: string) => {
    setTransientTopicSelection(newTopicId);
    setTopic(newTopicId, requireTopicSubmitButton);
    trackEvent({
      eventCategory: "contact_us_topic",
      eventAction: "click",
      eventLabel: newTopicId
    });
  };

  const subTopicSelectionCallback = (newSubTopicId: string) => {
    setSubTopic(newSubTopicId);

    trackEvent({
      eventCategory: "contact_us_subtopic",
      eventAction: "click",
      eventLabel: newSubTopicId
    });
  };

  const subTopicSubmitCallback = () => {
    if (!!contactUsFormStateSnapshot.selectedSubTopic) {
      setRequireSubTopicSubmitButton(false);
    }
  };

  const subSubTopicSelectionCallback = (newSubSubTopicId: string) => {
    setSubSubTopic(newSubSubTopicId);

    trackEvent({
      eventCategory: "contact_us_subsubtopic",
      eventAction: "click",
      eventLabel: newSubSubTopicId
    });
  };

  const subSubTopicSubmitCallback = () => {
    if (!!contactUsFormStateSnapshot.selectedSubSubTopic) {
      setRequireSubSubTopicSubmitButton(false);
    }
  };

  const currentTopic = contactUsConfig.find(
    topic => topic.id === contactUsFormStateSnapshot.selectedTopic
  );

  const subTopics = currentTopic?.subtopics;

  const subSubTopics = subTopics?.find(
    subTopic => subTopic.id === contactUsFormStateSnapshot.selectedSubTopic
  )?.subsubtopics;

  const showSubTopics =
    !!contactUsFormStateSnapshot.selectedTopic &&
    !requireTopicSubmitButton &&
    !!subTopics;

  const showSubSubTopics =
    !!contactUsFormStateSnapshot.selectedSubTopic &&
    !requireSubTopicSubmitButton &&
    !!subSubTopics;

  const showForm =
    (!!contactUsFormStateSnapshot.selectedSubSubTopic &&
      !requireSubSubTopicSubmitButton) ||
    (!!contactUsFormStateSnapshot.selectedSubTopic &&
      !requireSubTopicSubmitButton &&
      !subSubTopics) ||
    (!!contactUsFormStateSnapshot.selectedTopic &&
      !requireTopicSubmitButton &&
      !subTopics);

  const [showSelfServicePrompt, setShowSelfServicePrompt] = useState<boolean>(
    false
  );

  const [subTopicsTitle, setSubTopicsTitle] = useState<string>("");
  const [subSubTopicsTitle, setSubSubTopicsTitle] = useState<string>("");

  const [formSubjectLine, setFormSubjectLine] = useState<string>("");

  const [formHasEditableSubjectLine, setFormHasEditableSubjectLine] = useState<
    boolean
  >(false);

  useEffect(() => {
    const selectedSubtopic = currentTopic?.subtopics?.find(
      subTopic => subTopic.id === contactUsFormStateSnapshot.selectedSubTopic
    );
    const selectedSubSubtopic = selectedSubtopic?.subsubtopics?.find(
      subSubTopic =>
        subSubTopic.id === contactUsFormStateSnapshot.selectedSubSubTopic
    );
    setShowSelfServicePrompt(
      (!showSubTopics &&
        !!currentTopic?.selfServiceBox &&
        !requireTopicSubmitButton) ||
        (!selectedSubtopic?.subsubtopics &&
          !!selectedSubtopic?.selfServiceBox &&
          !requireSubTopicSubmitButton) ||
        (!!selectedSubSubtopic?.selfServiceBox &&
          !requireSubSubTopicSubmitButton)
    );
    setFormSubjectLine(
      `${currentTopic ? currentTopic.name : ""}${
        selectedSubSubtopic ? ` - ${selectedSubSubtopic.name}` : ""
      }${
        !selectedSubSubtopic && selectedSubtopic
          ? ` - ${selectedSubtopic.name}`
          : ""
      }`
    );
    setFormHasEditableSubjectLine(
      !!selectedSubSubtopic?.editableSubjectLine ||
        !!selectedSubtopic?.editableSubjectLine ||
        !!currentTopic?.editableSubjectLine
    );
    if (selectedSubtopic?.subsubTopicsTitle) {
      setSubSubTopicsTitle(selectedSubtopic?.subsubTopicsTitle);
    }
    if (currentTopic?.subTopicsTitle) {
      setSubTopicsTitle(currentTopic.subTopicsTitle);
    }
  }, [
    contactUsFormStateSnapshot,
    requireTopicSubmitButton,
    requireSubTopicSubmitButton,
    requireSubSubTopicSubmitButton
  ]);

  return (
    <>
      <ContactUsHeader />
      <ContactUsPageContainer>
        <div
          css={css`
            margin-bottom: ${space[24]}px;
          `}
        >
          <h1
            css={css`
              ${headline.xxsmall({ fontWeight: "bold" })};
              margin: 0;
              border-top: 1px solid ${palette.neutral[86]};
              ${minWidth.desktop} {
                font-size: 1.75rem;
                border-top: 0;
              }
            `}
          >
            {formSubmittedSuccessfully
              ? "Thank you for contacting us"
              : "We are here to help"}
          </h1>
          <p
            css={css`
              margin-top: ${space[5]}px;
              ${textSans.medium()};
            `}
          >
            {formSubmittedSuccessfully
              ? `Thank you for contacting us regarding ${currentTopic?.enquiryLabel}. We will send a confirmation email detailing your request and aim to get back to you within 48 hours.`
              : "Visit our help centre to view our commonly asked questions, or continue below to use our contact form. It only takes a few minutes."}
          </p>
          {!formSubmittedSuccessfully && (
            <>
              <h2
                css={css`
                  ${headline.xxsmall({ fontWeight: "bold" })};
                  border-top: 1px solid ${palette.neutral[86]};
                  margin-top: ${space[6]}px;
                  padding: ${space[1]}px 0;
                  ${minWidth.desktop} {
                    margin-top: ${space[9]}px;
                  }
                `}
              >
                Choose a topic you would like to discuss
              </h2>
              <div
                css={css`
                  display: flex;
                  flex-wrap: wrap;
                  align-items: stretch;
                  justify-content: space-between;
                `}
              >
                {contactUsConfig.map((topic, topicIndex) => (
                  <TopicButton
                    {...topic}
                    id={topic.id}
                    updateCallback={topicSelectionCallback}
                    isSelected={
                      topic.id === contactUsFormStateSnapshot.selectedTopic
                    }
                    key={topicIndex}
                  />
                ))}
              </div>
              {requireTopicSubmitButton && (
                <Button
                  css={css`
                    margin-top: ${space[6]}px;
                  `}
                  onClick={() => {
                    setTopic(transientTopicSelection, true);
                    setRequireTopicSubmitButton(false);
                  }}
                >
                  Begin form
                </Button>
              )}
              {showSubTopics && (
                <SubTopicForm
                  updateCallback={subTopicSelectionCallback}
                  submitCallback={subTopicSubmitCallback}
                  title={subTopicsTitle}
                  submitButonText="Continue to step 2"
                  showSubmitButton={requireSubTopicSubmitButton}
                  data={subTopics}
                  preSelectedId={contactUsFormStateSnapshot.selectedSubTopic}
                  additionalCss={css`
                    margin-top: ${space[9]}px;
                  `}
                />
              )}
              {showSubSubTopics && (
                <SubTopicForm
                  updateCallback={subSubTopicSelectionCallback}
                  submitCallback={subSubTopicSubmitCallback}
                  title={subSubTopicsTitle}
                  submitButonText="Continue to step 3"
                  showSubmitButton={requireSubSubTopicSubmitButton}
                  data={subSubTopics}
                  preSelectedId={contactUsFormStateSnapshot.selectedSubSubTopic}
                  additionalCss={css`
                    margin-top: ${space[9]}px;
                  `}
                />
              )}
              {showSelfServicePrompt && (
                <SelfServicePrompt
                  copy={
                    "Did you know you can suspend your deliveries online by logging in below and selecting ‘Manage Subscription’? It’s easy to use and means you don’t have to wait for a response."
                  }
                  linkCopy="Go to your account"
                  linkHref="/"
                  topicReferer={`${contactUsFormStateSnapshot.selectedTopic ||
                    contactUsFormStateSnapshot.selectedSubTopic ||
                    contactUsFormStateSnapshot.selectedSubSubTopic}`}
                  additionalCss={css`
                    margin: ${space[9]}px 0 ${space[6]}px;
                  `}
                />
              )}

              {showForm && (
                <ContactUsForm
                  key={formSubjectLine}
                  submitCallback={() => {
                    setFormSubmitionStatus(true);
                    trackEvent({
                      eventCategory: "contactus_form",
                      eventAction: "submission",
                      eventLabel: `${contactUsFormStateSnapshot.selectedTopic ||
                        contactUsFormStateSnapshot.selectedSubTopic ||
                        contactUsFormStateSnapshot.selectedSubSubTopic}`
                    });
                  }}
                  title={`${
                    showSubTopics || showSubSubTopics
                      ? `Step ${showSubTopics ? "3" : "2"}: `
                      : ""
                  }Tell us more`}
                  subjectLine={formSubjectLine}
                  editableSubjectLine={formHasEditableSubjectLine}
                />
              )}
            </>
          )}
        </div>
      </ContactUsPageContainer>
    </>
  );
};
