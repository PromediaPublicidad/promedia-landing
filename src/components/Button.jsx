export default function Button({ children, href = "#", target = "_self" }) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="inline-block bg-[#ff6f3c] text-white font-semibold py-3 px-6 rounded-full shadow hover:bg-[#e05c2a] transition-all duration-300"
    >
      {children}
    </a>
  );
}