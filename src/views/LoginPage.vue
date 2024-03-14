<template>
  <ion-page>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-button @click="handleSignIn()">SignIn with Google 💦</ion-button>
          <ion-toast
            :is-open="isOpen"
            :message="error"
            :duration="5000"
            @didDismiss="setOpen(false)"
          ></ion-toast>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
  IonPage,
  IonButton,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import {
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { googleAuthProvider } from "@/firebase";

const auth = useFirebaseAuth();
// display errors if any
const error = ref(null);

// toast
const isOpen = ref(false);

const handleSignIn = () => {
  error.value = null;
  if (auth) {
    signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
      console.error("Failed signinRedirect", reason);
      error.value = reason;
    });
  }
};

const setOpen = (state: boolean) => {
  isOpen.value = state;
};


onMounted(() => {
  if (auth) {
    getRedirectResult(auth).catch((reason) => {
      console.error("Failed redirect result", reason);
      error.value = reason;
      setOpen(true);
    });
  }
});
</script>
<style scoped>
ion-row {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
