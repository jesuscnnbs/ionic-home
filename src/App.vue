<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { useCurrentUser } from "vuefire";
import { useRouter, useRoute } from "vue-router";

const user = useCurrentUser();
const router = useRouter();
const route = useRoute();

watch(user, async (currentUser, previousUser) => {
  // redirect to login if they logout and the current
  // route is only for authenticated users
  // const isRouteAuthenticated = isCurrentRouteAuthenticated(route)
  if (!currentUser && previousUser) {
    return router.push({ path: "/login" });
  }

  // redirect the user if they are logged in but were
  // rejected because the user wasn't ready yet, logged in
  // then got back to this page
  console.log(currentUser, previousUser, route)
  if (currentUser && router.currentRoute.value.fullPath === "/login") {
    return router.push({ path: "/tabs" });
  }
});
</script>
