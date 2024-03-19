<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-avatar v-if="user">
          <img alt="image profile" :src="user.photoURL || undefined"/>
        </ion-avatar>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-text>
          <h3>{{ user?.displayName }}</h3>
        </ion-text>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <SignOutButton />
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonAvatar, IonText } from '@ionic/vue';
import { useCurrentUser } from 'vuefire';
import SignOutButton from '@/components/SignOutButton.vue'

const user = useCurrentUser();

</script>
<style scoped>
ion-grid {
  --ion-grid-column-padding: 30px;
}
ion-avatar {
  margin: 0 auto;
  width: 80px;
  height: 80px;
}
ion-text {
  text-align: center;
}
</style>