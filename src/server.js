import React from "react";
import { createServer, Model } from "miragejs";

export default function makeServer() {
    createServer({
        models: {
            todo: Model,
        },

        seeds(server) {
            server.create("todo", { id: "1649088237672", text: "Go to supermarket", done: false });
            server.create("todo", { id: "1649088162548", text: "Send letters", done: true });
            server.create("todo", { id: "1649091263567", text: "Work out", done: false });
        },

        routes() {
            this.get("/api/todos", (schema) => schema.todos.all());

            this.post("/api/todos", (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                return schema.todos.create(attrs);
            });

            this.put("/api/todos/:id", (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                const { id } = request.params;
                this.db.todos.update({ id }, { done: attrs.done });
            });

            this.delete("/api/todos/:id", (schema, request) => {
                const { id } = request.params;
                return schema.todos.find(id).destroy();
            });
        },
    });
}
