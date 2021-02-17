import { space } from "@guardian/src-foundations";
import React from "react";
import { minWidth } from "../../styles/breakpoints";

export interface TheGuardianLogoProps {
  width?: number;
  height?: number;
  fill: string;
}

export const TheGuardianLogo = (props: TheGuardianLogoProps) => (
  <a
    css={{
      display: "block",
      margin: `${space[3]}px`,
      width: `${props.width || 121}px`,
      height: `${props.height || 39}px`,
      textAlign: "right",
      [minWidth.desktop]: {
        width: `${props.width || 158}px`,
        height: `${props.height || 51}px`
      }
    }}
    href="https://www.theguardian.com"
    title="The Guardian - Back to home"
  >
    <svg
      viewBox="0 0 295 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={{
        width: `${props.width || 121}px`,
        height: `${props.height || 39}px`,
        [minWidth.desktop]: {
          width: `${props.width || 158}px`,
          height: `${props.height || 51}px`
        }
      }}
    >
      <path
        d="M66.2889 50.6378L71.3533 48.0014V8.36507H67.555L58.2402 20.7287H57.2454L57.788 6.91052H98.0317L98.5743 20.7287H97.4891L88.4455 8.36507H84.5568V47.9105L89.5308 50.5469V51.9105H66.2889V50.6378Z"
        fill={props.fill || "#fff"}
      />
      <path
        d="M103.187 48.8182V4.90909L99.2979 3.36364V2.54545L113.315 0H114.762V20.8182L115.124 20.4545C118.199 17.7273 122.721 15.9091 127.152 15.9091C133.302 15.9091 136.015 19.3636 136.015 25.9091V48.8182L139.27 50.6364V52H120.821V50.6364L124.168 48.8182V25.9091C124.168 22.3636 122.63 20.9091 119.646 20.9091C117.656 20.9091 116.028 21.5455 114.762 22.5455V49L118.018 50.8182V52.0909H99.5692V50.8182L103.187 48.8182Z"
        fill={props.fill || "#fff"}
      />
      <path
        d="M151.118 35.3644C151.479 42.6371 154.735 48.2734 162.422 48.2734C166.13 48.2734 168.752 46.5462 171.194 45.2734V46.728C169.295 49.3644 164.412 53.0916 157.629 53.0916C145.782 53.0916 139.632 46.4553 139.632 34.9098C139.632 23.6371 146.234 16.6371 156.996 16.6371C167.125 16.6371 172.37 21.728 172.37 35.0916V35.4553H151.118V35.3644ZM150.937 33.728L161.427 33.0916C161.427 24.0916 159.89 18.0916 156.815 18.0916C153.559 18.0916 150.937 25.0007 150.937 33.728Z"
        fill={props.fill || "#fff"}
      />
      <path
        d="M0 69.4521C0 50.3612 12.5705 43.543 26.588 43.543C32.5567 43.543 38.1637 44.543 41.3289 45.8157L41.6002 59.1793H40.2437L32.0141 46.2702C30.5671 45.6339 29.301 45.4521 26.7689 45.4521C19.3532 45.4521 15.4644 54.0884 15.6453 68.2702C15.8262 85.2702 18.7201 92.9975 25.5932 92.9975C27.4019 92.9975 28.7584 92.7248 29.6628 92.2702V74.0884L25.141 71.4521V69.9975H47.0264V71.6339L42.5046 74.0884V91.9975C38.7967 93.4521 32.5567 94.8157 26.0454 94.8157C10.1288 94.9066 0 87.4521 0 69.4521Z"
        fill={props.fill || "#fff"}
      />
      <path
        d="M46.7549 60.5437V59.4528L61.4958 56.9073L63.1237 56.9982V86.0891C63.1237 89.6346 64.8419 90.6346 67.6454 90.6346C69.4541 90.6346 71.082 89.9073 72.4385 88.3619V62.3619L68.4594 60.6346V59.4528L83.1099 56.8164L84.5568 56.9073V90.271L88.536 91.9073V92.9982L74.0663 94.8164L72.6194 94.7255V90.3619H72.2576C69.5446 92.8164 65.8367 94.9982 61.2245 94.9982C54.1706 94.9982 51.0053 90.8164 51.0053 84.4528V62.3619L46.7549 60.5437Z"
        fill={props.fill || "#fff"}
      />
      <path
        d="M140.627 56.8164L141.803 56.9073V67.6346H142.165C143.702 59.7255 147.229 56.8164 151.389 56.8164C152.022 56.8164 152.836 56.9073 153.198 57.0891V68.18C152.565 67.9982 151.299 67.9073 150.214 67.9073C146.868 67.9073 144.426 68.5437 142.255 69.5437V90.8164L145.601 92.6346V93.9982H126.61V92.6346L130.047 90.7255V61.7255L126.067 60.5437V59.5437L140.627 56.8164Z"
        fill={props.fill || "#fff"}
      />
      <path
        d="M177.435 57.7241V46.3604L173.456 44.9059V43.9968L188.287 41.2695L189.734 41.4513V90.1786L193.804 91.6332V92.9059L179.153 94.9059L177.977 94.815V90.815H177.616C175.445 92.9968 172.551 94.9059 167.939 94.9059C159.981 94.9059 154.103 88.815 154.103 76.2695C154.103 63.0877 160.885 56.5423 171.104 56.5423C174.089 56.5423 176.35 57.0877 177.435 57.7241ZM177.435 88.9059V59.815C176.53 59.1786 175.807 58.4514 173.365 58.5423C169.386 58.7241 166.944 64.7241 166.944 75.4513C166.944 85.0877 168.663 90.4514 173.998 90.2695C175.536 90.1786 176.711 89.6332 177.435 88.9059Z"
        fill={props.fill || "#fff"}
      />
      <path
        d="M209.991 56.815L211.257 56.9059V90.7241L214.603 92.5423V93.9059H195.612V92.5423L199.048 90.6332V62.2695L194.979 60.6332V59.5423L209.991 56.815ZM211.347 47.6332C211.347 51.1786 208.363 53.9059 204.836 53.9059C201.219 53.9059 198.415 51.1786 198.415 47.6332C198.415 44.0877 201.219 41.2695 204.836 41.2695C208.363 41.2695 211.347 44.0877 211.347 47.6332Z"
        fill={props.fill || "#fff"}
      />
      <path
        d="M257.379 90.7266V61.9084L253.4 60.4538V59.0902L268.05 56.3629L269.497 56.4538V60.7266H269.859C273.024 57.9084 277.727 56.0902 282.339 56.0902C288.67 56.0902 291.564 59.0902 291.564 65.8175V90.5448L295 92.4538V93.8175H276.009V92.4538L279.445 90.5448V66.6357C279.445 62.9084 277.817 61.4538 274.833 61.4538C272.934 61.4538 271.306 61.9084 269.769 63.0902V90.8175L273.115 92.7266V94.0902H254.123V92.7266L257.379 90.7266Z"
        fill={props.fill || "#fff"}
      />
      <path
        d="M236.308 72.6346V67.8164C236.308 60.5437 234.77 58.18 230.248 58.18C229.706 58.18 229.254 58.271 228.711 58.271L220.753 69.0891H219.668V59.0891C223.104 57.9982 227.355 56.8164 233.052 56.8164C242.819 56.8164 248.426 59.5437 248.426 67.7255V91.271L251.953 92.18V93.0891C250.596 93.9073 247.793 94.7255 244.809 94.7255C240.016 94.7255 237.664 93.18 236.669 90.4528H236.308C234.228 93.271 231.334 94.8164 226.812 94.8164C221.024 94.8164 217.045 91.18 217.045 84.9073C217.045 78.8164 220.753 75.5437 228.44 74.0891L236.308 72.6346ZM236.308 88.9073V74.3619L233.866 74.5437C230.068 74.9073 228.621 77.3619 228.621 82.7255C228.621 88.6346 230.52 90.18 233.233 90.18C234.77 90.18 235.584 89.7255 236.308 88.9073Z"
        fill={props.fill || "#fff"}
      />
      <path
        d="M108.884 72.6346V67.8164C108.884 60.5437 107.346 58.18 102.825 58.18C102.282 58.18 101.83 58.271 101.287 58.271L93.3289 69.0891H92.2437V59.0891C95.6803 57.9982 99.9307 56.8164 105.628 56.8164C115.395 56.8164 121.002 59.5437 121.002 67.7255V91.271L124.529 92.18V93.0891C123.173 93.9073 120.369 94.7255 117.385 94.7255C112.592 94.7255 110.24 93.18 109.246 90.4528H108.884C106.804 93.271 103.91 94.8164 99.3881 94.8164C93.6002 94.8164 89.6211 91.18 89.6211 84.9073C89.6211 78.8164 93.3289 75.5437 101.016 74.0891L108.884 72.6346ZM108.884 88.9073V74.3619L106.442 74.5437C102.644 74.9073 101.197 77.3619 101.197 82.7255C101.197 88.6346 103.096 90.18 105.809 90.18C107.437 90.18 108.251 89.7255 108.884 88.9073Z"
        fill={props.fill || "#fff"}
      />
    </svg>
  </a>
);
