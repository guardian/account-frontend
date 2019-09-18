import { css } from "@emotion/core";
import React from "react";
import { palette } from "@guardian/src-foundations";

const collapseItemButtonStyles = (collapsed: boolean) => css`
  background-color: transparent;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  padding: 0;
  position: relative;
  width: 20px;
  height: 20px;
  margin-top: 3px;
  > * {
    pointer-events: none;
  }
  :before {
    position: absolute;
    top: ${collapsed ? "7px" : "5px"};
    left: 6px;
    border: 2px solid ${palette.yellow.dark};
    border-top: 0;
    border-left: 0;
    content: "";
    display: inline-block;
    transform: ${collapsed ? "rotate(-135deg)" : "rotate(45deg)"};
    height: 6px;
    width: 6px;
  }
`;

export const CollapseItemButton: React.FC<{
  collapsed: boolean;
}> = ({ collapsed }) => {
  return <button type="button" css={collapseItemButtonStyles(collapsed)} />;
};
