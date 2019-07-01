import React from "react";
import { css, cx } from "@emotion/core";
import palette from "../../colours";

const collapsePurposeItemButtonStyles = (collapsed: boolean) => css`
  background-color: transparent;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  padding: 0;
  position: relative;
  width: 20px;
  height: 20px;
  > * {
    pointer-events: none;
  }
  :before {
    position: absolute;
    top: ${collapsed ? "7px" : "5px"};
    left: 6px;
    border: 2px solid ${palette.neutral[4]};
    border-top: 0;
    border-left: 0;
    content: "";
    display: inline-block;
    transform: ${collapsed ? "rotate(-135deg)" : "rotate(45deg)"};
    height: 6px;
    width: 6px;
  }
`;

export const CollapsePurposeItemButton: React.FC<{
  collapsed: boolean;
}> = ({ collapsed }) => {
  return (
    <button type="button" css={collapsePurposeItemButtonStyles(collapsed)} />
  );
};
