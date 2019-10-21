import { Form, FormikProps, withFormik } from "formik";
import Raven from "raven-js";
import React from "react";
import * as Yup from "yup";
import { trackEvent } from "../../analytics";
import { Button } from "../../buttons";
import { PageContainer } from "../../page";
import { FormTextAreaField, FormTextField } from "../Form/FormField";
import { ErrorTypes, User } from "../models";
import { PageSection } from "../PageSection";
import { textSmall } from "../sharedStyles";

interface ProfileFormSectionProps {
  user: User;
  saveUser: (values: User) => Promise<User>;
  onError: (error: any) => void;
  onSuccess: (user: User) => void;
}

const hasUsername = (user: User) => !!user.username;

const formValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Must be 6 characters minimum")
    .max(20, "Must be 20 characters or less"),
  location: Yup.string().max(255, "Maximum length is 255"),
  aboutMe: Yup.string().max(1500, "Maximum length is 1500"),
  interests: Yup.string().max(255, "Maximum length is 255")
});

const usernameInput = (formikProps: FormikProps<User>) => (
  <>
    <FormTextField name="username" label="Username" formikProps={formikProps} />
    <p css={textSmall}>
      You can only set your username once. It must be 6-20 characters, letters
      and/or numbers only and have no spaces. If you do not set your username,
      then your full name will be used.
    </p>
  </>
);

const fieldSetCss = {
  border: "0",
  margin: "0",
  padding: "0"
};

const ProfileForm = (props: FormikProps<User> & ProfileFormSectionProps) => (
  <Form>
    <fieldset css={fieldSetCss} disabled={props.isSubmitting}>
      {!hasUsername(props.user) ? usernameInput(props) : null}
      <FormTextField name="location" label="Label" formikProps={props} />
      <FormTextAreaField name="aboutMe" label="About Me" formikProps={props} />
      <FormTextAreaField
        name="interests"
        label="Interests"
        formikProps={props}
      />
      <Button
        disabled={props.isSubmitting}
        text="Save changes"
        type="button"
        onClick={() => props.submitForm()}
      />
    </fieldset>
  </Form>
);

const EnhancedProfileForm = withFormik({
  mapPropsToValues: (props: ProfileFormSectionProps) => props.user,
  handleSubmit: async (values, formikBag) => {
    const { setSubmitting, setStatus } = formikBag;
    const { saveUser, onSuccess, onError } = formikBag.props;
    setStatus(undefined);
    try {
      await saveUser(values);
      onSuccess(values);
    } catch (e) {
      if (e.type && e.type === ErrorTypes.VALIDATION) {
        setStatus(e.error);
      } else {
        onError(e);
        Raven.captureException(e);
        trackEvent({
          eventCategory: "publicProfileError",
          eventAction: "error",
          eventLabel: e.toString()
        });
      }
    }
    setSubmitting(false);
  },
  validationSchema: formValidationSchema
})(ProfileForm);

export const ProfileFormSection = (props: ProfileFormSectionProps) => {
  return (
    <PageContainer>
      <PageSection title="Profile">
        <EnhancedProfileForm {...props} />
      </PageSection>
    </PageContainer>
  );
};
