import { defineStore } from "pinia";
import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/firebase";
import { _RefFirestore, useCollection } from 'vuefire';
import { useAuthStore } from "./useAuthStore";

interface State {
  homesData: Home[] | null;
}

interface Home extends HomeDTO {
  id: number;
}

interface HomeDTO {
  name: string;
  monthlyCosts: MonthlyCosts[];
  userIds: string[];
  monthIds: DocumentReference<DocumentData, DocumentData>[];
}

interface MonthlyCosts {
  title: string;
  amount: string;
  category: string;
  currency: "EUR" | "USD";
}

export const useHomesStore = defineStore("homes", {
  state: () =>
    ({
      homesData: {} as _RefFirestore<DocumentData[]>,
    }),
  actions: {
    async createHome(newHomeName: string) {
      const authStore = useAuthStore();
      const monthRef = await addDoc(collection(db, "months"), {
        date: new Date(),
        payments: [],
      });
      const newHome = {
        name: newHomeName,
        monthlyCosts: [],
        userIds: [authStore.userData?.id],
        monthIds: [monthRef],
      } as HomeDTO;
      const homeRef = await addDoc(collection(db, "homes"), newHome);
      authStore.addHome(homeRef);
    },
    async getHomes() {
      const homes = useCollection(collection(db, 'homes'))
      this.homesData = homes;
    }
  },
});
