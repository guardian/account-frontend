import { css } from "@emotion/core";
import React, { Component } from "react";
import palette from "../../colours";
import { minWidth } from "../../styles/breakpoints";
import { TheGuardianLogo } from "../svgs/theGuardianLogo";
import { PrivacySettings } from "./PrivacySettings";

const headerCSS = css`
  background-color: ${palette.blue.header};
  position: fixed;
  top: 0;
  width: 95%;
  max-width: 450px;
  border-bottom: 1px solid red;
`;

const logoStyles = css`
  margin-top: 6px;
  margin-bottom: 12px;
  margin-left: 48px;
  height: 72px;
  width: 224px;

  ${minWidth.mobileLandscape} {
    height: 95px;
    width: 295px;
  }

  path {
    fill: ${palette.white};
  }
`;

const multiLine = css`
  background-image: repeating-linear-gradient(
    to bottom,
    ${palette.neutral[5]},
    ${palette.neutral[5]} 1px,
    transparent 1px,
    transparent 4px
  );
  background-repeat: repeat-x;
  background-position: bottom;
  background-size: 1px 13px;
  background-color: ${palette.white};
  content: "";
  clear: left;
  display: block;
  height: 13px;
`;

export class ConsentManagementPortal extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div>
        <div css={headerCSS}>
          <TheGuardianLogo css={logoStyles} />
        </div>
        <PrivacySettings />
      </div>
    );
  }
}
