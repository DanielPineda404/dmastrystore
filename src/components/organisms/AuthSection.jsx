import { useState } from 'react';
import { useUserStore } from '../../store/userStore.js';
import { Button } from '../atoms/Button.jsx';
import { Input } from '../atoms/Input.jsx';

export const AuthSection = () => {
  const { user, isLoggedIn, login, logout } = useUserStore();
  const [name, setName] = useState('');

  if (isLoggedIn) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm mb-8 flex justify-between items-center">
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Welcome back</p>
          <h3 className="text-xl font-bold">{user.name}</h3>
        </div>
        <Button variant="outline" onClick={logout} className="text-red-500 border-red-100 hover:bg-red-50">
          Logout
        </Button>
      </div>
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login({ name, email: `${name.toLowerCase()}@example.com` });
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm mb-8 space-y-4">
      <h3 className="font-bold text-lg">Customer Login</h3>
      <Input 
        placeholder="Enter your name to start..." 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" className="w-full">Sign In</Button>
    </form>
  );
};