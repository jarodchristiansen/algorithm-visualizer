import Link from "next/link";

const HeaderBar = () => {
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Link href="/">Home</Link>
      <Link href="/sorting">Sorting</Link>
      <Link href="/fibonacci">Fibonacci</Link>
    </div>
  );
};

export default HeaderBar;
