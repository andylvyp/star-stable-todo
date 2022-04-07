import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {
    Checkbox, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
} from "@material-ui/core";
import { TodoProps } from "../AddButton";

interface Props {
    value: TodoProps;
    index: number;
    handleDelete: (id: string) => void;
    handleToggle: (id: string) => void;
}

export default function TodoItem(props: Props) {
    const {
        value, index, handleDelete, handleToggle,
    } = props;
    return (
        <ListItem key={index}>
            <ListItemIcon onClick={() => handleToggle(value.id)}>
                <Checkbox
                    color="primary"
                    edge="start"
                    checked={value.done}
                    tabIndex={-1}
                    disableRipple
                    data-testid="toggle-button"
                />
            </ListItemIcon>
            <ListItemText
                id={`todo-list-item-${index}`}
                primary={value.text}
                primaryTypographyProps={{
                    style: {
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "90%",
                    },
                }}
            />
            <ListItemSecondaryAction onClick={() => handleDelete(value.id)}>
                <IconButton edge="end" aria-label="delete" data-testid="delete-button">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
