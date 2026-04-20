import { useState, useEffect } from 'react';
import { useUserStore } from '../../store/userStore.js';
import { Button } from '../atoms/Button.jsx';
import { Input } from '../atoms/Input.jsx';
import { toast } from 'sonner';
import { User, LogOut, Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react';

export const AuthSection = ({ initialMode = "login", onSuccess, onSwitchMode }) => {
  const { user, isLoggedIn, login, register, logout } = useUserStore();
  const [isRegistering, setIsRegistering] = useState(initialMode === "register");
  
  // Sincronizar el estado interno si la prop cambia desde el Header
  useEffect(() => {
    setIsRegistering(initialMode === "register");
  }, [initialMode]);

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Manejo de la sesión activa
  if (isLoggedIn) {
    return (
      <div className="p-8 bg-white rounded-3xl border border-zinc-100 shadow-xl shadow-zinc-200/50 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <div className="bg-zinc-900 p-4 rounded-full shadow-lg shadow-black/20">
            <User size={32} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Authenticated</p>
            <h3 className="font-bold text-2xl text-zinc-900">{user.name}</h3>
            <p className="text-sm text-zinc-500">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button variant="outline" onClick={onSuccess} className="w-full py-4 border-zinc-200">
            Go to Store
          </Button>
          <Button variant="outline" onClick={logout} className="w-full flex items-center justify-center gap-2 text-red-500 border-red-50 hover:bg-red-50">
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isRegistering) {
      const res = register(formData);
      if (res.success) {
        toast.success("Account created successfully!");
        onSwitchMode("login"); // Cambiamos a login automáticamente
      } else {
        toast.error(res.message);
      }
    } else {
      const res = login(formData.email, formData.password);
      if (res.success) {
        toast.success(`Welcome back!`);
        onSuccess(); // Navegamos a la tienda
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <div className="p-10 bg-white rounded-[2.5rem] border border-zinc-100 shadow-2xl shadow-zinc-200/60 animate-in slide-in-from-bottom-8 duration-500">
      <button 
        onClick={onSuccess}
        className="mb-8 flex items-center gap-2 text-zinc-400 hover:text-black transition-colors text-xs font-bold uppercase tracking-widest"
      >
        <ArrowLeft size={14} /> Back to Store
      </button>

      <div className="mb-10">
        <h3 className="font-black text-4xl mb-3 tracking-tighter text-zinc-900">
          {isRegistering ? "Join us." : "Welcome back."}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed">
          {isRegistering 
            ? "Create your account to start managing your daily essentials." 
            : "Sign in to access your saved items and secure checkout."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegistering && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-400 uppercase ml-1">Full Name</label>
            <Input 
              placeholder="John Doe" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="h-12 bg-zinc-50 border-none focus:ring-2 focus:ring-black/5"
            />
          </div>
        )}
        
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-zinc-400 uppercase ml-1">Email Address</label>
          <Input 
            type="email" 
            placeholder="name@example.com" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="h-12 bg-zinc-50 border-none focus:ring-2 focus:ring-black/5"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-zinc-400 uppercase ml-1">Password</label>
          <Input 
            type="password" 
            placeholder="••••••••" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            className="h-12 bg-zinc-50 border-none focus:ring-2 focus:ring-black/5"
          />
        </div>
        
        <Button type="submit" className="w-full py-4 mt-4 shadow-xl shadow-black/10 font-bold text-sm uppercase tracking-widest">
          {isRegistering ? "Create Account" : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 pt-8 border-t border-zinc-50">
        <button 
          onClick={() => onSwitchMode(isRegistering ? "login" : "register")}
          className="w-full text-center text-xs font-bold text-zinc-400 hover:text-black transition-colors"
        >
          {isRegistering 
            ? "Already have an account? Sign In" 
            : "Don't have an account? Create one"}
        </button>
      </div>
    </div>
  );
};