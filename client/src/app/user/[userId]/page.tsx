import UpdateUser from '@/components/forms/UpdateUser';

export default function Page({ params }: { params: { userId: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UpdateUser userId={params.userId} />
    </main>
  );
}
