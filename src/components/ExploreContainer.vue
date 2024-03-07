<template>
  <div id="container">
    <strong>{{ name }}</strong>
    <ion-button @click="handleSignOut()">Sign Out</ion-button>
  </div>
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

defineProps({
  name: String,
});


</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
