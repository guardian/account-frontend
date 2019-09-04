import rawDateRangePickerCSS from "!!raw-loader!react-daterange-picker/dist/css/react-calendar.css";
import { css, Global } from "@emotion/core";
import { Moment } from "moment";
import React from "react";
import DateRangePicker, {
  PaginationArrowProps,
  Props
} from "react-daterange-picker";
import palette from "../colours";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { sans } from "../styles/fonts";
import { Button } from "./buttons";

const gridBorderCssValue = `1px solid ${palette.neutral["5"]} !important;`;

const iconDayPseudoAfterCss = `
::after {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  background-color: ${palette.blue.dark};
  transform: rotate(45deg);
  top: -7px;
  left: -7px;
}
`;

const CustomArrow = (props: PaginationArrowProps) => (
  <div
    css={{
      zIndex: 999,
      position: "absolute",
      padding: "8px",
      top: 0,
      ...(props.direction === "previous"
        ? {
            left: 0
          }
        : {
            right: 0
          })
    }}
  >
    <Button
      text=""
      left={props.direction === "previous" ? true : undefined}
      right={props.direction === "next" ? true : undefined}
      disabled={props.disabled}
      onClick={props.onTrigger}
      forceCircle
    />
  </div>
);

const classNameForAddingAsterisk = "day-asterisk";

const elementsByClass = (className: string, searchWithin?: Element) =>
  Array.from((searchWithin || document).getElementsByClassName(className));

// this is a bit nasty but is necessary to bold today's date. works on the assumption minimum date will always be
// after today and so can safely just find all the disabled days and bold the one matching today's day of the month
const emboldenTodaysDate = () =>
  elementsByClass("DateRangePicker__Date--is-disabled")
    .filter(dayCell => dayCell.textContent === `${new Date().getDate()}`)
    .forEach(dayCell => dayCell.setAttribute("style", "font-weight:900"));

const asteriskDate = (dateToAsterisk: Moment | undefined) =>
  dateToAsterisk &&
  elementsByClass("DateRangePicker__Month")
    .filter(monthDiv =>
      elementsByClass(
        "DateRangePicker__MonthHeaderLabel--month",
        monthDiv
      ).find(
        monthLabel =>
          !!monthLabel.textContent &&
          monthLabel.textContent.startsWith(dateToAsterisk.format("MMMM"))
      )
    )
    .forEach(monthDiv =>
      elementsByClass("DateRangePicker__DateLabel", monthDiv)
        .filter(dayCell => dayCell.textContent === dateToAsterisk.format("D"))
        .forEach(dayCell => dayCell.classList.add(classNameForAddingAsterisk))
    );

const afterRenderActions = (props: WrappedDateRangePickerProps) => {
  emboldenTodaysDate();
  asteriskDate(props.dateToAsterisk);
};

class HackedDateRangePicker extends DateRangePicker {
  public componentDidMount(): void {
    if (super.componentDidMount) {
      super.componentDidMount();
    }
    afterRenderActions(this.props as WrappedDateRangePickerProps);
    this.preventJumpingToSelection();
  }

  public componentDidUpdate(
    prevProps: Readonly<Props<DateRangePicker>>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (super.componentDidUpdate) {
      super.componentDidUpdate(prevProps, prevState, snapshot);
    }
    afterRenderActions(this.props as WrappedDateRangePickerProps);
    // only prevent jumping on the update related to value changing, otherwise laggy
    if (prevProps.value !== this.props.value) {
      this.preventJumpingToSelection();
    }
  }

  private preventJumpingToSelection = () => {
    if (this.props.numberOfCalendars && this.props.numberOfCalendars > 2) {
      const today = new Date();
      this.setState({
        year: today.getFullYear(),
        month: today.getMonth()
      });
    }
  };
}

export interface WrappedDateRangePickerProps extends Props {
  dateToAsterisk?: Moment;
  dayOfWeekToIconify: number;
}

export const WrappedDateRangePicker = (props: WrappedDateRangePickerProps) => (
  <>
    <div css={{ [maxWidth.phablet]: { display: "none" } }}>
      <HackedDateRangePicker
        {...props}
        numberOfCalendars={2}
        paginationArrowComponent={CustomArrow}
        ref={undefined /* hushes type warning */}
      />
    </div>
    <div
      css={{ [minWidth.phablet]: { display: "none" } }}
      onTouchStartCapture={e => e.stopPropagation()}
    >
      <HackedDateRangePicker
        {...props}
        numberOfCalendars={13}
        paginationArrowComponent={() => null}
        disableNavigation={true}
        ref={undefined /* hushes type warning */}
      />
    </div>
    <Global styles={css(rawDateRangePickerCSS)} />
    <Global
      styles={css(`
    
        .${classNameForAddingAsterisk}::after {
          content: "*";
          display: inline-block;
          position: absolute;
          top: -3px;
          padding-left: 2px;
          font-weight: bold;
        }
    
        .DateRangePicker {
          --selectedBackgroundColour: ${palette.yellow.medium};
          --selectedTextColour: #333;
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .DateRangePicker__HalfDateStates {
          display: none; /* Safe to hide half dates, because we already adjust the dates - see adjustDateRangeToOvercomeHalfDateStates function */
        }        
        .DateRangePicker__Date--is-selected {
          color: var(--selectedTextColour);
        }
        .DateRangePicker__selection {
          background-color: var(--selectedBackgroundColour);
        }       
        .DateRangePicker__CalendarSelection {
          background-color: var(--selectedBackgroundColour);
          border: 3px solid darken(var(--selectedBackgroundColour), 5); 
        }
        .DateRangePicker--is-pending {
          background-color: rgba(var(--selectedBackgroundColour), .75);
        }
        .DateRangePicker__CalendarHighlight.DateRangePicker__CalendarHighlight--single {
          border: 1px solid var(--selectedBackgroundColour);
        }
        .DateRangePicker__DateLabel {
          border: 1px solid darken(var(--selectedBackgroundColour), 5);
        }
        .DateRangePicker__WeekdayHeading {
          border-bottom: ${gridBorderCssValue}
        }
        .DateRangePicker__Date {
          border: ${gridBorderCssValue}
          font-family: ${sans};
          font-size: 16px;
          line-height: 1.5;
        }
        .DateRangePicker__Date.DateRangePicker__Date--weekend {
          background-color: transparent;
        }
        .DateRangePicker__Week .DateRangePicker__Date:nth-of-type(${
          props.dayOfWeekToIconify
        })${iconDayPseudoAfterCss}
        .DateRangePicker__MonthDates {
          border-collapse: collapse;
        }
        .DateRangePicker__Month {
          margin: 0;
        }
        ${minWidth.phablet} { 
          .DateRangePicker__Month {
            width: calc(50% - 10px);
          }
        }
        ${maxWidth.phablet} { 
          .DateRangePicker__Month {
            width: 100%;
            margin-bottom: 10px;
          }
        }
        .DateRangePicker__MonthHeader {
          font-size: 16px;
        }
        .DateRangePicker__Weekend {
          font-size: 16px;
        }
        .DateRangePicker__Weekdays {
          border-left: ${gridBorderCssValue}
          border-right: ${gridBorderCssValue}
        }
        .DateRangePicker__MonthHeader {
          border-top: ${gridBorderCssValue}
          border-left: ${gridBorderCssValue}
          border-right: ${gridBorderCssValue}
          height: auto;
          padding-top: 8px;
          padding-bottom: 5px;
        }
      `)}
    />
  </>
);