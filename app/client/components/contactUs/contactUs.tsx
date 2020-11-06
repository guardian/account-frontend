import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import { captureException } from "@sentry/browser";
import React, { useEffect, useState } from "react";
import { contactUsConfig } from "../../../shared/contactUsConfig";
import { minWidth } from "../../styles/breakpoints";
import { trackEvent } from "../analytics";
import { ContactUsForm, FormPayload } from "./contactUsForm";
import { ContactUsHeader } from "./contactUsHeader";
import { ContactUsPageContainer } from "./contactUsPageContainer";
import { SelfServicePrompt } from "./selfServicePrompt";
import { SubTopicForm } from "./subTopicForm";
import { TopicForm } from "./topicForm";

interface ContactUsFormState {
  selectedTopic: string | undefined;
  selectedSubTopic: string | undefined;
  selectedSubSubTopic: string | undefined;
}

interface ContactUsProps extends RouteComponentProps {
  urlTopicId?: string;
  urlSubTopicId?: string;
  urlSubSubTopicId?: string;
}

type ContactUsFormStatus = "form" | "success";

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

  const [formStatus, setFormStatus] = useState<ContactUsFormStatus>("form");

  const [contactUsFormState, setContactUsFormState] = useState<
    ContactUsFormState
  >({
    selectedTopic: validDeepLinkTopic?.id,
    selectedSubTopic: validDeepLinkSubTopic?.id,
    selectedSubSubTopic: validDeepLinkSubSubTopic?.id
  });

  const setTopic = (selectedTopic: string) => {
    setContactUsFormState({
      selectedTopic,
      selectedSubTopic: undefined,
      selectedSubSubTopic: undefined
    });

    trackEvent({
      eventCategory: "ContactUs",
      eventAction: "topic_click",
      eventLabel: selectedTopic
    });
  };

  const setSubTopic = (selectedSubTopic: string) => {
    setContactUsFormState({
      ...contactUsFormState,
      selectedSubTopic,
      selectedSubSubTopic: undefined
    });

    trackEvent({
      eventCategory: "ContactUs",
      eventAction: "subtopic_click",
      eventLabel: selectedSubTopic
    });
  };

  const setSubSubTopic = (selectedSubSubTopic: string) => {
    setContactUsFormState({
      ...contactUsFormState,
      selectedSubSubTopic
    });

    trackEvent({
      eventCategory: "ContactUs",
      eventAction: "subsubtopic_click",
      eventLabel: selectedSubSubTopic
    });
  };

  const submitForm = async (formData: FormPayload): Promise<boolean> => {
    const body = JSON.stringify({
      ...(contactUsFormState.selectedTopic && {
        topic: contactUsFormState.selectedTopic
      }),
      ...(contactUsFormState.selectedSubTopic && {
        subtopic: contactUsFormState.selectedSubTopic
      }),
      ...(contactUsFormState.selectedSubSubTopic && {
        subsubtopic: contactUsFormState.selectedSubSubTopic
      }),
      name: formData.fullName,
      email: formData.email,
      subject: formData.subjectLine,
      message: formData.details,
      captchaToken: formData.captchaToken
    });

    const res = await fetch("/api/contact-us/", { method: "POST", body });
    if (res.ok) {
      setFormStatus("success");
      trackEvent({
        eventCategory: "ContactUs",
        eventAction: "submission_success",
        eventLabel:
          `${contactUsFormState.selectedTopic} - ` +
          `${contactUsFormState.selectedSubTopic} - ` +
          `${contactUsFormState.selectedSubSubTopic}`
      });
      return true;
    } else {
      const errorMsg = `Could not submit Contact Us form. ${res.status} - ${res.statusText}`;

      trackEvent({
        eventCategory: "ContactUs",
        eventAction: "submission_failure",
        eventLabel: errorMsg
      });
      captureException(errorMsg);
      return false;
    }
  };

  const headerText = (status: ContactUsFormStatus) => {
    switch (status) {
      case "form":
        return "We are here to help";
      case "success":
        return "Thank you for contacting us";
    }
  };

  const containerText = (status: ContactUsFormStatus) => {
    switch (status) {
      case "form":
        return "Visit our help centre to view our commonly asked questions, or continue below to use our contact form. It only takes a few minutes.";
      case "success":
        return `Thank you for contacting us regarding ${currentTopic?.enquiryLabel}. We will send a confirmation email detailing your request and aim to get back to you within 48 hours.`;
    }
  };

  const currentTopic = contactUsConfig.find(
    topic => topic.id === contactUsFormState.selectedTopic
  );

  const subTopics = currentTopic?.subtopics;

  const currentSubTopic = subTopics?.find(
    subTopic => subTopic.id === contactUsFormState.selectedSubTopic
  );

  const subSubTopics = currentSubTopic?.subsubtopics;

  const currentSubSubTopic = subSubTopics?.find(
    subSubTopic => subSubTopic.id === contactUsFormState.selectedSubSubTopic
  );

  const showSubTopics = !!contactUsFormState.selectedTopic && !!subTopics;

  const showSubSubTopics =
    !!contactUsFormState.selectedSubTopic && !!subSubTopics;

  const showForm =
    (!!contactUsFormState.selectedSubSubTopic && !currentSubSubTopic?.noForm) ||
    (!!contactUsFormState.selectedSubTopic &&
      !currentSubTopic?.noForm &&
      !subSubTopics) ||
    (!!contactUsFormState.selectedTopic && !currentTopic?.noForm && !subTopics);

  const selfServiceBox =
    currentSubSubTopic?.selfServiceBox ||
    currentSubTopic?.selfServiceBox ||
    currentTopic?.selfServiceBox;

  const noForm =
    currentSubSubTopic?.noForm ||
    currentSubTopic?.noForm ||
    currentTopic?.noForm;

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
      subTopic => subTopic.id === contactUsFormState.selectedSubTopic
    );
    const selectedSubSubtopic = selectedSubtopic?.subsubtopics?.find(
      subSubTopic => subSubTopic.id === contactUsFormState.selectedSubSubTopic
    );
    setShowSelfServicePrompt(
      (!showSubTopics && !!currentTopic?.selfServiceBox) ||
        (!selectedSubtopic?.subsubtopics &&
          !!selectedSubtopic?.selfServiceBox) ||
        !!selectedSubSubtopic?.selfServiceBox
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
  }, [contactUsFormState]);

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
            {headerText(formStatus)}
          </h1>
          <p
            css={css`
              margin-top: ${space[5]}px;
              ${textSans.medium()};
            `}
          >
            {containerText(formStatus)}
          </p>
          {formStatus === "form" && (
            <>
              <TopicForm
                data={contactUsConfig}
                preSelectedId={contactUsFormState.selectedTopic}
                submitCallback={setTopic}
              />
              {showSubTopics && subTopics && (
                <SubTopicForm
                  key={`subtopic-${contactUsFormState.selectedTopic}`}
                  title={subTopicsTitle}
                  submitButonText="Continue to step 2"
                  data={subTopics}
                  preSelectedId={contactUsFormState.selectedSubTopic}
                  submitCallback={setSubTopic}
                />
              )}
              {showSubSubTopics && subSubTopics && (
                <SubTopicForm
                  key={`subsubtopic-${contactUsFormState.selectedSubTopic}`}
                  title={subSubTopicsTitle}
                  submitButonText="Continue to step 3"
                  data={subSubTopics}
                  preSelectedId={contactUsFormState.selectedSubSubTopic}
                  submitCallback={setSubSubTopic}
                />
              )}
              {showSelfServicePrompt && selfServiceBox && (
                <SelfServicePrompt
                  copy={selfServiceBox.text}
                  linkCopy={selfServiceBox.linkText}
                  linkHref={selfServiceBox.href}
                  linkAsButton={noForm}
                  showContacts={noForm}
                  topicReferer={
                    `${contactUsFormState.selectedTopic} - ` +
                    `${contactUsFormState.selectedSubTopic} - ` +
                    `${contactUsFormState.selectedSubSubTopic}`
                  }
                  additionalCss={css`
                    margin: ${space[9]}px 0 ${space[6]}px;
                  `}
                />
              )}

              {showForm && (
                <ContactUsForm
                  key={formSubjectLine}
                  submitCallback={submitForm}
                  title={`${
                    showSubTopics || showSubSubTopics
                      ? `Step ${showSubSubTopics ? "3" : "2"}: `
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
