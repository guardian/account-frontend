import rawDateRangePickerCSS from "!!raw-loader!react-daterange-picker/dist/css/react-calendar.css";
import { css, Global } from "@emotion/core";
import { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import DateRangePicker, { OnSelectCallbackParam } from "react-daterange-picker";
import { DateInput, DateInputState } from "./dateInput";

const stateDefinitions = {
  available: {
    selectable: true,
    color: "white",
    label: ""
  },
  existing: {
    selectable: false,
    color: "#dcdcdc",
    label: "Existing holiday stops"
  }
};

export interface DatePickerProps {
  firstAvailableDate: Moment;
  issueDayOfWeek: number;
  existingDates: DateRange[];
  selectedRange?: DateRange;
  onSelect: (range: OnSelectCallbackParam) => void;
}

export interface DatePickerState {
  validationMessage?: string;
}

const adjustDateRangeToDisplayProperly = (range: DateRange) =>
  new DateRange(
    range.start.clone().subtract(1, "day"),
    range.end.clone().add(1, "day")
  );

const daysInYear = (firstDate: Moment) => (firstDate.isLeapYear() ? 366 : 365);

export class DatePicker extends React.Component<
  DatePickerProps,
  DatePickerState
> {
  public state: DatePickerState = {
    validationMessage: ""
  };

  public validationMsgCss = {
    height: "2rem",
    paddingTop: "0.5rem",
    fontWeight: "bold"
  };

  public render = () => (
    <>
      <DateRangePicker
        numberOfCalendars={2}
        minimumDate={this.props.firstAvailableDate.toDate()}
        maximumDate={this.props.firstAvailableDate
          .clone()
          .add(daysInYear(this.props.firstAvailableDate.clone()), "days")
          .toDate()}
        value={this.props.selectedRange}
        onSelect={this.props.onSelect}
        singleDateRange={true}
        showLegend={true}
        stateDefinitions={stateDefinitions}
        dateStates={[
          ...this.props.existingDates.map(range => ({
            state: "existing",
            range: adjustDateRangeToDisplayProperly(range)
          }))
        ].sort((a, b) => a.range.start.unix() - b.range.start.unix())}
        defaultState="available"
      />

      <div>
        <span>
          From:{" "}
          <DateInput
            selectedDate={
              this.props.selectedRange && this.props.selectedRange.start
            }
            defaultDate={this.props.firstAvailableDate}
          />
        </span>
        <span>
          {" "}
          To:{" "}
          <DateInput
            selectedDate={
              this.props.selectedRange && this.props.selectedRange.end
            }
            defaultDate={this.props.firstAvailableDate}
          />
        </span>
      </div>
      <div id="validation-message" role="alert" css={this.validationMsgCss}>
        {this.state.validationMessage}
      </div>

      <Global styles={css(rawDateRangePickerCSS)} />
      <Global
        styles={css(`
        .DateRangePicker {
          --selectedColour: #3db540;
          --grey: #f4f5f6;
        }
        .DateRangePicker__HalfDateStates {
          transform: none;
          right: 0;
          left: 50px;
          top: 0;
        }        
        .DateRangePicker__selection {
          background-color: var(--selectedColour);
        }       
        .DateRangePicker__CalendarSelection {
          background-color: var(--selectedColour);
          border: 3px solid darken(var(--selectedColour), 5);        
        }
        .DateRangePicker--is-pending {
          background-color: rgba(var(--selectedColour), .75);
        }
        .DateRangePicker__CalendarHighlight.DateRangePicker__CalendarHighlight--single {
          border: 1px solid var(--selectedColour);
        }
        .DateRangePicker__LegendItemColor--selection {
          background-color: var(--selectedColour);
        }
        .DateRangePicker__DateLabel {
          border: 1px solid darken(var(--selectedColour), 5);
        }
        td.DateRangePicker__Date {
          border-left-color: var(--grey);
          border-right-color: var(--grey);
        }
        .DateRangePicker__Date.DateRangePicker__Date--weekend {
          background-color: transparent;
        }
        .DateRangePicker__Week .DateRangePicker__Date:nth-of-type(${
          this.props.issueDayOfWeek
        })::after {

          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          background-color: red;
          transform: rotate(45deg);
          top: -7px;
          left: -7px;
      
      }
      `)}
      />
    </>
  );
  //       );
  //     } else if (this.props.selectedRange) {
  //       const potentialRange = isStartDate
  //         ? new DateRange(potentialDate, this.props.selectedRange.end)
  //         : new DateRange(this.props.selectedRange.start, potentialDate);
  //       if (potentialRange.start > potentialRange.end) {
  //         return this.setValidationMessage(
  //           `Please choose a${isStartDate ? " start" : "n end"} date ${
  //             isStartDate ? "before" : "after"
  //           } the ${isStartDate ? "end" : "start"} date`
  //         );
  //       } else {
  //         const overlaps = this.props.existingHolidayStops.filter(range =>
  //           potentialRange.overlaps(range)
  //         );
  //         if (overlaps.length) {
  //           return this.setValidationMessage(
  //             `Please choose dates that do not overlap your existing holiday stop${
  //               overlaps.length > 1 ? "s" : ""
  //             }`
  //           );
  //         } else {
  //           this.setValidationMessage("");
  //           return this.props.onSelect(potentialRange);
  //         }
  //       }
  //     } else {
  //       return this.setValidationMessage(
  //         `Please choose a valid ${isStartDate ? "end" : "start"} date`
  //       );
  //     }
  //   } else {
  //     return this.setValidationMessage(
  //       `Please choose a valid ${isStartDate ? "start" : "end"} date`
  //     );
  //   }
  // };
}
