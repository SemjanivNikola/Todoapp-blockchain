<template>
    <router-view />
</template>

<script>
export default {
    name: "App",
    data() {
        return {};
    },
};
</script>

<style lang="css">
:root {
	--primary: #EA40A4;
	--business: #3A82EE;
	--personal: var(--primary);
	--light: #EEE;
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
	font-family: 'montserrat', sans-serif;
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
