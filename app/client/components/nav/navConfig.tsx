import { conf } from "../../../server/config";
import { AccountOverviewIcon } from "../svgs/accountOverviewIcon";
import { EmailPrefsIcon } from "../svgs/emailPrefIcon";
import { HelpIcon } from "../svgs/helpIcon";
import { ProfileIcon } from "../svgs/profileIcon";
import { SettingsIcon } from "../svgs/settingsIcon";
import { SignoutIcon } from "../svgs/signoutIcon";

interface NavIconProps {
  overrideFillColor?: string;
  overrideWidthAtDesktop?: number;
}
export interface NavItem {
  title: string;
  link: string;
  local?: boolean;
  icon?: (props: NavIconProps) => JSX.Element;
}

export interface MenuSpecificNavItem extends NavItem {
  isDropDownExclusive?: boolean;
  dropdownHideAtDesktop?: boolean;
}

interface NavLinks {
  accountOverview: MenuSpecificNavItem;
  profile: MenuSpecificNavItem;
  settings: MenuSpecificNavItem;
  emailPrefs: MenuSpecificNavItem;
  help: MenuSpecificNavItem;
  comments: MenuSpecificNavItem;
  signOut: MenuSpecificNavItem;
}

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}
export const PROFILE_HOST_NAME = `https://profile.${domain}`;

export const NAV_LINKS: NavLinks = {
  accountOverview: {
    title: "Account overview",
    link: "/",
    local: true,
    icon: AccountOverviewIcon,
    dropdownHideAtDesktop: true
  },
  profile: {
    title: "Profile",
    link: "/public-settings",
    local: true,
    icon: ProfileIcon,
    dropdownHideAtDesktop: true
  },
  emailPrefs: {
    title: "Emails & marketing",
    link: "/email-prefs",
    local: true,
    icon: EmailPrefsIcon,
    dropdownHideAtDesktop: true
  },
  settings: {
    title: "Settings",
    link: "/account-settings",
    local: true,
    icon: SettingsIcon,
    dropdownHideAtDesktop: true
  },
  help: {
    title: "Help",
    link: "/help",
    local: true,
    icon: HelpIcon,
    dropdownHideAtDesktop: true
  },
  comments: {
    title: "Comments & replies",
    link: "/profile/user", // note this hits a redirect/proxy endpoint
    isDropDownExclusive: true
  },
  signOut: {
    title: "Sign out",
    link: `${PROFILE_HOST_NAME}/signout`,
    isDropDownExclusive: true,
    icon: SignoutIcon
  }
};