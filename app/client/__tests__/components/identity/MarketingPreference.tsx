import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { create } from "react-test-renderer";
import { MarketingPreference } from "../../../components/identity/MarketingPreference";

afterEach(cleanup);

describe("MarketingPreference component", () => {
  const input = {
    id: "13",
    description: "Test description",
    frequency: "Test frequency",
    title: "Test title",
    clickHandler: jest.fn(),
    identityName: "Test-13"
  };
  it("renders correctly and displays marketing information", () => {
    const rendered = create(
      <MarketingPreference
        id={input.id}
        description={input.description}
        frequency={input.frequency}
        identityName={input.identityName}
        title={input.title}
        onClick={input.clickHandler}
      />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("will select the checkbox when the selected prop is passed", () => {
    const rendered = create(
      <MarketingPreference
        id={input.id}
        description={input.description}
        frequency={input.frequency}
        identityName={input.identityName}
        title={input.title}
        selected={true}
        onClick={input.clickHandler}
      />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("will omit the frequency information if it is not supplied", () => {
    const rendered = create(
      <MarketingPreference
        id={input.id}
        description={input.description}
        identityName={input.identityName}
        title={input.title}
        selected={true}
        onClick={input.clickHandler}
      />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("will omit the identityName/data-link-name information if it is not supplied", () => {
    const rendered = create(
      <MarketingPreference
        id={input.id}
        description={input.description}
        title={input.title}
        selected={true}
        onClick={input.clickHandler}
      />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("will call the click handler when it is clicked", () => {
    const { getByText } = render(
      <MarketingPreference
        id={input.id}
        description={input.description}
        frequency={input.frequency}
        identityName={input.identityName}
        title={input.title}
        onClick={input.clickHandler}
      />
    );
    fireEvent.click(getByText(input.title));
    expect(input.clickHandler).toHaveBeenCalledTimes(1);
    expect(input.clickHandler).toHaveBeenLastCalledWith(input.id);
  });
});
