import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex justify-center py-12">
      <SignUp />
    </div>
  );
}