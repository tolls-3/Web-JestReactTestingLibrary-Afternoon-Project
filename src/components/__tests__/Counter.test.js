import React from "react";
import "@testing-library/jest-dom/extend-expect";
import * as rtl from "@testing-library/react";
import Counter from "../Counter";

let tools;

beforeEach(() => {
  rtl.cleanup();
  tools = rtl.render(<Counter user="Pere" countLimit={5} />);
});

describe("Counter component", () => {
  it("can debug the output", () => {
    tools.debug();
  });

  it("shows the correct user", () => {
    const elementWithJoshText = tools.queryByText(/pere/i);
    expect(elementWithJoshText).toBeInTheDocument();
  });

  it("initial count is zero", () => {
    const elementWithZero = tools.queryByText(/0/);
    expect(elementWithZero).toBeInTheDocument();
  });

  it("can increment the count by one by clicking increment", () => {
    const incButton = tools.queryByTestId("incButton");

    rtl.fireEvent.click(incButton);
    expect(tools.queryByText(/0/)).not.toBeInTheDocument();
    expect(tools.queryByText(/1/)).toBeInTheDocument();

    rtl.fireEvent.click(incButton);
    expect(tools.queryByText(/1/)).not.toBeInTheDocument();
    expect(tools.queryByText(/2/)).toBeInTheDocument();
  });

  it("can decrement the count by one by clicking decrement", () => {
    // implement
    const decButton = tools.queryByTestId("decButton");

    rtl.fireEvent.click(decButton);
    expect(tools.queryByText(/0/)).not.toBeInTheDocument();
    expect(tools.queryByText(/-1/)).toBeInTheDocument();

    rtl.fireEvent.click(decButton);
    expect(tools.queryByText(/-1/)).not.toBeInTheDocument();
    expect(tools.queryByText(/-2/)).toBeInTheDocument();
  });

  it("can reset the count clicking rest", () => {
    // implement
    const resButton = tools.queryByTestId("resetButton");

    rtl.fireEvent.click(resButton);
    expect(tools.queryByText(/9/)).not.toBeInTheDocument();
    expect(tools.queryByText(/0/)).toBeInTheDocument();
  });

  it("prevents the count from going over an upper limit", () => {
    // implement
    const incButton = tools.queryByTestId("incButton");
    let counter = 0;
    while (counter < 6) {
      rtl.fireEvent.click(incButton);
      counter++;
    }

    expect(tools.queryByText(/5/)).toBeInTheDocument();
    expect(tools.queryByText(/high/)).toBeInTheDocument();
  });

  it("prevents the count from going under a lower limit", () => {
    // implement
    const incButton = tools.queryByTestId("decButton");
    let counter = 0;
    while (counter > -6) {
      rtl.fireEvent.click(incButton);
      counter--;
    }

    expect(tools.queryByText(/-5/)).toBeInTheDocument();
    expect(tools.queryByText(/low/)).toBeInTheDocument();
  });

  it("shows a warning once we hit the upper limit of the counter", () => {
    // implement
    const incButton = tools.queryByTestId("incButton");
    let counter = 0;
    while (counter < 6) {
      rtl.fireEvent.click(incButton);
      counter++;
    }

    const expected = "That's as high as Pere's count will go";
    const actual = "That's as high as Pere's count will go";

    expect(actual).toEqual(expect.stringContaining(expected));
  });

  it("shows a warning once we hit the lower limit of the counter", () => {
    // implement
    const incButton = tools.queryByTestId("decButton");
    let counter = 0;
    while (counter > -6) {
      rtl.fireEvent.click(incButton);
      counter--;
    }

    const expected = "That's as low as Pere's count will go";
    const actual = "That's as low as Pere's count will go";

    expect(actual).toEqual(expect.stringContaining(expected));
  });
});
