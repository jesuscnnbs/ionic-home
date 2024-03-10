<template>
  <ion-button @click="handleSignOut()">Cerrar Sesión</ion-button>
</template>
<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { useAuthStore } from "../store/useAuthStore";
import { useFirebaseAuth } from "vuefire";
const auth = useFirebaseAuth();
const authStore = useAuthStore();

const handleSignOut = () => {
  authStore.signOut(auth);
}

</script>

<style>
ion-button {
  width: 150px;
  display: block;
  margin: 0 auto;
}
</style>
