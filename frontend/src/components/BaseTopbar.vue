<script setup lang="ts">
import logo from "@/assets/images/logo.png";
import BaseButton from "@/components/BaseButton.vue";
import { cleanToken } from "@/lib/axios";
import router from "@/router/index";

function onLogout() {
  cleanToken();
  router.push("/login");
}
</script>
<template>
  <div
    class="w-full bg-emerald-500 flex flex-row justify-between items-center h-20 p-5"
  >
    <div class="logo">
      <img
        :src="logo"
        height="70px"
        width="70px"
      >
    </div>
    <div class="flex flex-row w-1/3 justify-between items-center h-full">
      <div class="posts">
        <router-link to="/posts">
          <font-awesome-icon
            class="mr-2"
            icon="pencil"
          />
        </router-link>
      </div>
      <div class="profile">
        <router-link to="/profile">
          <font-awesome-icon
            class="mr-2"
            icon="user"
          />
        </router-link>
      </div>
      <div class="w-20">
        <BaseButton
          label="Log out"
          bg-color="bg-lightGray"
          text-color="text-primary-violet"
          class="border border-primary-violet"
          @clicked="onLogout"
        />
      </div>
    </div>
  </div>
</template>
