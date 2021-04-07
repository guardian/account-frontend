import React from "react";

interface HelpSectionIconProps {
  size?: number;
}

export const getHelpSectionIcon = (sectionId: string) => {
  switch (sectionId) {
    case "delivery":
      return <DeliveryIcon />;
    case "billing":
      return <BillingIcon />;
    case "accounts-and-sign-in":
      return <AccountsAndSignInIcon />;
    case "the-guardian-website":
      return <TheGuardianWebsiteIcon />;
    case "journalism":
      return <JournalismIcon />;
    case "print-subscriptions":
      return <PrintSubscriptionsIcon />;
    default:
      return <SvgWrapper />;
  }
};

interface SvgWrapperProps {
  size?: number;
  children?: React.ReactNode;
}

const SvgWrapper = (props: SvgWrapperProps) => (
  <svg
    width={props.size || "39"}
    height={props.size || "39"}
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="19.5" cy="19.5" r="19.5" fill="#052962" />
    {props.children}
  </svg>
);

export const AccountsAndSignInIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.75 8L25.3 9.54999V28.9999L23.75 30.5249L14.55 30.5499L13 28.9999V9.54999L14.55 8H23.75Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2502 28.9999C19.8002 28.9999 20.2752 28.5499 20.2752 27.9749C20.2752 27.3999 19.8002 26.95 19.2502 26.95C18.6752 26.95 18.2002 27.3999 18.2002 27.9749C18.2002 28.5499 18.6752 28.9999 19.2502 28.9999Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.325 25.9249V11.575H15.125V25.9249H23.325Z"
        fill="#052962"
      />
    </g>
  </SvgWrapper>
);

export const JournalismIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.9999 28.9999L27.0249 29.9999H13L12 28.9999V11L13 10H24.025L27.9999 14V28.9999Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 16H14V17.5H26V16Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 19H14V20.5H26V19Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 22H14V23.5H21V22Z"
        fill="#052962"
      />
    </g>
  </SvgWrapper>
);

export const DeliveryIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 17.5625L22.5625 17H27.0625C29.2371 17 31 18.7629 31 20.9375V25.4375L30.4375 26H22.5625L22 25.4375V17.5625ZM23.125 18.125V24.875H29.875V20.9375C29.875 19.3842 28.6158 18.125 27.0625 18.125H23.125Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 12.9091L8.72727 12L23.2727 12.0007L24 12.9098V25.0909L23.2727 26H8.72727L8 25.0909V12.9091Z"
        fill="white"
      />
      <circle cx="11.5" cy="26.5" r="1.5" fill="white" />
      <circle cx="26.5" cy="26.5" r="1.5" fill="white" />
    </g>
  </SvgWrapper>
);
export const BillingIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.25 14L9 13.25H30L30.75 14V27L30 27.75H9L8.25 27V14Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 24H12V22.5H15V24Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 24H16V22.5H19V24Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 24H20V22.5H23V24Z"
        fill="#052962"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 24H24V22.5H27V24Z"
        fill="#052962"
      />
    </g>
  </SvgWrapper>
);

export const PrintSubscriptionsIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <g>
      <path
        d="M19.375 13.8821L29.9997 11V26.8903L19.375 29.4452V13.8821Z"
        fill="white"
        stroke="white"
        strokeLinejoin="bevel"
      />
      <line
        x1="21.0582"
        y1="16.7807"
        x2="27.4041"
        y2="15.0803"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="21.0582"
        y1="20.0228"
        x2="27.4041"
        y2="18.3225"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="21.0582"
        y1="23.267"
        x2="27.4041"
        y2="21.5666"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="21.0582"
        y1="26.56"
        x2="27.4041"
        y2="24.8596"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1 2"
      />
      <path
        d="M19.6248 13.8821L9.00007 11V26.8903L19.6248 29.4452V13.8821Z"
        fill="white"
        stroke="white"
        strokeLinejoin="bevel"
      />
      <line
        x1="0.75"
        y1="-0.75"
        x2="7.31977"
        y2="-0.75"
        transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 17.6992)"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="0.75"
        y1="-0.75"
        x2="7.31977"
        y2="-0.75"
        transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 20.9414)"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="0.75"
        y1="-0.75"
        x2="7.31977"
        y2="-0.75"
        transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 24.1855)"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="0.75"
        y1="-0.75"
        x2="7.31977"
        y2="-0.75"
        transform="matrix(-0.965926 -0.258819 -0.258819 0.965926 18.4719 27.4785)"
        stroke="#041F4A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  </SvgWrapper>
);

