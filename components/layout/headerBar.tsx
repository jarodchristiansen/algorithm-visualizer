import Link from "next/link";
import styled from "styled-components";

const HeaderBar = () => {
  return (
    <HeaderContainer>
      <Link href="/">Home</Link>
      <Link href="/sorting">Sorting</Link>
      <Link href="/fibonacci">Fibonacci</Link>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 1.2rem;

  a {
    color: black;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export default HeaderBar;
