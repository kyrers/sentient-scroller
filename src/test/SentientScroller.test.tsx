import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { SentientScroller } from "../index";

describe("### RENDER", () => {
  it("Should render without errors", () => {
    render(<SentientScroller timeThreshold={2000} />);
  });

  it("Should render children", () => {
    const { getByTestId } = render(
      <SentientScroller timeThreshold={2000}>
        <div data-testid="child-component">Child Component</div>
      </SentientScroller>
    );

    const childComponent = getByTestId("child-component");
    expect(childComponent).toBeTruthy();
  });

  it("Should not render scroll-button by default", () => {
    const { queryByTestId } = render(<SentientScroller timeThreshold={2000} />);

    const scrollButton = queryByTestId("scroll-button");
    expect(scrollButton).toBeNull();
  });

  it("Should render scroll-button after storing positions", () => {
    const { getByTestId } = render(<SentientScroller timeThreshold={2000} />);

    //Simulate stored positions
    fireEvent.scroll(window, { target: { pageYOffset: 100 } });

    act(() => {
      //Simulate 2s threshold
      jest.runAllTimers();
    });

    const scrollButton = getByTestId("scroll-button");
    expect(scrollButton).toBeTruthy();
  });
});
