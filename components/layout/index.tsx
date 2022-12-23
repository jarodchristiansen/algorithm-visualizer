import Link from "next/link";
import HeaderBar from "./headerBar";

const Layout = ({ children }) => {
  return (
    <div>
      <HeaderBar />
      {children}
    </div>
  );
};

export default Layout;
