import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import GoogleIcon from "../../assets/images/GoogleIcon.svg";
import { Separator } from "@/components/ui/separator.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { createUser, signInWithGoogle } from "@/redux/authSlice.ts";
import { useState } from "react";
import { z } from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("This is not a valid email."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit")
      .regex(
        /[!@#$%^&*(),.?":{}|<>-]/,
        "Password must contain at least one special character"
      ),
  })
  .required();

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  if (user) {
    return <Navigate to="/" />;
  }

  const handleRegister = async () => {
    const validation = registerSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors = validation.error.format();
      setErrors({
        email: fieldErrors.email?._errors[0],
        password: fieldErrors.password?._errors[0],
      });
      return;
    }

    await dispatch(createUser({ email, password }));
    setErrors({});
  };

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  return (
    <>
      <div className="bg-background flex min-h-screen">
        <div className="authenticationBackground hidden md:flex w-full md:max-w-48 xl:max-w-sm"></div>
        <ScrollArea className="h-screen w-full xl:pl-5">
          <div className="authenticationBackground w-full h-16 md:hidden"></div>
          <div className="px-4 py-12 md:max-w-sm">
            <p className="font-anton-regular text-3xl text-primary">MapNotes</p>
            <p className="text-3xl text-primary mt-12">Create your account</p>
            <p className="font-bold mt-4 text-muted-foreground">
              Have an account? &nbsp;
              <Link to="/account/login" className="underline">
                Log in
              </Link>
            </p>
            <div className="mt-8">
              <Button
                variant="outline"
                size="lg"
                className="flex gap-4 justify-start border-2 w-full text-foreground"
                onClick={handleSignInWithGoogle}
              >
                <img src={GoogleIcon} alt="google logo" className="w-7" />
                Continue with Google
              </Button>
            </div>
            <div className="flex items-center gap-2 my-8">
              <Separator className="shrink" />
              <p className="text-nowrap text-xs">Or with email and password</p>
              <Separator className="shrink" />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                {error === "Firebase: Error (auth/email-already-in-use)." && (
                  <p className="text-destructive text-sm">
                    Email is already in use!
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-sm">
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="someone@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors?.email && (
                  <p className="text-destructive text-sm">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="p-4 flex flex-col gap-2 font-bold">
                        <p>Password must be at least 8 characters long</p>
                        <p>
                          Password must contain at least one uppercase letter
                        </p>
                        <p>
                          Password must contain at least one lowercase letter
                        </p>
                        <p>Password must contain at least one digit</p>
                        <p>
                          Password must contain at least one special character
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {errors?.password && (
                  <p className="text-destructive text-sm">{errors.password}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={checked}
                  onCheckedChange={() => setChecked(!checked)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I accept the{" "}
                  <Link
                    to="/legal/privacy-policy"
                    target="_blank"
                    className="underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and the{" "}
                  <Link
                    to="/legal/terms-of-service"
                    target="_blank"
                    className="underline"
                  >
                    Terms of Service
                  </Link>
                </Label>
              </div>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                className="w-full"
                disabled={!email || !password || !checked}
                onClick={handleRegister}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Register;
