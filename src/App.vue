<template>
    <div>
        <div v-if="isLoading"><h1>Loading</h1></div>
        <router-view v-else />
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "App",
    data() {
        return {};
    },
    async created() {
        await this.$store.dispatch("process");
    },
    computed: {
        ...mapGetters(["isLoading"]),
    },
};
</script>

<style lang="css">
:root {
    --primary: #ea40a4;
    --business: #3a82ee;
    --personal: var(--primary);
    --light: #eee;
    --grey: #888;
    --dark: #313154;
    --danger: #ff5b57;
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    --business-glow: 0px 0px 4px rgba(58, 130, 238, 0.75);
    --personal-glow: 0px 0px 4px rgba(234, 64, 164, 0.75);
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "montserrat", sans-serif;
}
#app {
    height: 100vh;
    background-color: var(--background-default);
    overflow: hidden;
}
body {
    background: var(--light);
    color: var(--dark);
}
</style>
