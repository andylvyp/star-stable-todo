/**
 * @jest-environment jsdom
 */

import React from "react";
import {
    render, screen, fireEvent, waitFor, getByRole,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoFilter, { SearchMode } from ".";

describe("Filter Component", () => {
    afterEach(() => jest.clearAllMocks());

    it("show/hide search field when clicking button", () => {
        const mockHandleSearch = jest.fn();
        render(
            <TodoFilter handleSearch={mockHandleSearch} />,
        );

        const searchButton = screen.getByTestId("search-button");
        const hiddenSearchBarContainer = screen.queryAllByTestId("search-bar-container");
        expect(hiddenSearchBarContainer).toHaveLength(0);
        fireEvent.click(searchButton);
        const visibleSearchBarContainer = screen.queryAllByTestId("search-bar-container");
        expect(visibleSearchBarContainer).toHaveLength(1);

        fireEvent.click(searchButton);
        const hiddenInputField = screen.queryAllByTestId("input-text-field");
        expect(hiddenInputField).toHaveLength(0);
        expect(mockHandleSearch).toHaveBeenCalledTimes(1);
        expect(mockHandleSearch).toHaveBeenCalledWith(SearchMode.all, "");
    });

    it("handle search function when change input/select", async () => {
        const mockHandleSearch = jest.fn();
        render(
            <TodoFilter handleSearch={mockHandleSearch} />,
        );

        const searchButton = screen.getByTestId("search-button");
        fireEvent.click(searchButton);
        const searchInput = screen.getByTestId("search-input-field");
        fireEvent.input(searchInput, { target: { value: "target" } });
        expect(mockHandleSearch).toHaveBeenCalledTimes(1);
        expect(mockHandleSearch).toHaveBeenCalledWith(SearchMode.all, "target");
        const searchSelect = screen.getByTestId("search-select");
        // eslint-disable-next-line
        userEvent.click(getByRole(searchSelect, "button"));
        // eslint-disable-next-line
        await waitFor(() => userEvent.click(screen.getByText(/Done/)));
        expect(mockHandleSearch).toHaveBeenCalledTimes(2);
        expect(mockHandleSearch).toHaveBeenCalledWith(SearchMode.done, "target");

        // eslint-disable-next-line
        userEvent.click(getByRole(searchSelect, "button"));
        // eslint-disable-next-line
        await waitFor(() => userEvent.click(screen.getByText(/Undone/)));
        expect(mockHandleSearch).toHaveBeenCalledTimes(3);
        expect(mockHandleSearch).toHaveBeenCalledWith(SearchMode.undone, "target");
    });
});
