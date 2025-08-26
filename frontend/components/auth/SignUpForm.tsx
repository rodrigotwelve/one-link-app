"use client";
import { useState } from 'react';
import { signupUser } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await signupUser(username, email, password);
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="input mb-2" required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input mb-2" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input mb-4" required />
      <button type="submit" className="btn w-full">Sign Up</button>
    </form>
  );
}
