// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return <SignIn />;
// }
"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (isSignedIn) {
    router.push("/dashboard"); // or your custom route
    return null;
  }

  return <SignIn />;
}
