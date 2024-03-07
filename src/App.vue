<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useCurrentUser } from 'vuefire';
import { useRouter, useRoute } from 'vue-router';

const user = useCurrentUser()
const router = useRouter()
const route = useRoute()

watch(user, async (currentUser, previousUser) => {
  // redirect to login if they logout and the current
  // route is only for authenticated users
  if (
    !currentUser &&
    previousUser //&&
    //isCurrentRouteAuthenticated(route)
  ) {
    return router.push({ path: '/login' })
  }
  // redirect the user if they are logged in but were
  // rejected because the user wasn't ready yet, logged in
  // then got back to this page
  if (currentUser && typeof route.query.redirect === 'string') {
    return router.push(route.query.redirect)
  }
})
</script>
