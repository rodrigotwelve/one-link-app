"use client";
import LinkItem from './LinkItem';

export default function LinkList({ links, onDelete, onUpdate }: { links: any[], onDelete: (id: string) => void, onUpdate: (id: string, title: string, url: string) => void }) {
  return (
    <div>
      {links.map(link => (
        <LinkItem key={link.id} link={link} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
