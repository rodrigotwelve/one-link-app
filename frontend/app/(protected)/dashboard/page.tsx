"use client";
import { useEffect, useState } from 'react';
import { getUserLinks, createLink, deleteLink, updateLink } from '@/lib/api';
import LinkForm from '@/components/dashboard/LinkForm';
import LinkList from '@/components/dashboard/LinkList';

export default function DashboardPage() {
  type Link = {
    id: string;
    title: string;
    url: string;
    // add other fields if needed
  };

  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getUserLinks()
      .then(setLinks)
      .catch(err => setError(err.message || 'Failed to load links'))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(title: string, url: string) {
    try {
      const newLink = await createLink(title, url);
      setLinks([...links, newLink]);
    } catch (err: any) {
      setError(err.message || 'Failed to add link');
    }
  }

  async function handleDelete(linkId: string) {
    try {
      await deleteLink(linkId);
      setLinks(links.filter((l: any) => l.id !== linkId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete link');
    }
  }

  async function handleUpdate(linkId: string, title: string, url: string) {
    try {
      const updated = await updateLink(linkId, title, url);
      setLinks(links.map((l: any) => (l.id === linkId ? updated : l)));
    } catch (err: any) {
      setError(err.message || 'Failed to update link');
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Links</h1>
      <LinkForm onSubmit={handleAdd} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <LinkList links={links} onDelete={handleDelete} onUpdate={handleUpdate} />
      )}
    </div>
  );
}
