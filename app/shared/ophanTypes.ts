export type OphanProduct =
  | "CONTRIBUTION"
  | "RECURRING_CONTRIBUTION"
  | "MEMBERSHIP_SUPPORTER"
  | "MEMBERSHIP_PATRON"
  | "MEMBERSHIP_PARTNER"
  | "DIGITAL_SUBSCRIPTION"
  | "PAPER_SUBSCRIPTION_EVERYDAY"
  | "PAPER_SUBSCRIPTION_SIXDAY"
  | "PAPER_SUBSCRIPTION_WEEKEND"
  | "PAPER_SUBSCRIPTION_SUNDAY"
  | "PRINT_SUBSCRIPTION"
  | "APP_PREMIUM_TIER";

export type OphanAction =
  | "INSERT"
  | "VIEW"
  | "EXPAND"
  | "LIKE"
  | "DISLIKE"
  | "SUBSCRIBE"
  | "ANSWER"
  | "VOTE"
  | "CLICK";

export type OphanComponentType =
  | "READERS_QUESTIONS_ATOM"
  | "QANDA_ATOM"
  | "PROFILE_ATOM"
  | "GUIDE_ATOM"
  | "TIMELINE_ATOM"
  | "NEWSLETTER_SUBSCRIPTION"
  | "SURVEYS_QUESTIONS"
  | "ACQUISITIONS_ENGAGEMENT_BANNER"
  | "ACQUISITIONS_THANK_YOU_EPIC"
  | "ACQUISITIONS_EPIC"
  | "ACQUISITIONS_HEADER"
  | "ACQUISITIONS_INTERACTIVE_SLICE"
  | "ACQUISITIONS_NUGGET"
  | "ACQUISITIONS_FOOTER"
  | "ACQUISITIONS_STANDFIRST"
  | "ACQUISITIONS_EDITORIAL_LINK"
  | "ACQUISITIONS_MANAGE_MY_ACCOUNT"
  | "ACQUISITIONS_THRASHER"
  | "ACQUISITIONS_BUTTON"
  | "APP_ADVERT"
  | "APP_AUDIO"
  | "ACQUISITIONS_OTHER"
  | "APP_BUTTON"
  | "APP_CROSSWORDS"
  | "APP_ENGAGEMENT_BANNER"
  | "APP_CARD"
  | "APP_EPIC"
  | "APP_LINK"
  | "APP_NAVIGATION_ITEM"
  | "APP_GALLERY"
  | "APP_SCREEN"
  | "APP_THRASHER"
  | "APP_VIDEO";

export interface OphanComponent {
  componentType: OphanComponentType;
  id?: string;
  products?: OphanProduct[];
  campaignCode?: string;
  labels?: string[];
}

export interface AbTest {
  name: string;
  variant: string;
}

export interface OphanComponentEvent {
  component: OphanComponent;
  action: OphanAction;
  value?: string;
  abTest?: AbTest;
}
