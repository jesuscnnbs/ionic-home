import { defineStore } from "pinia";
import { signOut, User, Auth } from "firebase/auth";

interface State {
  userData: {
    id?: number | null;
    name?: string | null;
    email?: string | null;
    authType: AuthType | null;
    photoUrl?: any;
  } | null;
  error: any;
}

enum AuthType {
  Google = "google",
}

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      userData: null,
      error: null,
    } as State),
  actions: {
    setUser (user: User) {
      this.userData = {
        ...this.userData,
        name: user?.displayName,
        email: user?.email,
        photoUrl: user?.photoURL,
        authType: AuthType.Google,
      };
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
  },
});
