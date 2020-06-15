import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import React, { useEffect, useRef, useState } from "react";
import { expanderButtonCss } from "../../expanderButton";
import { minWidth } from "../../styles/breakpoints";
import { gridColumns, gridItemPlacement } from "../../styles/grid";
import { ProfileIcon } from "../svgs/profileIcon";
import { MenuSpecificNavItem, NAV_LINKS } from "./navConfig";

const dropdownNavCss = (showMenu: boolean) =>
  css({
    display: `${showMenu ? "block" : "none"}`,
    background: palette.brand.main,
    borderTop: `1px solid ${palette.brand.pastel}`,
    position: "absolute",
    top: "50px",
    left: 0,
    width: "calc(100% - 30px)",
    maxWidth: "350px",
    zIndex: 1071,
    listStyle: "none",
    lineHeight: "1.375rem",
    boxShadow: "0 0 0 0.0625rem rgba(0,0,0,0.1)",
    margin: 0,
    padding: 0,
    " li": {
      padding: 0,
      margin: 0
    },
    [minWidth.desktop]: {
      width: "auto",
      minWidth: "220px",
      maxWidth: "none",
      top: `${space[9]}px`,
      left: "auto",
      right: "16px",
      marginRight: "-32px",
      bottom: "auto",
      borderTop: "none",
      background: palette.neutral["100"],
      "li:not(:last-child)": {
        borderBottom: `1px solid ${palette.neutral["86"]}`
      },
      " .hide--gte-desktop": {
        display: "none"
      },
      ":before": {
        content: "''",
        width: 0,
        height: 0,
        position: "absolute",
        top: `-${space[2]}px`,
        right: `${space[3]}px`,
        borderLeft: `${space[2]}px solid transparent`,
        borderRight: `${space[2]}px solid transparent`,
        borderBottom: `${space[2]}px solid ${palette.neutral["100"]}`
      }
    }
  });

const dropdownNavItemCss = css({
  padding: `9px 30px ${space[2]}px 46px`,
  textDecoration: "none",
  color: palette.neutral["100"],
  whiteSpace: "nowrap",
  position: "relative",
  marginTop: "-1px",
  display: "flex",
  alignItems: "center",
  ":hover, :focus": {
    backgroundColor: palette.brand.dark,
    textDecoration: "none"
  },
  ":focus": {
    outline: 0
  },
  ":after": {
    content: "''",
    display: "block",
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "calc(100% - 46px)",
    height: "1px",
    backgroundColor: `${palette.brand.pastel}`
  },
  [minWidth.desktop]: {
    padding: "18px 14px",
    color: palette.neutral["20"],
    ".icon--fill": {
      fill: palette.neutral["20"]
    },
    ":after": {
      content: "none"
    },
    ":hover, :focus": {
      backgroundColor: palette.neutral["97"]
    }
  }
});

export const DropdownNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    addListeners();
    return () => {
      removeListeners();
    };
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape" && showMenu) {
      setShowMenu(false);
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }
  };

  const handleDismissiveClick = (event: any) => {
    if (
      wrapperRef.current &&
      event.target &&
      !wrapperRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }
  };

  const addListeners = () => {
    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("click", handleDismissiveClick, false);
  };

  const removeListeners = () => {
    document.removeEventListener("keydown", handleKeyDown, false);
    document.removeEventListener("click", handleDismissiveClick, false);
  };

  return (
    <nav
      ref={wrapperRef}
      css={{
        ...gridItemPlacement(1, 2),
        whiteSpace: "nowrap",
        maxHeight: "26px",
        margin: "auto 0",
        [minWidth.desktop]: {
          position: "relative",
          left: "0.5rem",
          ...gridItemPlacement(-4, 2, gridColumns.tabletAndDesktop),
          marginLeft: "auto"
        },
        [minWidth.wide]: {
          ...gridItemPlacement(-4, 2, gridColumns.wide)
        },
        " button": {
          [minWidth.tablet]: {
            marginLeft: "auto"
          },
          paddingTop: 0,
          paddingBottom: 0
        }
      }}
    >
      {/* TODO refactor to full use ExpanderButton */}
      <button
        css={{
          ...expanderButtonCss(
            palette.neutral["100"],
            palette.neutral["100"]
          )(showMenu)
        }}
        type="button"
        aria-expanded={showMenu}
        onClick={() => setShowMenu(!showMenu)}
        ref={buttonRef}
      >
        {
          <i
            css={css`
              display: inline-block;
              width: 26px;
              height: 26px;
              margin-right: 0.5rem;
              border-radius: 50%;
              background-color: white;
              position: relative;
            `}
          >
            <ProfileIcon
              additionalCss={css`
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 65%;
                height: auto;
              `}
            />
          </i>
        }
        My account
      </button>

      <ul role="tablist" css={dropdownNavCss(showMenu)}>
        {Object.values(NAV_LINKS).map((navItem: MenuSpecificNavItem) => (
          <li
            className={
              navItem.dropdownHideAtDesktop ? "hide--gte-desktop" : undefined
            }
            key={navItem.title}
          >
            <a href={navItem.link} css={dropdownNavItemCss}>
              {navItem.icon && (
                <div
                  css={css`
                    position: absolute;
                    left: ${space[3]}px;
                  `}
                >
                  {navItem.icon(palette.neutral[100])}
                </div>
              )}
              <span
                css={{
                  lineHeight: "33px",
                  [minWidth.desktop]: {
                    lineHeight: "normal"
                  }
                }}
              >
                {navItem.inlineIcon && (
                  <span
                    css={css`
                      display: inline-block;
                      margin-right: 8px;
                    `}
                  >
                    {navItem.inlineIcon()}
                  </span>
                )}
                {navItem.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
