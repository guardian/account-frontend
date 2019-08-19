import { Field, Form, Formik, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import palette from "../../../colours";
import { sans } from "../../../styles/fonts";
import { headline } from "../../../styles/fonts";
import { Button } from "../../buttons";
import { navLinks } from "../../nav";
import { PageContainer, PageHeaderContainer } from "../../page";
import { Spinner } from "../../spinner";
import * as AvatarAPI from "../idapi/avatar";
import { Users } from "../identity";
import { IdentityLocations } from "../IdentityLocations";
import { Lines } from "../Lines";
import { User } from "../models";
import { PageSection } from "../PageSection";

export const PublicProfile = (props: { path?: string }) => {
  const [user, setUser] = useState();
  const [hasUsername, setHasUsername] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avatarSet, setAvatarSet] = useState(false);

  interface AvatarPayload {
    file: File | null;
  }

  useEffect(() => {
    Users.getCurrentUser()
      .then((u: User) => {
        setHasUsername(!!u.username);
        setUser(u);
      })
      .then(() => setLoading(false));
  }, []);

  const saveUser = async (values: User) => {
    setLoading(true);
    const changedUser = { ...user, ...values };
    await Users.saveChanges(user, changedUser);
    setUser(changedUser);
    setHasUsername(!!changedUser.username);
    setLoading(false);
  };

  const saveAvatar = async (values: AvatarPayload) => {
    if (values.file) {
      await AvatarAPI.write(values.file);
      setAvatarSet(true);
    }
  };

  const loader = (
    <PageContainer>
      <Spinner loadingMessage="Loading your profile ..." />
    </PageContainer>
  );

  const labelCss = {
    display: "block",
    width: "100%",
    "& input, & textarea": {
      display: "block"
    }
  };

  const usernameInput = () => (
    <>
      <label css={labelCss}>
        Username
        <Field type="text" name="username" />
      </label>
      <p>
        You can only set your username once. It must be 6-20 characters, letters
        and/or numbers only and have no spaces. If you do not set your username,
        then your full name will be used.
      </p>
    </>
  );

  const usernameDisplay = (u: User) => (
    <>
      <PageContainer>
        <PageSection title="Username">{u.username}</PageSection>
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
    </>
  );

  const avatarUploadForm = () => (
    <Formik
      initialValues={{
        file: null
      }}
      onSubmit={saveAvatar}
      render={(formikBag: any) => (
        <Form>
          <label css={labelCss}>
            <p>img here!</p>
            <input
              type="file"
              name="file"
              onChange={(e: React.ChangeEvent) => {
                const target = e.currentTarget as HTMLInputElement;
                if (target.files) {
                  formikBag.setFieldValue("file", target.files[0]);
                }
              }}
            />
          </label>
          <Button text="Upload image" onClick={() => formikBag.submitForm()} />
        </Form>
      )}
    />
  );

  const avatarUploadSuccessNotice = () => (
    <div
      css={{
        fontSize: "13px",
        lineHeight: "18px",
        fontFamily: sans,
        borderBottom: `1px solid ${palette.green.light}`,
        borderTop: `1px solid ${palette.green.light}`,
        color: palette.green.medium,
        marginTop: "6px",
        padding: "7px 8px"
      }}
    >
      Thank you for uploading your avatar. It will be checked by Guardian
      moderators shortly.
    </div>
  );

  const content = () => (
    <>
      <PageContainer>
        These details will be publicly visible to everyone who sees your profile
        in the <a href={IdentityLocations.COMMUNITY_FAQS}>commenting</a>{" "}
        section.
      </PageContainer>
      <PageContainer>
        <Lines n={1} />
      </PageContainer>
      {hasUsername ? usernameDisplay(user) : null}
      <PageContainer>
        <PageSection title="Profile">
          <Formik
            initialValues={{
              ...user
            }}
            onSubmit={saveUser}
            render={(formikBag: FormikProps<User>) => (
              <Form>
                {!hasUsername ? usernameInput() : null}
                <label css={labelCss}>
                  Location
                  <Field type="text" name="location" />
                </label>
                <label css={labelCss}>
                  About Me
                  <Field type="textarea" name="aboutMe" />
                </label>
                <label css={labelCss}>
                  Interests
                  <Field type="textarea" name="interests" />
                </label>
                <Button
                  text="Save changes"
                  onClick={() => formikBag.submitForm()}
                />
              </Form>
            )}
          />
        </PageSection>
        <PageSection
          title="Profile image"
          description="This image will appear next to your comments. Only .jpg, .png or .gif files of up to 1MB are accepted"
        >
          {avatarSet ? avatarUploadSuccessNotice() : avatarUploadForm()}
        </PageSection>
      </PageContainer>
    </>
  );

  return (
    <>
      <PageHeaderContainer selectedNavItem={navLinks.publicProfile}>
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
      {loading ? loader : content()}
    </>
  );
};
