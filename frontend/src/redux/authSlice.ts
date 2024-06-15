import { auth, googleProvider } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
  getAdditionalUserInfo,
} from "firebase/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AsyncThunkConfig {
  rejectValue: string;
}

interface AuthState {
  user: FirebaseUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const addUserToDatabase = async (uid: string, email: string, token: string) => {
  if (!uid || !email || !token) {
    console.error("UID, email or token is missing");
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/account/register`,
      {
        uid,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("User added to database successfully:", response.data);
  } catch (error) {
    console.error("Failed to add user to database:", error);
    throw error;
  }
};

export const createUser = createAsyncThunk<
  { user: FirebaseUser; token: string },
  { email: string; password: string },
  AsyncThunkConfig
>("auth/createUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();

    if (!userCredential.user.email) {
      throw new Error("User email is null");
    }

    addUserToDatabase(
      userCredential.user.uid,
      userCredential.user.email,
      token
    );

    return { user: userCredential.user, token };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loginUser = createAsyncThunk<
  { user: FirebaseUser; token: string },
  { email: string; password: string },
  AsyncThunkConfig
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    return { user: userCredential.user, token };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const signInWithGoogle = createAsyncThunk<
  { user: FirebaseUser; token: string },
  void,
  AsyncThunkConfig
>("auth/signInWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const token = await userCredential.user.getIdToken();

    if (!userCredential.user.email) {
      throw new Error("User email is null");
    }

    const isNewUser = getAdditionalUserInfo(userCredential)?.isNewUser;

    if (isNewUser) {
      addUserToDatabase(
        userCredential.user.uid,
        userCredential.user.email,
        token
      );
    }

    return { user: userCredential.user, token };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});


export const initializeAuth = createAsyncThunk<
  { user: FirebaseUser | null; token: string | null },
  void,
  AsyncThunkConfig
>("auth/initializeAuth", async () => {
  return new Promise<{ user: FirebaseUser | null; token: string | null }>(
    (resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          user
            .getIdToken()
            .then((token) => {
              resolve({ user: user as FirebaseUser, token });
            })
            .catch((error) => {
              console.error("Error fetching user token:", error);
              resolve({ user: null, token: null });
            });
        } else {
          resolve({ user: null, token: null });
        }
        unsubscribe();
      });
    }
  );
});

export const logOut = createAsyncThunk<null, void, AsyncThunkConfig>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createUser.fulfilled,
        (
          state,
          action: PayloadAction<{ user: FirebaseUser; token: string }>
        ) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.loading = false;
        }
      )
      .addCase(
        createUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to create user";
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ user: FirebaseUser; token: string }>
        ) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.loading = false;
        }
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to login";
        }
      )
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signInWithGoogle.fulfilled,
        (
          state,
          action: PayloadAction<{ user: FirebaseUser; token: string }>
        ) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.loading = false;
        }
      )
      .addCase(
        signInWithGoogle.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to login";
        }
      )
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initializeAuth.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: FirebaseUser | null;
            token: string | null;
          }>
        ) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.loading = false;
        }
      )
      .addCase(
        initializeAuth.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to initialize authentication";
        }
      )
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(
        logOut.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to logout";
        }
      );
  },
});

export default authSlice.reducer;
