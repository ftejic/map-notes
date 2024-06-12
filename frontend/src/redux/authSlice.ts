import {auth, googleProvider} from "@/firebase/firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User as FirebaseUser
} from "firebase/auth";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AsyncThunkConfig {
    rejectValue: string;
}

interface AuthState {
    user: { uid: string; email: string | null } | null;
    loading: boolean;
    error: string | null;
}

export const createUser = createAsyncThunk<FirebaseUser, { email: string, password: string }, AsyncThunkConfig>(
    "auth/createUser",
    async ({email, password}, {rejectWithValue}) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            //ADD TO DATABASE
            return userCredential.user;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const loginUser = createAsyncThunk<FirebaseUser, { email: string, password: string }, AsyncThunkConfig>(
    "auth/loginUser",
    async ({email, password}, {rejectWithValue}) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const signInWithGoogle = createAsyncThunk<FirebaseUser, void, AsyncThunkConfig>(
    "auth/signInWithGoogle",
    async (_, {rejectWithValue}) => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const initializeAuth = createAsyncThunk<FirebaseUser | null, void, AsyncThunkConfig>(
    "auth/initializeAuth",
    async () => {
        return new Promise<FirebaseUser | null>((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        });
    }
);

export const logOut = createAsyncThunk<null, void, AsyncThunkConfig>(
    "auth/logoutUser",
    async (_, {rejectWithValue}) => {
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
            .addCase(createUser.fulfilled, (state, action: PayloadAction<FirebaseUser>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(createUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to create user";
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<FirebaseUser>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to login";
            })
            .addCase(signInWithGoogle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInWithGoogle.fulfilled, (state, action: PayloadAction<FirebaseUser>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(signInWithGoogle.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to login";
            })
            .addCase(initializeAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initializeAuth.fulfilled, (state, action: PayloadAction<FirebaseUser | null>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(initializeAuth.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to initialize authentication";
            })
            .addCase(logOut.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
            })
            .addCase(logOut.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to logout";
            });
    },
});

export default authSlice.reducer;