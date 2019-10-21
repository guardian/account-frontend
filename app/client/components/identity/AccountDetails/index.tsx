import { Form, FormikProps, withFormik } from "formik";
import Raven from "raven-js";
import React, { useEffect, useState } from "react";
import palette from "../../../colours";
import { headline } from "../../../styles/fonts";
import { trackEvent } from "../../analytics";
import { Button } from "../../buttons";
import { MembershipLinks } from "../../membershipLinks";
import { navLinks } from "../../nav";
import { PageContainer, PageHeaderContainer } from "../../page";
import { Spinner } from "../../spinner";
import {
  FormEmailField,
  FormNumberField,
  FormSelectField,
  FormTextField
} from "../Form/FormField";
import {
  GenericErrorMessage,
  GenericErrorMessageRef
} from "../GenericErrorMessage";
import * as PhoneNumber from "../idapi/phonenumber";
import { Users } from "../identity";
import { IdentityLocations } from "../IdentityLocations";
import { Lines } from "../Lines";
import { MarginWrapper } from "../MarginWrapper";
import { Titles, User } from "../models";
import { COUNTRIES, ErrorTypes, PHONE_CALLING_CODES } from "../models";
import { PageSection } from "../PageSection";
import { aCss, textSmall } from "../sharedStyles";

interface AccountFormProps {
  user: User;
  saveUser: (values: User) => Promise<User>;
  onError: (error: any) => void;
  onSuccess: (input: User, response: User) => void;
  emailMessage: string | null;
}

const titles = Object.values(Titles);

const deletePhoneNumber = async () => {
  await PhoneNumber.remove();
  return await Users.getCurrentUser();
};

const errorRef = React.createRef<GenericErrorMessageRef>();
const pageTopRef = React.createRef<HTMLDivElement>();

const lines = () => <Lines n={1} margin={"32px auto 16px"} />;

const EmailMessage = (email: string) => (
  <p
    css={{
      ...textSmall,
      padding: "6px 14px",
      backgroundColor: palette.neutral[7]
    }}
  >
    To verify your new email address <strong>{email}</strong> please check your
    inbox - the confimation email is on its way. In the meantime you should keep
    using your old credentials to sign in.
  </p>
);

const BaseForm = (props: FormikProps<User> & AccountFormProps) => {
  const correpondenceDescription = (
    <span>
      If you wish to change the delivery address for your paper subscription
      vouchers, home delivery, or Guardian Weekly please see{" "}
      <a css={aCss} href={IdentityLocations.CONTACT_AND_DELIVERY_HELP}>
        Help with updating your contact or delivery details.
      </a>
    </span>
  );
  const deletePhoneNumberButton = (
    <Button
      text="Delete Phone Number"
      type="button"
      onClick={async () => {
        const response = await deletePhoneNumber();
        props.resetForm(response);
      }}
    />
  );
  return (
    <Form>
      {lines()}
      <PageSection title="Email & Password">
        <FormEmailField
          name="primaryEmailAddress"
          label="Email"
          formikProps={props}
        />
        {!props.emailMessage || EmailMessage(props.emailMessage)}
        <label>
          Password
          <p>
            <a css={aCss} href={IdentityLocations.CHANGE_PASSWORD}>
              Change your password
            </a>
          </p>
        </label>
      </PageSection>
      {lines()}
      <PageSection title="Phone">
        <FormSelectField
          name="countryCode"
          label="Country code"
          options={PHONE_CALLING_CODES}
          formikProps={props}
          labelModifier={(o: string) => `+${o}`}
        />
        <FormNumberField
          name="localNumber"
          label="Local Number"
          formikProps={props}
        />
        {deletePhoneNumberButton}
      </PageSection>
      {lines()}
      <PageSection title="Personal Information">
        <FormSelectField
          name="title"
          label="Title"
          options={titles}
          formikProps={props}
        />
        <FormTextField
          name="firstName"
          label="First Name"
          formikProps={props}
        />
        <FormTextField
          name="secondName"
          label="Last Name"
          formikProps={props}
        />
      </PageSection>
      {lines()}
      <PageSection
        title="Correspondence address"
        description={correpondenceDescription}
      >
        <FormTextField
          name="address1"
          label="Address line 1"
          formikProps={props}
        />
        <FormTextField
          name="address2"
          label="Address line 2"
          formikProps={props}
        />
        <FormTextField name="address3" label="Town" formikProps={props} />
        <FormTextField
          name="address4"
          label="County or State"
          formikProps={props}
        />
        <FormTextField
          name="postcode"
          label="Postcode/Zipcode"
          formikProps={props}
        />
        <FormSelectField
          name="country"
          label="Country"
          options={COUNTRIES}
          formikProps={props}
        />
      </PageSection>
      {lines()}
      <PageSection>
        <Button
          disabled={props.isSubmitting}
          text="Save changes"
          type="button"
          onClick={() => props.submitForm()}
        />
      </PageSection>
    </Form>
  );
};

const FormikForm = withFormik({
  mapPropsToValues: (props: AccountFormProps) => props.user,
  handleSubmit: async (values, formikBag) => {
    const { resetForm, setSubmitting, setStatus } = formikBag;
    const { saveUser, onSuccess, onError } = formikBag.props;
    setStatus(undefined);
    try {
      const response = await saveUser(values);
      resetForm(response);
      onSuccess(values, response);
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
  }
})(BaseForm);

const loader = (
  <PageContainer>
    <Spinner loadingMessage="Loading your profile ..." />
  </PageContainer>
);

export const AccountDetails = (props: { path?: string }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [emailMessage, setEmailMessage] = useState();

  useEffect(
    () => {
      if (error && errorRef.current) {
        window.scrollTo(0, errorRef.current.offsetTop - 20);
      }
    },
    [error]
  );

  useEffect(() => {
    Users.getCurrentUser()
      .then((u: User) => {
        setUser(u);
      })
      .then(() => setLoading(false));
  }, []);

  const saveUser = async (values: User) => {
    const changedUser = { ...user, ...values };
    return await Users.saveChanges(user, changedUser);
  };

  const updateValues = (input: User, response: User) => {
    const changedFields = Users.getChangedFields(response, input);
    if (changedFields.primaryEmailAddress) {
      setEmailMessage(changedFields.primaryEmailAddress);
    }
    setUser(response);
    if (pageTopRef.current) {
      window.scrollTo(0, pageTopRef.current.offsetTop - 20);
    }
  };

  const content = () => (
    <>
      <div ref={pageTopRef} css={{ display: "none" }} />
      <PageContainer>
        <MarginWrapper>
          <span css={textSmall}>
            These details will only be visible to you and the Guardian.
          </span>
        </MarginWrapper>
      </PageContainer>
      <PageContainer>
        <FormikForm
          user={user}
          saveUser={saveUser}
          onError={setError}
          onSuccess={updateValues}
          emailMessage={emailMessage}
        />
      </PageContainer>
      <PageContainer>
        <MembershipLinks />
      </PageContainer>
    </>
  );

  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.accountDetails}>
        <h1
          css={{
            fontSize: "32px",
            lineHeight: "36px",
            fontFamily: headline,
            marginBottom: "30px",
            marginTop: "0"
          }}
        >
          Edit your profile
        </h1>
      </PageHeaderContainer>
      <PageContainer>
        {error ? <GenericErrorMessage ref={errorRef} /> : null}
      </PageContainer>
      {loading ? loader : content()}
    </>
  );
};
