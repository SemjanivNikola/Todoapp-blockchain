<template>
    <main class="app">
        <acc-info />

        <create-form />

        <task-list />
    </main>
</template>

<script>
import AccInfo from "../components/AccInfo.vue";
import CreateForm from "../components/CreateForm.vue";
import TaskList from "../components/TaskList.vue";

export default {
    components: { AccInfo, CreateForm, TaskList },
    name: "App",
};
</script>

<style>
section {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-left: 1.5rem;
    padding-right: 1.5em;
}

input:not([type="radio"]):not([type="checkbox"]),
button {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    cursor: initial;
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
</style>