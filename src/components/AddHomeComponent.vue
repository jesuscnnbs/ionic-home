<template>
  <ion-modal ref="homeModal" trigger="open-modal">
    <ion-list>
      <ion-item>
        <ion-input label-placement="floating" label="Nombre" ref="homeName" />
      </ion-item>
    </ion-list>
    <ion-footer>
        <ion-toolbar>
          <ion-buttons slot="secondary">
            <ion-button @click="cancel()">Cancelar</ion-button>
          </ion-buttons>
          <ion-title>Nueva casa</ion-title>
          <ion-buttons slot="primary">
            <ion-button :strong="true" @click="confirm()">Confirmar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
  </ion-modal>
  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button id="open-modal">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script setup lang="ts">
import {
  IonList,
  IonItem,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonFooter,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { ref } from "vue";
import { useCurrentUser } from "vuefire";
import { createHome } from '@/firebase/homes';

const homeModal = ref();
const homeName = ref();
const user = useCurrentUser();

const cancel = () => {
  homeModal.value.$el.dismiss(null, 'cancel');
}

const confirm = () => {
  const name = homeName.value.$el.value;
  homeModal.value.$el.dismiss(name, 'confirm');
  if(name.length) handleCreateHome(name);
}

const handleCreateHome = (name: string) => {
  if(user.value) return createHome(name, user.value.uid)
  console.log('No current user value')
}
</script>