export const TheGuardianWebsiteIcon = (props: HelpSectionIconProps) => (
  <SvgWrapper size={props.size || 39}>
    <g css={{ transform: "translate(6.9px, 7.2px)" }}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.8896 12.5C20.8896 13.2151 20.7958 13.9083 20.6198 14.568H17.2917C17.3548 13.9007 17.388 13.209 17.388 12.5C17.388 11.7924 17.3549 11.102 17.292 10.436L20.6209 10.436C20.7962 11.0945 20.8896 11.7863 20.8896 12.5ZM15.2823 10.436C15.3508 11.0916 15.388 11.7824 15.388 12.5C15.388 13.2191 15.3506 13.9112 15.2818 14.568H10.4977C10.429 13.9112 10.3916 13.2191 10.3916 12.5C10.3916 11.7824 10.4288 11.0916 10.4973 10.436L15.2823 10.436ZM17.001 8.43603L19.782 8.43603C18.8969 6.93817 17.5374 5.75389 15.9104 5.08993C16.371 6.01848 16.7447 7.15637 17.001 8.43603ZM12.8896 4.5H12.8898L12.89 4.5C12.8931 4.49995 12.9154 4.49963 12.9682 4.52364C13.0283 4.55099 13.1319 4.61247 13.2706 4.74289C13.5588 5.01382 13.9089 5.4988 14.2465 6.24939C14.524 6.86619 14.7666 7.60379 14.956 8.43603L10.8236 8.43603C11.013 7.60379 11.2556 6.86619 11.5331 6.24939C11.8707 5.4988 12.2208 5.01382 12.5089 4.74289C12.6476 4.61247 12.7513 4.55099 12.8114 4.52364C12.859 4.50201 12.8818 4.50013 12.8881 4.5C12.8886 4.5 12.8891 4.5 12.8896 4.5ZM9.86928 5.08979C9.40862 6.01837 9.03493 7.1563 8.77858 8.43603L5.9973 8.43604C6.88247 6.93807 8.24205 5.75372 9.86928 5.08979ZM8.48752 10.436L5.15843 10.436C4.9831 11.0945 4.88965 11.7863 4.88965 12.5C4.88965 13.2151 4.98348 13.9083 5.1595 14.568H8.4879C8.42479 13.9007 8.3916 13.209 8.3916 12.5C8.3916 11.7924 8.42466 11.102 8.48752 10.436ZM8.77939 16.568H5.99969C6.8849 18.0641 8.24351 19.2469 9.86929 19.9102C9.40911 18.9826 9.03571 17.8461 8.77939 16.568ZM12.8898 20.5C12.8897 20.5 12.8897 20.5 12.8896 20.5C12.889 20.5 12.8884 20.5 12.8878 20.5C12.8812 20.4998 12.8584 20.4977 12.8114 20.4764C12.7513 20.449 12.6476 20.3875 12.5089 20.2571C12.2208 19.9862 11.8707 19.5012 11.5331 18.7506C11.2561 18.1348 11.0138 17.3986 10.8245 16.568H14.955C14.7658 17.3986 14.5235 18.1348 14.2465 18.7506C13.9089 19.5012 13.5588 19.9862 13.2706 20.2571C13.1319 20.3875 13.0283 20.449 12.9682 20.4764C12.9207 20.4979 12.8979 20.4999 12.8915 20.5C12.891 20.5 12.8904 20.5 12.8898 20.5ZM15.9104 19.9101C17.536 19.2467 18.8945 18.064 19.7796 16.568H17.0002C16.7439 17.846 16.3705 18.9825 15.9104 19.9101ZM12.8897 2.5C16.9655 2.50004 20.4718 4.93845 22.0293 8.43603H22.0391V8.45793C22.5859 9.69392 22.8896 11.0615 22.8896 12.5C22.8896 18.0228 18.4125 22.5 12.8896 22.5C7.3668 22.5 2.88965 18.0228 2.88965 12.5C2.88965 6.97715 7.3668 2.5 12.8896 2.5C12.8897 2.5 12.8897 2.5 12.8897 2.5Z"
        fill="white"
      />
    </g>
  </SvgWrapper>
);
