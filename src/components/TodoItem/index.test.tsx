/**
 * @jest-environment jsdom
 */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TodoItem from ".";
import { TodoProps } from "../AddButton";

describe("Filter Component", () => {
    afterEach(() => jest.clearAllMocks());
    it("Handle toggle and delete when clicking button", () => {
        const mockHandleDelete = jest.fn();
        const mockHandleToggle = jest.fn();
        const fakeData: TodoProps = {
            id: (new Date()).valueOf().toString(),
            text: "target",
            done: true,
        };

        render(
            <TodoItem value={fakeData} index={1} handleDelete={mockHandleDelete} handleToggle={mockHandleToggle} />,
        );
        const toggleButton = screen.getByTestId("toggle-button");
        fireEvent.click(toggleButton);
        expect(mockHandleToggle).toHaveBeenCalledTimes(1);
        expect(mockHandleToggle).toHaveBeenCalledWith(fakeData.id);
        fireEvent.click(toggleButton);
        expect(mockHandleToggle).toHaveBeenCalledTimes(2);
        expect(mockHandleToggle).toHaveBeenCalledWith(fakeData.id);

        const deletButton = screen.getByTestId("delete-button");
        fireEvent.click(deletButton);
        expect(mockHandleDelete).toHaveBeenCalledTimes(1);
        expect(mockHandleDelete).toHaveBeenCalledWith(fakeData.id);
    });
});
