import UserList from "@/components/user/UserList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserList />
    </main>
  );
}
