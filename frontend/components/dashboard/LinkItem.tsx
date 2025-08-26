"use client";
import { useState } from 'react';

export default function LinkItem({ link, onDelete, onUpdate }: { link: any, onDelete: (id: string) => void, onUpdate: (id: string, title: string, url: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    onUpdate(link.id, title, url);
    setEditing(false);
  }

  return (
    <div className="flex items-center gap-2 mb-2 p-2 bg-gray-100 rounded">
      {editing ? (
        <form onSubmit={handleUpdate} className="flex gap-2 flex-1">
          <input value={title} onChange={e => setTitle(e.target.value)} className="input" />
          <input value={url} onChange={e => setUrl(e.target.value)} className="input" />
          <button type="submit" className="btn">Save</button>
        </form>
      ) : (
        <>
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex-1 font-medium">{link.title}</a>
          <button onClick={() => setEditing(true)} className="btn">Edit</button>
          <button onClick={() => onDelete(link.id)} className="btn btn-danger">Delete</button>
        </>
      )}
    </div>
  );
}
