import { css } from "@emotion/core";
import React, { Component } from "react";
import { OnOffButton } from "./OnOffButton";
import { VendorItem } from "./VendorItem";

const collapsibleDivCSS = (collapsed: boolean) => css`
  display: ${collapsed ? "block" : "none"};
`;

const arrowDown = (
  <svg
    width="12"
    height="9"
    viewBox="-0.525 -4 24 18"
    overflow="visible"
    enable-background="new -0.525 -4 24 18"
  >
    <path d="M23.2.7L12.7 9.1l-1.1.9-1.1-.898L0 .7.5 0l11.1 6.3L22.7 0l.5.7z" />
  </svg>
);

interface Props {
  purpose: Purpose;
  updatePurpose: (updatedPurpose: Purpose) => void;
}

interface State {
  collapsed: boolean;
}

export class PurposeItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  public toggleCollapsed(): void {
    this.setState((state, props) => ({
      collapsed: !state.collapsed
    }));
  }

  public updatePurposeOnClick(newPurposeValue: boolean): void {
    this.props.updatePurpose({
      ...this.props.purpose,
      purposeValue: newPurposeValue
    });
  }

  public updateVendor(vendorId: number, newVendorValue: boolean): void {
    if (this.props.purpose.vendors && this.props.purpose.vendors[vendorId]) {
      this.props.updatePurpose({
        ...this.props.purpose,
        vendors: {
          ...this.props.purpose.vendors,
          [vendorId]: {
            ...this.props.purpose.vendors[vendorId],
            vendorValue: newVendorValue
          }
        }
      });
    }
  }

  public render(): React.ReactNode {
    const {
      label,
      purposeValue,
      description,
      hasButton,
      vendors
    } = this.props.purpose;
    const { collapsed } = this.state;

    return (
      <div>
        {/* Expand button */}
        <button
          onClick={() => {
            this.toggleCollapsed();
          }}
        >
          {arrowDown}
        </button>

        {/* Label */}
        {label}

        {/* On/Off button */}
        {hasButton && (
          <OnOffButton
            buttonValue={purposeValue}
            onClickHandler={(newPurposeValue: boolean) => {
              this.updatePurposeOnClick(newPurposeValue);
            }}
          />
        )}

        {/* Collapsible div */}
        <div css={collapsibleDivCSS(collapsed)}>
          {description}
          {vendors && this.renderVendors(vendors)}
        </div>
      </div>
    );
  }

  public renderVendors(vendors: VendorList): React.ReactNode | void {
    return Object.keys(vendors).map((key: string) => {
      const vendorId = parseInt(key, 10) as number;

      return (
        <VendorItem
          vendor={vendors[vendorId]}
          updateVendor={(newVendorValue: boolean): void => {
            this.updateVendor(vendorId, newVendorValue);
          }}
          key={vendorId}
        />
      );
    });
  }
}
