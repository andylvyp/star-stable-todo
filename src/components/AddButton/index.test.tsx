/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddButton from ".";

describe("AddButton component", () => {
    it("show/hide input field when clicking button", () => {
        const mockHandleSubmit = jest.fn();
        render(
            <AddButton handleSubmit={mockHandleSubmit} />,
        );
        const addButton = screen.getByTestId("add-button");
        const hiddenInputField = screen.queryAllByTestId("input-text-field");
        expect(hiddenInputField).toHaveLength(0);
        fireEvent.click(addButton);
        const visibleInputField = screen.queryAllByTestId("input-text-field");
        expect(visibleInputField).toHaveLength(1);
    });

    it("handle submit properly", () => {
        const mockHandleSubmit = jest.fn();
        render(
            <AddButton handleSubmit={mockHandleSubmit} />,
        );
        const addButton = screen.getByTestId("add-button");
        fireEvent.click(addButton);
        const visibleInputField = screen.getByTestId("input-text-field");
        fireEvent.input(visibleInputField, { target: { value: "target" } });
        const submitButton = screen.getByTestId("submit-button");
        fireEvent.click(submitButton);
        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
        expect(mockHandleSubmit).toHaveBeenCalledWith("target");
    });
});
