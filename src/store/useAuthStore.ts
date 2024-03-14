import { defineStore } from "pinia";
import { signOut, User, Auth } from "firebase/auth";
import { DocumentData, DocumentReference, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface State {
  userData: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    authType?: AuthType | null;
    photoUrl?: any;
    homes: DocumentReference<DocumentData, DocumentData>[];
  } | null;
  error: any;
  loading: boolean;
}

enum AuthType {
  Google = "google",
}

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      userData: null,
      loading: false,
      error: null,
    } as State),
  actions: {
    async setUser(user: User) {
      const newUser = {
        ...this.userData,
        id: user?.uid,
        name: user?.displayName,
        email: user?.email,
        photoUrl: user?.photoURL,
        authType: AuthType.Google,
        homes: [],
      };
      this.userData = newUser;
      if (this.$router.currentRoute.value.fullPath === "/login") {
        await setDoc(doc(db, "users", newUser.id), newUser);
      }
      this.$router.push({ path: "/tabs" });
    },
    signOut(auth: Auth | null) {
      if (auth) {
        signOut(auth)
          .then(() => {
            this.userData = null;
            this.error = null;
            this.$router.push({ path: "/login" });
          })
          .catch((error) => {
            this.error = error;
          });
      }
    },
    addHome(homeId: DocumentReference<DocumentData, DocumentData>) {
      if (this.userData?.homes) {
        this.userData = {
          ...this.userData,
          homes: [homeId, ...this.userData.homes],
        };
      }
    },
  },
});
