import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import AnimatedGridPattern from "@/components/global/grid-pattern";
import { cn } from "@/lib/utils";
import supabase from "@/api/feature/sessionProvider"

const SignInForm = () => {
  const route = useNavigate();
  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      route("/login");
    } else {
      route("/");
    }
  });

  return (
    <>
      <h5 className="font-bold text-base text-themeTextWhite">Social</h5>
      <p className="text-themeTextGray leading-tight">
        Network with people from around the world, discover new content.
      </p>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["github", "google"]}
        theme="dark"
      />
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(150px_circle_at_center,white,transparent)]",
          "bottom-[-30%] h-[50%] -z-[1]"
        )}
      />
    </>
  );
};

export default SignInForm;
