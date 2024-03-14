<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Casas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ul>
        <li v-for="home in homesStore.homesData" :key="home.id">
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
import AddHomeComponent from '@/components/AddHomeComponent.vue'

import { useHomesStore } from "@/store/useHomesStore";
import { onMounted } from "vue";

const homesStore = useHomesStore();
onMounted(() => {
  homesStore.getHomes();
})

</script>
