import { css, Global } from "@emotion/core";
import { DateRange } from "moment-range";
import React from "react";
import DateRangePicker, { OnSelectCallbackParam } from "react-daterange-picker";

const stateDefinitions = {
  available: {
    color: "white",
    label: "Available"
  },
  unavailable: {
    selectable: false,
    color: "#78818b",
    label: "Unavailable"
  }
};

export interface DatePickerProps {
  unavailableDates: DateRange[];
  selectedRange?: DateRange;
  onSelect: (range: OnSelectCallbackParam) => void;
}

export const DatePicker = (props: DatePickerProps) => (
  <>
    <DateRangePicker
      numberOfCalendars={2}
      minimumDate={new Date()}
      value={props.selectedRange}
      onSelect={props.onSelect}
      singleDateRange={true}
      showLegend={true}
      stateDefinitions={stateDefinitions}
      dateStates={props.unavailableDates.map(range => ({
        state: "unavailable",
        range
      }))}
      defaultState="available"
    />
    {/* <input type="date" value={props.selectedRange.start}/> */}
    <Global styles={css(cssHack)} />
    <Global
      styles={css(`
        .DateRangePicker__HalfDateStates {
          transform: none;
          right: 0;
        }
      `)}
    />
  </>
);

const cssHack = `.DateRangePicker {
  display: inline-block;
  margin-bottom: 10px;
  padding: 0;
  position: relative;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none; }
  .DateRangePicker__Legend {
    color: #52575e;
    font-size: 14px;
    line-height: 16px;
    list-style-type: none;
    margin: 20px 0;
    padding: 0; }
  .DateRangePicker__LegendItem {
    display: inline-block;
    margin: 0 20px; }
  .DateRangePicker__LegendItemColor {
    border-radius: 50%;
    display: inline-block;
    height: 14px;
    margin-right: 6px;
    vertical-align: text-bottom;
    width: 14px;
    border: 1px solid rgba(0, 0, 0, 0.25); }
    .DateRangePicker__LegendItemColor--selection {
      background-color: #ed5434; }
  .DateRangePicker__PaginationArrow {
    border: 0;
    cursor: pointer;
    display: block;
    height: 35px;
    outline: none;
    overflow: hidden;
    padding: 0;
    position: absolute;
    text-align: center;
    top: 0;
    white-space: nowrap;
    width: 35px;
    z-index: 1; }
    .DateRangePicker__PaginationArrow--previous {
      left: 20px; }
    .DateRangePicker__PaginationArrow--next {
      right: 20px; }
    .DateRangePicker__PaginationArrow:hover {
      background-color: #ccc; }
  .DateRangePicker__PaginationArrowIcon {
    border-bottom: 8px solid transparent;
    border-top: 8px solid transparent;
    height: 0;
    position: absolute;
    top: 10px;
    width: 0; }
    .DateRangePicker__PaginationArrowIcon--is-disabled {
      opacity: .25; }
    .DateRangePicker__PaginationArrowIcon--previous {
      border-left: 8px solid transparent;
      border-right: 8px solid #aaa;
      right: 11px; }
    .DateRangePicker__PaginationArrowIcon--next {
      border-left: 8px solid #aaa;
      border-right: 8px solid transparent;
      left: 11px; }
  .DateRangePicker__Month {
    color: #333;
    display: inline-block;
    margin: 0 20px;
    position: relative;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    width: 275px; }
  .DateRangePicker__MonthHeader {
    color: #000;
    font-size: 14px;
    font-weight: bold;
    height: 35px;
    line-height: 35px;
    position: relative;
    text-align: center; }
  .DateRangePicker__MonthHeaderLabel {
    display: inline-block;
    position: relative; }
  .DateRangePicker__MonthHeaderSelect {
    background: #e4e4e4;
    border: 0;
    cursor: pointer;
    display: inline-block;
    height: 100%;
    left: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 5; }
  .DateRangePicker__MonthDates {
    border-bottom: 1px solid #f4f5f6;
    border-collapse: separate;
    border-spacing: 0 1px;
    margin: 0;
    width: 100%; }
  .DateRangePicker__WeekdayHeading, .DateRangePicker__Date {
    font-size: 12px;
    line-height: 1;
    padding: 10px 0;
    text-align: center;
    width: 14.285714285714286%; }
  .DateRangePicker__WeekdayHeading {
    border-bottom: 1px solid #f4f5f6;
    color: #000;
    font-weight: bold; }
    .DateRangePicker__WeekdayHeading abbr[title] {
      border-bottom-width: 0;
      color: #000;
      cursor: pointer;
      font-size: inherit;
      text-decoration: none; }
  .DateRangePicker__Date {
    border: 0 solid #f4f5f6;
    border-right-width: 1px;
    cursor: pointer;
    overflow: hidden;
    position: relative; }
    .DateRangePicker__Date:first-child {
      border-left-width: 1px; }
    .DateRangePicker__Date--weekend {
      background-color: #f6f7f9; }
    .DateRangePicker__Date--otherMonth {
      opacity: .25; }
    .DateRangePicker__Date--is-disabled {
      color: #cdcdd1;
      cursor: default; }
    .DateRangePicker__Date--is-selected {
      color: #fff; }
    .DateRangePicker__Date--is-highlighted {
      color: #333; }
  .DateRangePicker__CalendarDatePeriod {
    bottom: 0;
    position: absolute;
    top: 0; }
    .DateRangePicker__CalendarDatePeriod--am {
      left: 0;
      right: 50%; }
    .DateRangePicker__CalendarDatePeriod--pm {
      left: 50%;
      right: 0; }
  .DateRangePicker__CalendarSelection {
    background-color: #ed5434;
    border: 1px solid #eb401d;
    bottom: 5px;
    left: 0;
    position: absolute;
    right: 0;
    top: 5px; }
    .DateRangePicker__CalendarSelection--inOtherMonth {
      opacity: .5; }
    .DateRangePicker__CalendarSelection--start {
      border-bottom-left-radius: 5px;
      border-right-width: 0;
      border-top-left-radius: 5px;
      left: 5px; }
    .DateRangePicker__CalendarSelection--end {
      border-bottom-right-radius: 5px;
      border-left-width: 0;
      border-top-right-radius: 5px;
      right: 5px; }
    .DateRangePicker__CalendarSelection--segment {
      border-left-width: 0;
      border-right-width: 0; }
    .DateRangePicker__CalendarSelection--single {
      border-radius: 5px;
      left: 5px;
      right: 5px; }
    .DateRangePicker__CalendarSelection--is-pending {
      background-color: rgba(237, 84, 52, 0.75);
      border-width: 0; }
  .DateRangePicker__CalendarHighlight {
    background-color: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(0, 0, 0, 0.25);
    bottom: 5px;
    left: 0;
    position: absolute;
    right: 0;
    top: 5px; }
    .DateRangePicker__CalendarHighlight--inOtherMonth {
      opacity: .5; }
    .DateRangePicker__CalendarHighlight--start {
      border-bottom-left-radius: 5px;
      border-right-width: 0;
      border-top-left-radius: 5px;
      left: 5px; }
    .DateRangePicker__CalendarHighlight--end {
      border-bottom-right-radius: 5px;
      border-left-width: 0;
      border-top-right-radius: 5px;
      right: 5px; }
    .DateRangePicker__CalendarHighlight--segment {
      border-left-width: 0;
      border-right-width: 0; }
    .DateRangePicker__CalendarHighlight--single {
      background-color: #fff;
      border: 1px solid #eb401d;
      border-radius: 5px;
      left: 5px;
      right: 5px; }
  .DateRangePicker__HalfDateStates {
    bottom: -50px;
    left: -50px;
    position: absolute;
    right: -50px;
    top: -50px;
    transform: rotate(30deg); }
  .DateRangePicker__FullDateStates {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0; }
  .DateRangePicker__DateLabel {
    display: block;
    position: relative;
    text-align: center;
    width: 100%;
    z-index: 1; }`;
