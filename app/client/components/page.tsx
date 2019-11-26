import { breakpoints } from "@guardian/src-foundations";
import { palette, space } from "@guardian/src-foundations";
import React from "react";
import { minWidth } from "../styles/breakpoints";
import { headline } from "../styles/fonts";
import { gridBase, gridItemPlacement } from "../styles/grid";
import { Nav, NavProps } from "./nav";

export interface PageNavAndContentContainerProps extends NavProps {
  children: React.ReactNode;
}

export const PageNavAndContentContainer: React.SFC<
  PageNavAndContentContainerProps
> = (props: PageNavAndContentContainerProps) => (
  <div
    css={{
      ...gridBase,
      maxWidth: `calc(${breakpoints.wide}px + 2.5rem)`,
      margin: "0 auto",
      paddingBottom: "1rem",
      [minWidth.desktop]: {
        ...(gridBase[minWidth.desktop] as object),
        paddingBottom: "9rem"
      },
      [minWidth.wide]: {
        ...(gridBase[minWidth.wide] as object),
        paddingBottom: "12rem"
      }
    }}
  >
    <nav
      css={{
        marginTop: `calc(-1 * (${space[5]}px + ${space[9]}px))`,
        display: "none",

        [minWidth.desktop]: {
          ...gridItemPlacement(1, 4),
          display: "block",
          paddingRight: "1.25rem"
        },

        [minWidth.wide]: {
          paddingRight: "0"
        }
      }}
    >
      <Nav {...props} />
    </nav>
    <section
      css={{
        ...gridItemPlacement(1, 4),

        [minWidth.tablet]: {
          ...gridItemPlacement(1, 11)
        },

        [minWidth.desktop]: {
          ...gridItemPlacement(5, 7)
        },

        [minWidth.wide]: {
          ...gridItemPlacement(6, 9)
        }
      }}
    >
      {props.children}
    </section>
  </div>
);

// Standard width, centered container
export const PageContainer: React.SFC<{ noVerticalMargin?: true }> = ({
  children,
  noVerticalMargin
}) => (
  <div
    css={{
      margin: (noVerticalMargin ? "0" : "1.8125rem") + " auto 0"
    }}
  >
    {children}
  </div>
);

// Thinner container, for readable text, etc
export const PageContainerSection: React.SFC<{}> = ({ children }) => (
  <div
    css={{
      margin: "1.8125rem auto 0"
    }}
  >
    {children}
  </div>
);

export interface PageHeaderContainerProps extends NavProps {
  children: React.ReactNode;
}

export const PageHeaderContainer: React.SFC<PageHeaderContainerProps> = (
  props: PageHeaderContainerProps
) => (
  <div
    css={{
      borderBottom: `1px solid ${palette.neutral["86"]}`,
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop: "2rem",
      background: "#0A1F47",
      [minWidth.desktop]: {
        paddingTop: "7rem",
        maxHeight: "calc(7em + 57px)"
      }
    }}
  >
    <div
      css={{
        ...gridBase,
        maxWidth: `calc(${breakpoints.wide}px + 2.5rem)`,
        margin: "auto",
        color: palette.neutral["100"],
        "& h1": {
          fontSize: "1.5rem",
          lineHeight: "2rem",
          fontFamily: headline,
          fontWeight: "bold"
        },
        "> h1, > div": {
          margin: 0,
          padding: `0 6px ${space[2]}px`,
          border: `1px solid ${palette.brand.pastel}`,
          ...gridItemPlacement(1, 3),
          [minWidth.tablet]: {
            ...gridItemPlacement(1, 10)
          },
          [minWidth.desktop]: {
            fontSize: "2.625rem",
            lineHeight: "2rem",
            maxHeight: "56px",
            padding: `${space[2]}px ${space[2]}px ${space[5]}px`,
            ...gridItemPlacement(5, 8)
          },
          [minWidth.wide]: {
            ...gridItemPlacement(6, 10)
          }
        }
      }}
    >
      {props.children}
    </div>
  </div>
);
