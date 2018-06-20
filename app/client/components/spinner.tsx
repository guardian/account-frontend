import React from "react";
import { injectGlobal } from "../styles/emotion";
import { css } from "../styles/emotion";

export interface LoadingProps {
  loadingMessage?: string;
}

export const Spinner = (props: LoadingProps) => (
  <div
    css={{
      alignItems: "center",
      display: "flex"
    }}
  >
    {injectGlobal`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}
    <div
      css={{
        border: "6px solid #f3f3f3",
        borderTop: "6px solid #333",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        animation: "spin 2s linear infinite",
        margin: "10px"
      }}
    />
    {props.loadingMessage}
  </div>
);
