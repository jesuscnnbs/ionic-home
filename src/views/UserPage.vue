<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Información de usuario</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <UserInfo />
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import UserInfo from '@/components/UserInfo.vue';
</script>