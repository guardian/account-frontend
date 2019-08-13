import { css } from "@emotion/core";
import React, { Component } from "react";
import palette from "../../colours";
import { minWidth } from "../../styles/breakpoints";
import { TheGuardianLogo } from "../svgs/theGuardianLogo";
import { PrivacySettings } from "./PrivacySettings";

const headerCSS = css`
  background-color: ${palette.blue.header};
  position: relative;
  height: 90px;
`;

const logoStyles = css`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 44px;
  width: 135px;
  ${minWidth.mobileMedium} {
    height: 56px;
    width: 175px;
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
        <div css={multiLine} />
        <PrivacySettings />
      </div>
    );
  }
}
