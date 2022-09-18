<template>
    <section class="greeting">
            <h2 class="title">Your address, {{getAccount}}</h2>
        </section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "AccInfo",
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['getAccount']),
    }
}
</script>

<style scoped>
section {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-left: 1.5rem;
    padding-right: 1.5em;
}
.greeting .title {
    display: flex;
}
.greeting .title {
    color: var(--dark);
    font-size: 1.5rem;
    font-weight: 700;
}
</style>