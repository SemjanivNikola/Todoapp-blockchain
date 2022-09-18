<template>
    <section class="todo-list">
        <h3>TODO LIST</h3>
        <div class="list" id="todo-list">
            <div
                v-for="(todo, index) in todos"
                :key="index"
                :class="`todo-item ${todo.done && 'done'}`"
            >
                <label>
                    <input type="checkbox" v-model="todo.done" />
                    <span
                        :class="`bubble ${
                            todo.category == 'business'
                                ? 'business'
                                : 'personal'
                        }`"
                    ></span>
                </label>

                <div class="todo-content">
                    <input type="text" v-model="todo.content" />
                </div>

                <div class="actions">
                    <button class="delete" @click="removeTodo(todo)">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "TaskList",
    data() {
        return {
            todos: []
        };
    },
    methods: {
        removeTodo(todo) {
            this.todos = this.todos.filter((t) => t !== todo);
        },
    },
};
</script>

<style scoped>
.todo-list .list {
    margin: 1rem 0;
}

.todo-list .todo-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    margin-bottom: 1rem;
}

.todo-item label {
    display: block;
    margin-right: 1rem;
    cursor: pointer;
}

.todo-item .todo-content {
    flex: 1 1 0%;
}

.todo-item .todo-content input {
    color: var(--dark);
    font-size: 1.125rem;
}

.todo-item .actions {
    display: flex;
    align-items: center;
}

.todo-item .actions button {
    display: block;
    padding: 0.5rem;
    border-radius: 0.25rem;
    color: #fff;
    cursor: pointer;
    transition: 0.2s ease-in-out;
}

.todo-item .actions button:hover {
    opacity: 0.75;
}

.todo-item .actions .edit {
    margin-right: 0.5rem;
    background-color: var(--primary);
}

.todo-item .actions .delete {
    background-color: var(--danger);
}

.todo-item.done .todo-content input {
    text-decoration: line-through;
    color: var(--grey);
}
</style>