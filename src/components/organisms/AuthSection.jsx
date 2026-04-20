import { useState } from 'react';
import { useUserStore } from '../../store/userStore.js';
import { Button } from '../atoms/Button.jsx';
import { Input } from '../atoms/Input.jsx';
import { toast } from 'sonner';
import { User, LogOut, Mail, Lock, UserPlus } from 'lucide-react';

export const AuthSection = () => {
  const { user, isLoggedIn, login, register, logout } = useUserStore();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Estados del formulario
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (isLoggedIn) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm mb-8 animate-in fade-in">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-zinc-100 p-3 rounded-full">
            <User size={24} className="text-zinc-400" />
          </div>
          <div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active Session</p>
            <h3 className="font-bold text-lg">{user.name}</h3>
          </div>
        </div>
        <Button variant="outline" onClick={logout} className="w-full flex items-center justify-center gap-2 text-red-500 border-red-50">
          <LogOut size={16} /> Logout
        </Button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      const res = register(formData);
      if (res.success) {
        toast.success("Account created! Please login.");
        setIsRegistering(false);
      } else {
        toast.error(res.message);
      }
    } else {
      const res = login(formData.email, formData.password);
      if (res.success) {
        toast.success(`Welcome back, ${formData.email}!`);
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm mb-8 animate-in slide-in-from-right-4">
      <h3 className="font-black text-xl mb-2 tracking-tight">
        {isRegistering ? "Create Account" : "Sign In"}
      </h3>
      <p className="text-xs text-zinc-500 mb-6">
        {isRegistering ? "Join our minimalist community." : "Access your saved preferences."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {isRegistering && (
          <Input 
            placeholder="Full Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        )}
        <div className="relative">
          <Input 
            type="email" 
            placeholder="Email address" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <Input 
          type="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        
        <Button type="submit" className="w-full py-3 shadow-lg shadow-black/5">
          {isRegistering ? "Register Now" : "Enter Shop"}
        </Button>
      </form>

      <button 
        onClick={() => setIsRegistering(!isRegistering)}
        className="w-full text-center mt-4 text-xs font-bold text-zinc-400 hover:text-black transition-colors"
      >
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};