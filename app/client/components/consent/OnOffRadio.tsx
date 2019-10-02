import { css } from "@emotion/core";
import { ItemState } from "@guardian/consent-management-platform/lib/types";
import {
  focusHalo,
  palette,
  size,
  space,
  transitions
} from "@guardian/src-foundations";
import React, { Component } from "react";

let idCounter: number = 0;

const radioContainerStyles = css`
  cursor: default;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`;

const errorStyles = css`
  box-shadow: 0 0 0 5px ${palette.news.bright};
  z-index: 9;
`;

const radioInputStyles = css`
  color: ${palette.brand.pastel};
  @supports (appearance: none) {
    appearance: none;
    outline: 0;
    color: inherit;
    box-sizing: border-box;
    display: inline-block;
    width: ${size.small}px;
    height: ${size.small}px;
    margin: 0 ${space[1]}px 0 0;
    border: 2px solid currentColor;
    border-radius: 50%;
    position: relative;
    transition: box-shadow ${transitions.short};
    transition-delay: 0.08s;
    :focus {
      ${focusHalo};
    }
    :after {
      background: currentColor;
      position: absolute;
      content: "";
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 50%;
      transform: scale(0);
      transform-origin: center;
      transition: transform ${transitions.short};
    }
    :checked {
      color: ${palette.neutral[100]};
      &:after {
        transform: scale(0.6);
      }
    }
    :disabled {
      color: ${palette.brand.pastel};
      &:checked {
        color: ${palette.brand.pastel};
      }
      border-color: ${palette.brand.pastel};
    }
    :not([disabled]) {
      cursor: pointer;
    }
  }
`;
const radioLabelStyles = (disabled: boolean) => css`
  margin-left: ${space[2]}px;
  cursor: ${disabled ? "default" : "pointer"};
  display: flex;
  align-items: center;
  &:last-of-type {
    margin-bottom: 0;
  }
  height: fit-content;

  :hover {
    input:not([disabled]) {
      border-color: ${palette.neutral[100]};
    }
  }
`;
const radioLabelTextStyles = (disabled: boolean) => css`
  position: relative;
  font-family: "Guardian Text Sans Web", Helvetica Neue, Helvetica, Arial,
    Lucida Grande, sans-serif;
  font-size: 17px;
  color: ${disabled ? palette.brand.pastel : palette.neutral[100]};
`;

interface Props {
  onChangeHandler?: (value: boolean) => void;
  selectedValue?: ItemState;
  showError?: boolean;
}
export class OnOffRadio extends Component<Props, {}> {
  private myIdCounter: number;

  constructor(props: Props) {
    super(props);
    this.myIdCounter = ++idCounter;
  }

  public render(): React.ReactNode {
    const { selectedValue, onChangeHandler, showError } = this.props;
    const id = `radio-${this.myIdCounter}`;
    const onId = `${id}-on`;
    const offId = `${id}-off`;
    const disabled: boolean = !onChangeHandler;

    return (
      <div css={radioContainerStyles}>
        <label css={radioLabelStyles(disabled)}>
          <input
            id={offId}
            name={id}
            type="radio"
            value="off"
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              this.updateValue(evt);
            }}
            defaultChecked={selectedValue === false}
            css={css`
              ${radioInputStyles};
              ${showError ? errorStyles : ""};
            `}
            disabled={disabled}
          />
          <span css={radioLabelTextStyles(disabled)}>Off</span>
        </label>
        <label css={radioLabelStyles(disabled)}>
          <input
            id={onId}
            name={id}
            type="radio"
            value="on"
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              this.updateValue(evt);
            }}
            defaultChecked={selectedValue === true}
            css={css`
              ${radioInputStyles};
              ${showError ? errorStyles : ""};
            `}
            disabled={disabled}
          />
          <span css={radioLabelTextStyles(disabled)}>On</span>
        </label>
      </div>
    );

    return "";
  }

  public shouldComponentUpdate = (nextProps: Props) =>
    nextProps.selectedValue === null || this.props.showError;

  private updateValue(evt: React.ChangeEvent<HTMLInputElement>): void {
    const value: boolean = evt.currentTarget.value === "on";
    const { onChangeHandler } = this.props;

    if (onChangeHandler) {
      onChangeHandler(value);
    }
  }
}
