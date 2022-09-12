<template>
    <main class="app">
        <section class="greeting">
            <h2 class="title">
                Your address,
                <input
                    type="text"
                    id="name"
                    placeholder="address is here"
                    v-model="name"
                />
            </h2>
        </section>

        <section class="create-todo">
            <h3>CREATE AN ITEM</h3>

            <form id="new-todo-form" @submit.prevent="addTodo">
                <h4>What's on your todo list?</h4>
                <input
                    type="text"
                    name="content"
                    id="content"
                    placeholder="e.g. do a homework"
                    v-model="inputContent"
                />

                <h4>Pick a category</h4>
                <div class="options">
                    <label>
                        <input
                            type="radio"
                            name="category"
                            id="category1"
                            value="business"
                            v-model="inputCategory"
                        />
                        <span class="bubble business"></span>
                        <div>Business</div>
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="category"
                            id="category2"
                            value="personal"
                            v-model="inputCategory"
                        />
                        <span class="bubble personal"></span>
                        <div>Personal</div>
                    </label>
                </div>

                <input type="submit" value="Add item" />
            </form>
        </section>

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
    </main>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            todos: [],
            name: "",
            inputContent: "",
            inputCategory: "business",
        };
    },
    watch: {
        name: (val) => {
            localStorage.setItem("name", val);
        },
        todos: {
            handler(val) {
                localStorage.setItem("todos", JSON.stringify(val));
            },
            deep: true,
        },
    },
    methods: {
        addTodo() {
            if (
                this.inputContent.trim() === "" ||
                this.inputCategory === null
            ) {
                return;
            }

            this.todos.push({
                content: this.inputContent,
                category: this.inputCategory,
                done: false,
            });

            this.inputContent = "";
        },
        removeTodo(todo) {
            this.todos = this.todos.filter((t) => t !== todo);
        },
        onMounted() {
            this.name = localStorage.getItem("name") || "";
            this.todos = JSON.parse(localStorage.getItem("todos")) || [];
        },
    },
};
</script>

<style>
input:not([type="radio"]):not([type="checkbox"]),
button {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    cursor: initial;
}
section {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-left: 1.5rem;
    padding-right: 1.5em;
}
h3 {
    color: var(--dark);
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
}

h4 {
    color: var(--grey);
    font-size: 0.875rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.greeting .title {
    display: flex;
}

.greeting .title input {
    margin-left: 0.5rem;
    flex: 1 1 0%;
    min-width: 0;
}

.greeting .title,
.greeting .title input {
    color: var(--dark);
    font-size: 1.5rem;
    font-weight: 700;
}

.create-todo input[type="text"] {
    display: block;
    width: 100%;
    font-size: 1.125rem;
    padding: 1rem 1.5rem;
    color: var(--dark);
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    margin-bottom: 1.5rem;
}

.create-todo .options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-bottom: 1.5rem;
}

.create-todo .options label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    cursor: pointer;
}

input[type="radio"],
input[type="checkbox"] {
    display: none;
}

.bubble {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--business);
    box-shadow: var(--business-glow);
}

.bubble.personal {
    border-color: var(--personal);
    box-shadow: var(--personal-glow);
}

.bubble::after {
    content: "";
    display: block;
    opacity: 0;
    width: 0px;
    height: 0px;
    background-color: var(--business);
    box-shadow: var(--business-glow);
    border-radius: 50%;
    transition: 0.2s ease-in-out;
}

.bubble.personal::after {
    background-color: var(--personal);
    box-shadow: var(--personal-glow);
}

input:checked ~ .bubble::after {
    width: 10px;
    height: 10px;
    opacity: 1;
}

.create-todo .options label div {
    color: var(--dark);
    font-size: 1.125rem;
    margin-top: 1rem;
}

.create-todo input[type="submit"] {
    display: block;
    width: 100%;
    font-size: 1.125rem;
    padding: 1rem 1.5rem;
    color: #fff;
    background-color: var(--primary);
    border-radius: 0.5rem;
    box-shadow: var(--personal-glow);
    cursor: pointer;
    transition: 0.2s ease-in-out;
}

.create-todo input[type="submit"]:hover {
    opacity: 0.75;
}

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