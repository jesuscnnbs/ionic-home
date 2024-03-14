<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { useCurrentUser } from "vuefire";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "./store/useAuthStore";

const user = useCurrentUser();
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

watch(user, async (currentUser, previousUser) => {
  // redirect to login if they logout and the current
  // route is only for authenticated users
  // const isRouteAuthenticated = isCurrentRouteAuthenticated(route)
  if (!currentUser && previousUser) {
    return router.push({ path: "/login" });
  }
  // set user in pinia if authenticated now and not before
  if (currentUser && !previousUser) {
    authStore.setUser(currentUser);
  }

  // redirect the user if they are logged in but were
  // rejected because the user wasn't ready yet, logged in
  // then got back to this page
  if (currentUser && typeof route.query.redirect === "string") {
    return router.push(route.query.redirect);
  }
});

onMounted(() => {
  if (user.value) authStore.setUser(user.value);
});
</script>
