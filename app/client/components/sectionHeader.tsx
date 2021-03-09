import { css } from "@emotion/core";
import {
  breakpoints,
  neutral,
  palette,
  space
} from "@guardian/src-foundations";
import { textSans, titlepiece } from "@guardian/src-foundations/typography";
import Color from "color";
import React from "react";
import { minWidth } from "../styles/breakpoints";
import { gridBase, gridItemPlacement } from "../styles/grid";

interface SectionHeaderProps {
  title: string | JSX.Element;
  isArticlePage?: boolean;
}

const chevronCss = css`
  width: 7px;
  height: 7px;
  border-top: 2px solid ${neutral["7"]};
  border-right: 2px solid ${neutral["7"]};
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(-135deg);
  left: ${space[1]}px;
`;

const isLandingPage =
  window.location.pathname === "/help-centre" ||
  window.location.pathname === "/help-centre/";

export const SectionHeader = (props: SectionHeaderProps) => {
  const gridPlacementDesktop = props.isArticlePage
    ? gridItemPlacement(5, 9)
    : gridItemPlacement(3, 10);

  const gridPlacementWide = props.isArticlePage
    ? gridItemPlacement(5, 16)
    : gridItemPlacement(3, 14);

  return (
    <header
      css={{
        backgroundColor: Color(palette.brand[800])
          .alpha(0.3)
          .string()
      }}
    >
      <div
        css={{
          ...gridBase,
          maxWidth: `${breakpoints.wide}px`,
          margin: "0 auto",
          borderLeft: `1px solid ${palette.neutral[86]}`,
          borderRight: `1px solid ${palette.neutral[86]}`,

          [minWidth.desktop]: {
            ...(gridBase[minWidth.desktop] as object)
          },
          [minWidth.wide]: {
            ...(gridBase[minWidth.wide] as object)
          }
        }}
      >
        <div
          css={{
            marginTop: `${space[3]}px`,
            ...gridItemPlacement(1, 12)
          }}
        >
          <a
            href="/help-centre"
            css={css`
              ${textSans.medium()};
              color: ${palette.neutral[0]};
              position: relative;
            `}
          >
            {isLandingPage ? (
              <span
                css={css`
                  ${textSans.medium({ fontWeight: "bold" })};
                  color: ${palette.neutral[0]};
                `}
              >
                Help Centre
              </span>
            ) : (
              <span css={{ marginLeft: "1rem" }}>
                <span css={chevronCss} />
                Back to Help Centre
              </span>
            )}
          </a>
        </div>
        <h1
          css={{
            font: titlepiece.small(),
            fontSize: "2rem",
            ...gridItemPlacement(1, 12),
            margin: `${space[9]}px 0 0 0`,
            padding: `${space[3]}px 0`,

            [minWidth.tablet]: {
              ...gridItemPlacement(1, 12)
            },

            [minWidth.desktop]: {
              ...gridPlacementDesktop,
              fontSize: "2.625rem",
              paddingLeft: `${space[5]}px`,
              marginTop: `${space[24]}px`,
              marginLeft: `-${space[5]}px`,
              borderLeft: `1px solid ${palette.neutral[86]}`,
              borderTop: `1px solid ${palette.neutral[86]}`
            },
            [minWidth.wide]: {
              ...gridPlacementWide,
              marginLeft: `${props.isArticlePage ? "0px" : `-${space[5]}px`}`
            }
          }}
        >
          {props.title}
        </h1>
      </div>
    </header>
  );
};
