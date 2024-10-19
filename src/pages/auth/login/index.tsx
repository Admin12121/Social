import { lazy, Suspense } from "react";
import BackdropGradient from "@/components/global/backdrop-gradient";
import GlassCard from "@/components/global/glass-card";

const SignInForm = lazy(() => import("@/components/forms/sign-in"));

const Login = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center overflow-hidden">
      <div className="flex flex-col w-full items-center py-24">
        <BackdropGradient
          className="w-4/12 h-2/6 opacity-40"
          container="flex flex-col items-center"
        >
          <GlassCard className="xs:w-full md:w-7/12 lg:w-5/12 xl:w-4/12 p-7 mt-16 overflow-hidden relative">
            <Suspense fallback={<div>Loading...</div>}>
              <SignInForm />
            </Suspense>
          </GlassCard>
        </BackdropGradient>
      </div>
    </div>
  );
};

export default Login;