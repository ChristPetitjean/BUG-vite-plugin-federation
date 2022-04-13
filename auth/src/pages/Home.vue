<template>
    <div>Home</div>
    <button @click="$auth.login">Login</button>
    <button @click="$auth.logout">Disconnect</button> |
    <router-link to="/protected">to protected</router-link>
</template>
<script lang="ts" setup>
</script>