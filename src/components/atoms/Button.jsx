export const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-zinc-100 text-black hover:bg-zinc-200",
    outline: "border border-zinc-300 hover:bg-zinc-50"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};