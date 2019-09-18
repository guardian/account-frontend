import { css } from "@emotion/core";
import { ItemState } from "@guardian/consent-management-platform/lib/types";
import React, { Component } from "react";
import {
  palette,
  space,
  size,
  focusHalo,
  transitions
} from "@guardian/src-foundations";

let idCounter: number = 0;

const radioContainerStyles = css`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  label {
    margin-right: ${space[3]}px;
    input {
      color: ${palette.brand.pastel};
      &:checked {
        color: ${palette.neutral[100]};
      }
    }
    span {
      color: ${palette.neutral[100]};
    }
    &:hover {
      input {
        border-color: ${palette.neutral[100]};
      }
    }
  }
`;
const radioInputStyles = css`
  @supports (appearance: none) {
    appearance: none;
    outline: 0;
    cursor: pointer;
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
    &:focus {
      ${focusHalo};
    }
    &:after {
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
    &:checked {
      &:after {
        transform: scale(0.6);
      }
    }
  }
`;
const radioLabelStyles = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  &:last-of-type {
    margin-bottom: 0;
  }
  height: fit-content;
`;
const radioLabelTextStyles = css`
  position: relative;
  font-family: "Guardian Text Sans Web", Helvetica Neue, Helvetica, Arial,
    Lucida Grande, sans-serif;
  font-size: 17px;
`;

interface Props {
  onChangeHandler: (value: boolean) => void;
  selectedValue: ItemState;
}
export class OnOffRadio extends Component<Props, {}> {
  private myIdCounter: number;

  constructor(props: Props) {
    super(props);
    this.myIdCounter = ++idCounter;
  }

  public render(): React.ReactNode {
    const { selectedValue, onChangeHandler } = this.props;
    const id = `radio-${this.myIdCounter}`;
    const onId = `${id}-on`;
    const offId = `${id}-off`;

    if (selectedValue !== undefined && onChangeHandler) {
      return (
        <div css={radioContainerStyles}>
          <label css={radioLabelStyles}>
            <input
              id={offId}
              name={id}
              type="radio"
              value="off"
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                this.updateValue(evt);
              }}
              defaultChecked={selectedValue === false}
              css={radioInputStyles}
            />
            <span css={radioLabelTextStyles}>Off</span>
          </label>
          <label css={radioLabelStyles}>
            <input
              id={onId}
              name={id}
              type="radio"
              value="on"
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                this.updateValue(evt);
              }}
              defaultChecked={selectedValue === true}
              css={radioInputStyles}
            />
            <span css={radioLabelTextStyles}>On</span>
          </label>
        </div>
      );
    }

    return "";
  }

  public shouldComponentUpdate = (nextProps: Props) =>
    this.props.selectedValue !== nextProps.selectedValue;

  private updateValue(evt: React.ChangeEvent<HTMLInputElement>): void {
    const value: boolean = evt.currentTarget.value === "on";
    this.props.onChangeHandler(value);
  }
}
