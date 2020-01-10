import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { RecordStatus } from "../../../../components/delivery/records/deliveryRecordStatus";

Enzyme.configure({ adapter: new Adapter() });

describe("DeliveryRecordStatus", () => {
  it("renders dispatched status", () => {
    const wrapper = mount(
      <RecordStatus
        isDispatched={true}
        isHolidayStop={false}
        isChangedAddress={false}
        deliveryProblem={null}
      />
    );
    expect(
      wrapper
        .find("span")
        .at(0)
        .text()
    ).toEqual("Dispatched");
  });
  it("renders holiday stop status", () => {
    const wrapper = mount(
      <RecordStatus
        isDispatched={false}
        isHolidayStop={true}
        isChangedAddress={false}
        deliveryProblem={null}
      />
    );
    expect(
      wrapper
        .find("span")
        .at(0)
        .text()
    ).toEqual("Holiday Stop");
  });

  it("renders delivery problem status", () => {
    const wrapper = mount(
      <RecordStatus
        isDispatched={false}
        isHolidayStop={false}
        isChangedAddress={false}
        deliveryProblem={"uh oh!"}
      />
    );
    expect(
      wrapper
        .find("span")
        .at(0)
        .text()
    ).toEqual("Delivery problem");
  });
});
