import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { Link } from "@reach/router";
import Color from "color";
import React from "react";
import { sans } from "../styles/fonts";
import { ArrowIcon } from "./svgs/arrowIcon";
import { ErrorIcon } from "./svgs/errorIcon";
import { TickIcon } from "./svgs/tickIcon";

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  height?: string;
  fontWeight?: "bold";
  left?: true;
  right?: true;
  disabled?: boolean;
  colour?: string;
  textColour?: string;
  primary?: true;
  hollow?: true;
  hide?: boolean;
  forceCircle?: true;
  hoverColour?: string;
  leftTick?: true;
  alert?: true;
  type?: "button" | "submit" | "reset";
}

export interface LinkButtonProps extends ButtonProps {
  to: string;
  state?: any;
}

const applyIconStyleIfApplicable = (
  hover: boolean,
  left?: true,
  right?: true,
  leftTick?: true
) => {
  if (left) {
    return hover ? styles.leftHover : styles.left;
  } else if (right) {
    return hover ? styles.rightHover : styles.right;
  } else if (leftTick) {
    return {
      padding: "4px 21px 3px 16px"
    };
  }
  return {
    padding: `1px ${space[5]}px 0 ${space[5]}px`
    // svg: {
    //   display: "none",
    // },
  };
};

const calcBackgroundColour = (
  disabled?: boolean,
  colour?: string,
  primary?: true,
  hollow?: true
) => {
  if (disabled) {
    return palette.neutral[60];
  } else if (primary) {
    return palette.brandAlt[400];
  } else if (hollow) {
    return palette.neutral[100];
  }
  return colour;
};

const calcTextColour = (
  disabled?: boolean,
  textColour?: string,
  primary?: true,
  hollow?: true
) => {
  if (disabled) {
    return palette.neutral[100];
  } else if (primary || hollow) {
    return palette.neutral[7];
  }
  return textColour;
};

const defaultColour = palette.neutral[20];
const buttonCss = ({
  disabled,
  height,
  fontWeight,
  colour = defaultColour,
  textColour = palette.neutral[100],
  left,
  right,
  primary,
  hollow,
  hide,
  forceCircle,
  hoverColour,
  leftTick
}: ButtonProps) => {
  const backgroundColour = calcBackgroundColour(
    disabled,
    colour,
    primary,
    hollow
  );
  return css({
    fontSize: "16px",
    fontFamily: sans,
    borderRadius: "1000px",
    alignItems: "center",
    position: "relative",
    ":active": {
      outline: "none"
    },
    minHeight: height || "36px",
    height: height || "36px", // this is required in addition to 'min-height' because IE - see https://github.com/philipwalton/flexbugs/issues/231
    fontWeight,
    display: hide ? "none" : "inline-flex",
    background: backgroundColour,
    color: calcTextColour(disabled, textColour, primary, hollow),
    border: hollow ? "1px solid" : "none",
    ...applyIconStyleIfApplicable(false, left, right, leftTick),
    ...(forceCircle
      ? {
          padding: "1px 18px 0 18px"
        }
      : {}),
    ":hover": disabled
      ? undefined
      : {
          background:
            hoverColour ||
            Color(backgroundColour)
              .darken(backgroundColour === defaultColour ? 0.3 : 0.1)
              .string(),
          ...applyIconStyleIfApplicable(true, left, right, leftTick)
        },
    cursor: disabled ? "not-allowed" : "pointer",
    maxWidth: "calc(100vw - 40px)"
  });
};

const styles = {
  leftHover: {
    svg: { transform: "translate(-3px, -50%) rotate(180deg)" }
  },
  left: {
    padding: "1px 18px 0 40px",
    svg: {
      fill: "currentColor",
      height: "34px",
      position: "absolute",
      left: "0px",
      top: "50%",
      transform: "translate(0, -50%) rotate(180deg)",
      transition: "transform .3s, background .3s",
      width: "36px"
    }
  },
  rightHover: {
    svg: { transform: "translate(3px, -50%)" }
  },
  right: {
    padding: "1px 40px 0 18px",
    svg: {
      fill: "currentColor",
      height: "34px",
      position: "absolute",
      right: "0",
      top: "50%",
      transform: "translate(0, -50%)",
      transition: "transform .3s, background .3s",
      width: "36px"
    }
  }
};

export const LinkButton = (props: LinkButtonProps) => (
  <Link
    to={props.disabled ? "" : props.to}
    onClick={props.onClick}
    css={buttonCss(props)}
    state={props.state}
  >
    {props.alert && (
      <ErrorIcon
        fill={palette.neutral[100]}
        additionalCss={css`
          margin-right: ${space[2]}px;
        `}
      />
    )}
    {props.text}
    {props.left || (props.right && <ArrowIcon />)}
  </Link>
);

export const Button = (props: ButtonProps) => (
  <button
    onClick={props.onClick}
    css={buttonCss(props)}
    disabled={props.disabled}
    onMouseUp={(event: React.MouseEvent<HTMLButtonElement>) =>
      (event.target as HTMLButtonElement).blur()
    }
    type={props.type}
  >
    {props.leftTick && <TickIcon />}
    {props.text}
    {(props.left || props.right) && <ArrowIcon />}
  </button>
);
