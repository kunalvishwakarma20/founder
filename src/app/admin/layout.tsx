import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebar from "./_components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, sessionClaims } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Check if user has admin role
  if (sessionClaims?.metadata?.role !== "admin") {
    redirect("/dashboard/for-you"); // Redirect non-admin users to regular dashboard
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}