<template>
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
</template>

<script>
export default {
    name: "CreateForm",
    data() {
        return {
            inputContent: "",
            inputCategory: "business",
        };
    },
    methods: {
        addTodo() {
            if (
                this.inputContent.trim() === "" ||
                this.inputCategory === null
            ) {
                alert("Can not submit empty item.");
                return;
            }

            const res = this.$store.dispatch("todoList/handleCreateTask", {
                content: this.inputContent,
                category: this.inputCategory,
            }, {root: true});

            if (res) {
                this.inputContent = "";
            }
        },
    }
};
</script>

<style scoped>
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
</style>