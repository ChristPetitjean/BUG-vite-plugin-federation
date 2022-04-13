<template>
    <div> Protected content</div>
    <button @click="$auth.logout">Disconnect</button>
    <router-link to="/">to home</router-link>
</template>