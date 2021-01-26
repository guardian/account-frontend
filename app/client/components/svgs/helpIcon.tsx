import { brand } from "@guardian/src-foundations/palette";
import React from "react";

interface HelpIconProps {
  overrideFillColor?: string;
}

export const HelpIcon = (props: HelpIconProps) => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
    <path
      d="M9.5 0C4.24333 0 0 4.24333 0 9.5C0 14.7567 4.24333 19 9.5 19C14.7567 19 19 14.7567 19 9.5C19 4.24333 14.7567 0 9.5 0ZM10.5767 13.2367V13.7011C10.4711 13.7856 10.3233 13.8489 10.1756 13.9333C10.0278 13.9967 9.85889 14.06 9.69 14.1233C9.52111 14.1867 9.35222 14.2289 9.18333 14.25C9.01445 14.2711 8.84556 14.2922 8.69778 14.2922C8.36 14.2922 8.14889 14.2289 8.02222 14.1022C7.87444 13.9756 7.81111 13.8278 7.81111 13.68C7.81111 13.5111 7.83222 13.3422 7.85333 13.1733C7.87444 13.0044 7.91667 12.8356 7.95889 12.6244L8.84556 8.59222L8.02222 8.40222V7.95889C8.14889 7.91667 8.31778 7.85333 8.55 7.79C8.76111 7.72667 8.99333 7.68444 9.24667 7.64222C9.5 7.6 9.73222 7.55778 9.96445 7.53667C10.1967 7.51556 10.4078 7.49444 10.5978 7.49444L10.83 7.64222L9.64778 13.2367H10.5767ZM10.9778 6.14333C10.7878 6.31222 10.5133 6.39667 10.1967 6.39667C9.90111 6.39667 9.64778 6.31222 9.43667 6.14333C9.24667 5.97445 9.14111 5.76333 9.14111 5.48889C9.14111 5.19333 9.24667 4.96111 9.43667 4.79222C9.62667 4.62333 9.88 4.53889 10.1967 4.53889C10.5344 4.53889 10.7878 4.62333 10.9778 4.79222C11.1678 4.96111 11.2733 5.19333 11.2733 5.48889C11.2522 5.76333 11.1678 5.97445 10.9778 6.14333Z"
      fill={props.overrideFillColor || brand[400]}
    />
  </svg>
);
