<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Casas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ul>
        <li v-for="home in homes" :key="home.id">
          <span>{{ home.name }}</span>
        </li>
      </ul>
      <AddHomeComponent />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { getHomesOnce } from "@/firebase/homes";
import { useCurrentUser } from "vuefire";
import AddHomeComponent from "@/components/AddHomeComponent.vue";

const user = useCurrentUser();
const homes = ref();

onMounted(() => {
  if (user.value) homes.value = getHomesOnce(user.value?.uid);
});
</script>
