import {AppDispatch, RootState} from "@/redux/store.ts";
import {useDispatch, useSelector,} from "react-redux";
import {loginUser, signInWithGoogle} from "@/redux/authSlice.ts";
import {Button} from "@/components/ui/button.tsx";
import {Link, Navigate} from "react-router-dom";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import FacebookIcon from "@/assets/images/FacebookIcon.svg";
import GoogleIcon from "@/assets/images/GoogleIcon.svg";
import AppleIcon from "@/assets/images/AppleIcon.svg";
import {Separator} from "@/components/ui/separator.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {z} from "zod";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("This is not a valid email."),
    password: z.string().min(1, "Password is required"),
}).required();

const Login = () => {
    const dispatch: AppDispatch = useDispatch();
    const {user, error} = useSelector((state: RootState) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    if (user) {
        return <Navigate to="/"/>;
    }

    const handleLogin = async () => {
        const validation = loginSchema.safeParse({email, password});
        if (!validation.success) {
            const fieldErrors = validation.error.format();
            setErrors({
                email: fieldErrors.email?._errors[0],
                password: fieldErrors.password?._errors[0],
            });
            return;
        }

        await dispatch(loginUser({email, password}));
        setErrors({});
    };

    const handleSignInWithGoogle =  () => {
        dispatch(signInWithGoogle());
    }

    return (
        <>
            <div className="bg-background flex min-h-screen">
                <ScrollArea className="h-screen w-full md:max-w-sm">
                    <div className="authenticationBackground w-full h-16 md:hidden"></div>
                    <div className="px-4 py-12">
                        <p className="font-anton-regular text-3xl text-primary">MapNotes</p>
                        <p className="text-3xl text-primary mt-12">Log in to your account</p>
                        <p className="font-bold mt-4 text-muted-foreground">
                            Don't have an account?
                            &nbsp;
                            <Link to="/account/register" className="underline">
                                Sign Up
                            </Link>
                        </p>
                        <div className="flex flex-col gap-4 mt-8">
                            <Button variant="outline" size="lg"
                                    className="flex gap-4 justify-start border-2 w-full text-foreground">
                                <img
                                    src={FacebookIcon}
                                    alt="google logo"
                                    className="w-7"
                                />
                                Continue with Facebook
                            </Button>
                            <Button variant="outline" size="lg"
                                    className="flex gap-4 justify-start border-2 w-full text-foreground"
                                    onClick={handleSignInWithGoogle}
                            >
                                <img
                                    src={GoogleIcon}
                                    alt="google logo"
                                    className="w-7"
                                />
                                Continue with Google
                            </Button>
                            <Button variant="outline" size="lg"
                                    className="flex gap-4 justify-start border-2 w-full text-foreground">
                                <img
                                    src={AppleIcon}
                                    alt="google logo"
                                    className="w-7"
                                />
                                Continue with Apple
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 my-8">
                            <Separator className="shrink"/>
                            <p className="text-nowrap text-xs">Or with email and password</p>
                            <Separator className="shrink"/>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                {error === "Firebase: Error (auth/invalid-credential)." &&
                                    <p className="text-destructive text-sm">Email or password is incorrect!</p>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="email" className="text-sm">Email Address</Label>
                                <Input type="email" id="email" placeholder="someone@example.com" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                                {errors?.email && <p className="text-destructive text-sm">{errors.email}</p>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="password" className="text-sm">Password</Label>
                                <Input type="password" id="password" placeholder="" value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                                {errors?.password && <p className="text-destructive text-sm">{errors.password}</p>}
                                <div className="flex justify-end">
                                    <Link to="/account/reset/password" className="text-sm mt-4 underline">Forgot
                                        Password?</Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button size="lg" className="w-full" disabled={!email || !password}
                                    onClick={handleLogin}>Login</Button>
                        </div>
                    </div>
                </ScrollArea>
                <div className="authenticationBackground hidden md:flex w-full rotate-180"></div>
            </div>
        </>
    );
};

export default Login;