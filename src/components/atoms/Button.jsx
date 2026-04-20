const VARIANTS = {
  primary: "bg-black text-white hover:bg-zinc-800",
  secondary: "bg-zinc-100 text-black hover:bg-zinc-200",
  outline: "border border-zinc-300 hover:bg-zinc-50",
};

const BASE_STYLES = "px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95";

export const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const variantStyle = VARIANTS[variant] || VARIANTS.primary;
  return (
    <button
      onClick={onClick}
      className={`${BASE_STYLES} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};