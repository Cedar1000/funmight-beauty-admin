"use client";
import cookie from "react-cookies";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = cookie.load("token"); // Retrieve the token from cookies
    if (token) {
      router.push("/dashboard"); // Redirect to the dashboard
    } else {
      router.push("/signin"); // Redirect to the sign-in page
    }
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>Redirecting...</p>
    </div>
  );
}
