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
});

describe("### BEHAVIOR", () => {
  //Mock window.scrollTo function
  window.scrollTo = jest.fn();

  //Simulate SentientScroller being used in a component that has scroll
  const content = ({
    positionThreshold = 0,
    behavior = "sequential",
  }: {
    positionThreshold?: number;
    behavior?: "sequential" | "static";
  }) => (
    <div style={{ height: 100, overflow: "auto" }}>
      <SentientScroller
        timeThreshold={2000}
        positionThreshold={positionThreshold}
        behavior={behavior}
      >
        <div style={{ height: 1000 }}>Scrollable Content</div>
      </SentientScroller>
    </div>
  );

  it("Should not store positions if time threshold is not met", () => {
    const { queryByTestId } = render(content({}));

    //Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    const scrollButton = queryByTestId("scroll-button");
    expect(scrollButton).toBeNull();
  });

  it("Should not store positions if position threshold is not met", () => {
    const { queryByTestId } = render(content({ positionThreshold: 100 }));

    //Simulate scroll - First position will always be stored
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    act(() => {
      //Simulate 2s threshold
      jest.runAllTimers();
    });

    //Simulate scroll - This should not be stored as it does not meet the threshold
    fireEvent.scroll(window, { target: { scrollY: 150 } });

    act(() => {
      //Simulate 2s threshold
      jest.runAllTimers();
    });

    const scrollButton = queryByTestId("scroll-button");
    expect(scrollButton).toBeTruthy();

    //Call should match moving back to 100
    scrollButton?.click();
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 100,
      behavior: "smooth",
    });

    //Call should be undefined, because position 150 shouldn't have been stored
    scrollButton?.click();
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: undefined,
      behavior: "smooth",
    });
  });

  describe("### SEQUENTIAL", () => {
    it("Should move user in sequential order", () => {
      const { queryByTestId } = render(content({}));

      //Simulate scroll - First position stored
      fireEvent.scroll(window, { target: { scrollY: 100 } });

      act(() => {
        //Simulate 2s threshold
        jest.runAllTimers();
      });

      //Simulate scroll - Second position stored
      fireEvent.scroll(window, { target: { scrollY: 150 } });

      act(() => {
        //Simulate 2s threshold
        jest.runAllTimers();
      });

      //Simulate scroll - Position user in neither of the stored positions
      fireEvent.scroll(window, { target: { scrollY: 200 } });
      expect(window.scrollY).toEqual(200);

      const scrollButton = queryByTestId("scroll-button");
      expect(scrollButton).toBeTruthy();

      //Call should match moving back to 150
      scrollButton?.click();
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 150,
        behavior: "smooth",
      });

      //Call should match moving back to 100
      scrollButton?.click();
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 100,
        behavior: "smooth",
      });

      //Call should match moving back to 150
      scrollButton?.click();
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 150,
        behavior: "smooth",
      });

      //Call should match moving back to 100
      scrollButton?.click();
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 100,
        behavior: "smooth",
      });
    });
  });

  describe("### STATIC ", () => {
    it("Should move user in static order", () => {
      const { queryByTestId } = render(content({ behavior: "static" }));

      //Simulate scroll - First position stored
      fireEvent.scroll(window, { target: { scrollY: 100 } });

      act(() => {
        //Simulate 2s threshold
        jest.runAllTimers();
      });

      //Simulate scroll - Second position stored
      fireEvent.scroll(window, { target: { scrollY: 150 } });

      act(() => {
        //Simulate 2s threshold
        jest.runAllTimers();
      });

      //Simulate scroll - Position user in neither of the stored positions
      fireEvent.scroll(window, { target: { scrollY: 200 } });
      expect(window.scrollY).toEqual(200);

      const scrollButton = queryByTestId("scroll-button");
      expect(scrollButton).toBeTruthy();

      //Call should match moving back to 100
      scrollButton?.click();
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 100,
        behavior: "smooth",
      });

      //Call should match moving back to 150
      scrollButton?.click();
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 150,
        behavior: "smooth",
      });

      //Call should match moving back to 100
      scrollButton?.click();
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 100,
        behavior: "smooth",
      });

      //Call should match moving back to 150
      scrollButton?.click();
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 150,
        behavior: "smooth",
      });
    });
  });
});
