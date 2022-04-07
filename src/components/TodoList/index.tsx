import React, { useEffect, useState } from "react";
import { List } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddButton, { TodoProps } from "../AddButton";
import styles from "./styles.module.scss";
import TodoFilter, { SearchMode } from "../TodoFilter";
import TodoItem from "../TodoItem";

export default function TodoList() {
    const [todoData, setTodoData] = useState<TodoProps[]>([]);
    const [filteredData, setFilteredData] = useState<TodoProps[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const errorMessage = "Something is wrong with the connection.";

    useEffect(() => {
        fetch("/api/todos").then((res) => res.json()).then((json) => {
            setTodoData(json.todos);
            setFilteredData(json.todos);
        }).catch((e) => {
            setIsError(true);
            console.error(e);
        });
    }, []);

    const handleToggle = (id: string): void => {
        const modifiedData = todoData.filter((item) => item.id === id);
        fetch(`/api/todos/${id}`, { method: "PUT", body: JSON.stringify({ done: !modifiedData[0].done }) }).catch((e) => {
            setIsError(true);
            console.error(e);
        });
        const todoDataTemp = todoData;
        todoDataTemp.forEach((item) => {
            if (item.id === id) {
                item.done = !item.done;
            }
        });
        setTodoData([...todoDataTemp]);
    };

    const handleDelete = (id: string): void => {
        fetch(`/api/todos/${id}`, { method: "DELETE" }).catch((e) => {
            setIsError(true);
            console.error(e);
        });
        const todoDataTemp = todoData.filter((item) => item.id !== id);
        setTodoData([...todoDataTemp]);
        const filteredDataTemp = filteredData.filter((item) => item.id !== id);
        setFilteredData([...filteredDataTemp]);
    };

    const handleSubmit = (inputText: string) => {
        fetch("/api/todos", {
            method: "POST",
            body: JSON.stringify({
                id: (new Date()).valueOf().toString(),
                text: inputText,
                done: false,
            }),
        }).then((res) => res.json()).then((json) => {
            setTodoData([...todoData, json.todo]);
            setFilteredData([...filteredData, json.todo]);
        }).catch((e) => {
            setIsError(true);
            console.error(e);
        });
    };

    const handleSearch = (searchMode: SearchMode, searchText: string) => {
        let filterDataTemp: TodoProps[];
        switch (searchMode) {
        case SearchMode.all:
            filterDataTemp = todoData;
            break;
        case SearchMode.done:
            filterDataTemp = todoData.filter((item) => item.done === true);
            break;
        case SearchMode.undone:
            filterDataTemp = todoData.filter((item) => item.done === false);
            break;
        }
        if (searchText) {
            filterDataTemp = filterDataTemp.filter((item) => item.text.indexOf(searchText) !== -1);
        }

        setFilteredData([...filterDataTemp]);
    };

    return (
        <div className={styles.background}>
            <Alert severity="error" className={styles.errorPopup} style={{ top: isError ? "10px" : "-50px" }}>
                {errorMessage}
            </Alert>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>Todo List</div>
                    <TodoFilter handleSearch={handleSearch} />
                </div>
                <AddButton handleSubmit={handleSubmit} />
                <div className={styles.listWrapper}>
                    <List className={styles.listContainer}>
                        {filteredData.map((value, index) => <TodoItem key={`item-${index}`} value={value} index={index} handleDelete={handleDelete} handleToggle={handleToggle} />)}
                    </List>
                </div>
            </div>
        </div>
    );
}
