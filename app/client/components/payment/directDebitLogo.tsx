import { css, SerializedStyles } from "@emotion/core";
import React from "react";

export interface DirectDebitLogoProps {
  fill?: string;
  justLogo?: true;
  additionalCss?: SerializedStyles;
}

export const DirectDebitLogo = (props: DirectDebitLogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 603.094 195.188"
    width="65"
    height="auto"
    css={css`
      ${props.additionalCss}
    `}
  >
    <path
      id="directdebit_logo"
      fill={props.fill || "black"}
      d="M283.716 40.98h31.28s30.97-.625 30.657 27.525c-.309 20.96-30.026 24.086-30.026 24.086H283.72V40.98zm93.576 101.043c.879 4.094 3.84 8.606 13.72 9.07 13.136.308 20.644-4.698 20.644-4.698v9.697s-14.388 3.446-21.272 3.446c-7.193 0-28.465-1.568-28.465-21.273 0-15.95 17.518-20.956 27.525-20.956 17.518.624 25.963 6.883 25.65 24.71 0 .258-28.821.066-37.802.004zm.042-7.827h24s0-9.07-11.575-9.07c-8.706 0-11.554 4.694-12.425 9.07zm75.923-9.794c3.473-3.768 9.303-6.784 19.083-6.784 19.396 0 22.525 16.265 22.213 20.644-.312 4.379-1.877 20.957-24.395 20.957-8.507 0-13.713-2.903-16.897-6.507v5.254h-15.33v-56.305h15.33v22.74zm13.143 26.06c9.07-.316 13.136-8.13 13.136-11.884 0-3.755-2.192-11.575-13.767-11.575-8.98 0-11.716 6.784-12.512 10.1v4.08c.79 3.38 3.538 9.278 13.143 9.278zM598.72 148.9l.309 8.76s-7.193 1.562-11.884 1.562c-4.691 0-16.897-2.814-16.897-14.704v-18.143h-12.82v-8.13h12.82v-9.697h15.644v9.698h12.828v8.129H585.89v15.645s0 7.82 6.26 7.82c6.252 0 6.568-.94 6.568-.94zM551.17 49.425h18.142v43.478h15.322V49.425h18.459v-9.073h-51.923zm-6.26 2.19l1.878-9.074s-7.821-3.438-21.582-3.438c-13.451 0-35.033 7.508-35.033 27.84 0 20.02 22.834 26.9 36.91 26.9 14.077 0 18.768-2.189 18.768-2.189l-1.562-10.01s-6.259 1.877-16.897 1.877c-10.322-.312-20.95-8.445-20.95-17.514.31-8.133 9.691-17.206 21.897-17.206 9.379 0 16.571 2.813 16.571 2.813zM406.65 40.667s25.65-1.25 25.65 13.764c0 12.827-14.697 13.764-14.697 13.764s4.063.624 5.944 3.438c1.561 2.502 11.883 21.273 11.883 21.273h-15.644s-2.502-3.13-3.755-5.316c-.936-2.19-3.754-6.884-3.754-6.884s-2.186-7.82-9.697-7.82c-.19 0-3.243-.117-5.632-.206v20.226h-15.013v-52.24zm-9.698 23.461h8.136s11.26-.628 11.884-7.508c.315-6.568-10.944-7.508-10.944-7.508h-9.076zm62.873 8.133h25.027v-9.697h-25.027V50.678h27.22v-10.01h-42.538v52.239h42.853V83.52H459.83V72.262zm60.997 40.037h15.329V101.66h-15.33zm0 45.67h15.329v-39.723h-15.33zM353.789 92.908h15.014v-52.24h-15.014zm-70.073 13.14h31.28s30.97-.632 30.657 27.524c-.309 20.957-30.026 24.09-30.026 24.09H283.72v-51.615zm15.33 41.916h10.01s20.644-1.252 20.644-17.206c0-15.953-21.897-17.518-21.897-17.518h-8.758zm0-65.066h10.01S329.7 81.332 329.7 65.69c0-16.266-21.897-17.515-21.897-17.515h-8.758zm-155.78-10.82V176.74s-60.688-10.95-60.688-52.551c.003-33.18 44.926-47.805 60.687-52.112zm0-1.953c-36.475-2.638-119.18 14.458-119.18 51.872 0 24.395 43.794 60.06 115.113 60.997 2.814 0 83.83-3.13 82.58-90.09-1.05-73.038-55.714-85.83-73.195-88.058V.395c69.689 4.423 124.498 46.333 124.498 97.2 0 53.803-61.312 97.593-136.697 97.593S0 151.395 0 97.594C0 43.794 60.996 0 136.385 0c2.31 0 4.605.041 6.884.124v70z"
    />
  </svg>
);
