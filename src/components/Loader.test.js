import React from "react";
import Loader from "./Loader";
import { render } from "@testing-library/react";

describe("Loader component", () => {
  test("Loading ", () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId("screenLoad")).toHaveClass("loader__container");
  });
});
