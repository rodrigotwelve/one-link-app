import { getProfile } from '@/lib/api';

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const data = await getProfile(params.username);

  if (!data || !data.username) {
    return <div className="max-w-lg mx-auto mt-10 text-center text-red-500">User not found</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">{data.username}'s Links</h1>
      <div className="flex flex-col gap-2">
        {data.links.map((link: any) => (
          <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="p-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
}

