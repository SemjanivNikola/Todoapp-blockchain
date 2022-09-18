<template>
    <section class="todo-list">
        <h3>TODO LIST</h3>
        <div class="list" id="todo-list">
            <div
                v-for="(task, index) in taskList"
                :key="index"
                :class="`todo-item ${task.completed && 'done'}`"
            >
                <label>
                    <input type="checkbox" v-model="task.completed" @click="handleToggle(task.id)" />
                    <span
                        :class="`bubble ${
                            task.category == 'business'
                                ? 'business'
                                : 'personal'
                        }`"
                    ></span>
                </label>

                <div class="todo-content">
                    <input type="text" v-model="task.content" readonly />
                </div>

                <div class="actions">
                    <button class="delete" @click="removeTask(task.id)">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "TaskList",
    data() {
        return {
            loading: false,
        };
    },
    async created() {
        this.loading = true;
        await this.$store
            .dispatch("todoList/readTaskList", null, { root: true })
            .finally(() => {
                this.loading = false;
            });
    },
    methods: {
        handleToggle(id) {
            event.preventDefault(); // Preventing modification outside vuex

            this.$store.dispatch("todoList/handleToggle", id, {root: true})
        },
        removeTask(id) {
            this.$store.dispatch("todoList/handleDelete", id, {root: true})
        },
    },
    computed: {
        ...mapGetters({ taskList: "todoList/getTaskList" }),
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