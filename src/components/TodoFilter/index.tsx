import {
    Button, MenuItem, Select, TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./styles.module.scss";

export enum SearchMode {
    all,
    done,
    undone,
}

interface Props {
    handleSearch: (searchMode: SearchMode, searchText: string) => void;
}

export default function TodoFilter(props: Props) {
    const { handleSearch } = props;
    const [searchMode, setSearchMode] = useState<SearchMode>(SearchMode.all);
    const [searchText, setSearchText] = useState<string>("");
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSearchMode(event.target.value as SearchMode);
        handleSearch(event.target.value as SearchMode, searchText);
    };
    const handleInputChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSearchText(event.target.value as string);
        handleSearch(searchMode, event.target.value as string);
    };

    const handleSearchClick = () => {
        if (searchOpen === true) {
            handleSearch(SearchMode.all, "");
        }
        setSearchOpen(!searchOpen);
        setSearchMode(SearchMode.all);
        setSearchText("");
    };

    return (
        <div className={styles.searchContainer}>
            <Button style={{ width: "30px", height: "30px", minWidth: "unset" }} onClick={handleSearchClick} data-testid="search-button">
                <SearchIcon />
            </Button>

            {searchOpen
                && (
                    <div data-testid="search-bar-container">
                        <Select
                            value={searchMode}
                            label="search-mode"
                            onChange={handleSelectChange}
                            defaultValue={SearchMode.all}
                            data-testid="search-select"
                        >
                            <MenuItem value={SearchMode.all} data-testid="select-all">All</MenuItem>
                            <MenuItem value={SearchMode.done} data-testid="select-done">Done</MenuItem>
                            <MenuItem value={SearchMode.undone} data-testid="select-undone">Undone</MenuItem>
                        </Select>
                        <TextField
                            placeholder="Search"
                            onChange={handleInputChange}
                            className={styles.searchTextField}
                            value={searchText}
                            inputProps={{ "data-testid": "search-input-field" }}
                        />
                    </div>
                )}
        </div>
    );
}
