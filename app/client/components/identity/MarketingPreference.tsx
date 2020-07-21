import React, { FC } from "react";
import palette from "../../colours";
import { sans } from "../../styles/fonts";
import { Checkbox } from "../checkbox";

interface MarketingPreferenceProps {
  id: string;
  description: string;
  identityName?: string;
  frequency?: string;
  title?: string;
  selected?: boolean;
  onClick: (id: string) => {};
}

const standardText = {
  fontSize: "14px",
  fontFamily: sans
};

const clockSVG = (
  <svg
    css={{ fill: palette.neutral["5"] }}
    width="11px"
    height="11px"
    viewBox="0 0 11 11"
  >
    <path d="M5.4 0C2.4 0 0 2.4 0 5.4s2.4 5.4 5.4 5.4 5.4-2.4 5.4-5.4S8.4 0 5.4 0zm3 6.8H4.7V1.7h.7L6 5.4l2.4.6v.8z" />
  </svg>
);

const getTitle = (title: MarketingPreferenceProps["title"]) => (
  <p
    css={[
      standardText,
      {
        cursor: "pointer",
        fontSize: "14px",
        lineHeight: "22px",
        fontFamily: sans,
        fontWeight: "bold",
        margin: "0"
      }
    ]}
  >
    {title}
  </p>
);

const getDescription = (
  description: MarketingPreferenceProps["description"]
) => (
  <p
    css={{
      padding: "2.88px 0 0 0"
    }}
  >
    {description}
  </p>
);

const getFrequency = (frequency: MarketingPreferenceProps["frequency"]) => (
  <p
    css={{
      fontSize: "12px",
      lineHeight: "16px",
      margin: "3px 0 0 0",
      opacity: 0.75
    }}
  >
    <span
      css={{
        display: "inline-block",
        marginRight: "8px",
        verticalAlign: "middle"
      }}
    >
      {clockSVG}
    </span>
    {frequency}
  </p>
);

export const MarketingPreference: FC<MarketingPreferenceProps> = props => {
  const {
    id,
    description,
    frequency,
    selected,
    title,
    identityName,
    onClick
  } = props;
  const linkName = `mma-switch : ${identityName} : ${
    selected ? "tick" : "untick"
  }`;
  return (
    <div
      onClick={e => {
        // Checkboxes inside labels will trigger click events twice.
        // Ignore the input click event
        if (e.target instanceof Element && e.target.nodeName === "INPUT") {
          return;
        }
        onClick(id);
      }}
      css={[
        standardText,
        {
          lineHeight: "1.333",
          marginTop: "12px",
          paddingLeft: "30px",
          position: "relative"
        }
      ]}
      data-link-name={identityName ? linkName : undefined}
    >
      <div css={{ position: "absolute", left: 0 }}>
        <Checkbox
          checked={!!selected}
          onChange={_ => {
            return;
          }}
        />
      </div>
      {title && getTitle(title)}
      {getDescription(description)}
      {frequency && getFrequency(frequency)}
    </div>
  );
};
