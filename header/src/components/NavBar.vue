<script lang="ts" setup>
import HeaderLink from './HeaderLink.vue';
</script>
<template>
    <div class="fixed top-0 z-50 w-full mb-5">
        <nav class="bg-gray-800">
            <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center h-16 w-full">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex-shrink-0 flex flex-row items-center gap-2">
                            <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                            <span class="h1 text-2xl text-white font-bold">My ultimate navbar of death</span>
                        </div>
                        <div class="">
                            <div class="ml-10 flex space-x-4 items-center justify-center">
                                <HeaderLink name="Home" to="/" exact />
                                <HeaderLink name="Something else" to="/hell" />
                            </div>
                        </div>
                    </div>
                    <div class="-mr-2 flex lg:hidden">
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>