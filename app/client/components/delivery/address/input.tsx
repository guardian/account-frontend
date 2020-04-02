import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { focusHalo } from "@guardian/src-foundations/accessibility";
import { textSans } from "@guardian/src-foundations/typography";
import React, { useEffect, useRef } from "react";
import { ErrorIcon } from "../../svgs/errorIcon";

type setStateFunc = (value: string) => void;

interface InputProps {
  type?: string;
  step?: string;
  min?: string;
  label: string;
  width: number;
  value: string | number;
  optional?: boolean;
  name?: string;
  id?: string;
  changeSetState?: setStateFunc;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  setFocus?: boolean;
  inErrorState?: boolean;
  errorMessage?: string;
  prefixValue?: string;
}

export const Input = (props: InputProps) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.setFocus) {
      inputEl.current?.focus();
    }
  }, [props.setFocus]);

  return (
    <label
      css={css`
        display: block;
        color: ${palette.neutral["7"]};
        ${textSans.medium()};
        font-weight: bold;
      `}
    >
      {props.label}
      {props.optional && (
        <span
          css={css`
            font-style: italic;
            font-weight: normal;
            color: ${palette.neutral["46"]};
          `}
        >
          {" "}
          optional
        </span>
      )}
      {props.inErrorState && (
        <span
          css={css`
            display: block;
            color: ${palette.error.main};
          `}
        >
          <ErrorIcon />
          {props.errorMessage}
        </span>
      )}
      <div>
        {props.prefixValue && (
          <span
            css={css`
              ${textSans.medium()};
              position: relative;
              z-index: 2;
              left: 1ch;
            `}
          >
            {props.prefixValue}
          </span>
        )}
        <input
          type={props.type || "text"}
          name={name}
          id={props.id}
          step={props.step}
          min={props.min}
          value={props.value}
          ref={inputEl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            props.changeSetState && props.changeSetState(`${e.target.value}`)
          }
          onFocus={(e: React.FocusEvent<HTMLInputElement>): void =>
            props.onFocus && props.onFocus(e)
          }
          css={css`
          width: ${props.prefixValue ? `calc(100% - 4px)` : `100%`};
          max-width: ${props.width}ch;
          height: 44px;
          ${textSans.medium()}
          color: ${palette.neutral["7"]};
          margin-top: 4px;
          padding: 0 8px;
          background-color: ${palette.neutral["100"]};
          border: ${props.inErrorState ? 4 : 2}px solid ${
            props.inErrorState ? palette.error.main : palette.neutral["60"]
          };
          ${props.prefixValue &&
            `
            margin-left: calc(-${props.prefixValue.length}ch + 4px);
            box-sizing: border-box;
            padding-left: calc(${props.prefixValue.length}ch + 10px);
          `}
        };
          &:focus {
            ${focusHalo};
          }
        `}
        />
      </div>
    </label>
  );
};
