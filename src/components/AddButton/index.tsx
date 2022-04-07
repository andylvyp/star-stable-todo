import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
    IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import styles from "./styles.module.scss";

export interface TodoProps {
    id: string;
    text: string;
    done: boolean;
}

interface Props {
    handleSubmit: (inputText: string) => void;
}

export default function AddButton(props: Props) {
    const { handleSubmit } = props;
    const [inputOpen, setInputOpen] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");

    const handleInput = () => {
        handleSubmit(inputText);
        setInputText("");
        setInputOpen(false);
    };

    return (
        <List>
            <ListItem style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
                <ListItemIcon onClick={() => setInputOpen(!inputOpen)} data-testid="add-button">
                    <AddIcon style={{ transform: inputOpen ? "rotate(45deg)" : "" }} className={styles.addButton} />
                </ListItemIcon>

                {!inputOpen
                    && <ListItemText primary={<span onClick={() => setInputOpen(!inputOpen)} style={{ cursor: "pointer", width: "100%", display: "inline-table" }}>Add a todo</span>} primaryTypographyProps={{ style: { color: "rgba(0, 0, 0, 0.54)", lineHeight: "32px" } }} />}

                {inputOpen
                    && (
                        <ListItemText primary={(
                            <TextField
                                autoFocus
                                onChange={(e) => {
                                    setInputText(e.target.value);
                                }}
                                style={{ width: "90%" }}
                                inputProps={{ "data-testid": "input-text-field" }}
                            />
                        )}
                        />
                    )}

                {inputOpen
                    && (
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" disabled={inputText === ""} onClick={handleInput} data-testid="submit-button">
                                <CheckIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    )}
            </ListItem>
        </List>
    );
}
