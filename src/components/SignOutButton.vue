<template>
  <ion-button @click="handleSignOut()">Cerrar Sesión</ion-button>
</template>
<script setup lang="ts">
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { IonButton } from '@ionic/vue';
import router from "@/router";

const auth = useFirebaseAuth();

const handleSignOut = () => {
  if (auth) {
        signOut(auth)
          .then(() => {
            router.push({ path: "/login" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
}

</script>

<style>
ion-button {
  width: 150px;
  display: block;
  margin: 0 auto;
}
</style>
