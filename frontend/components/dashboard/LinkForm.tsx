"use client";
import { useState } from 'react';

export default function LinkForm({ onSubmit }: { onSubmit: (title: string, url: string) => void }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(title, url);
    setTitle('');
    setUrl('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="input" required />
      <input type="url" placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} className="input" required />
      <button type="submit" className="btn">Add</button>
    </form>
  );
}
