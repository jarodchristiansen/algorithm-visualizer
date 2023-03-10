import Link from "next/link";
import HeaderBar from "./headerBar";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
.App {
  text-align: center;
}

html, body {
  top: 0;
  margin: 0;
  width: auto;
  display: flex;
  min-height: 95vh;
  font-family: 'Fira Code', monospace;
  flex-direction: column;
}



/* FRAME STARTS. GLOBAL TO HANDLE DIFFERENT VISUALIZERS*/
.array {
  padding: 1rem;
  display: flex;
  min-height: 80vh;
  align-items: flex-start;
}
.cell {
  flex: 0.5;
  margin: 1px;
  display: flex;
  resize: horizontal;
  position: relative;
  align-items: flex-start;
  background-color: #D6D6D6;
  transition: all .4s ease-in;
}
.cell.done {
  background-color: #8bb88e;
  border-color: #8bb88e;
  transition: all .4s ease-out;
}
.cell.current {
  border-color: #6184D8;
  background-color: #61a8d8;
  transition: all .4s ease-out;
}
/* FRAME ENDS */

/* NAVBAR STARTS */
.navbar {
  top: 0;
  overflow: hidden;
  font-size: 16px;
  min-height: 60px;
  text-align: center;
  background-color: #000;
  width: 100%;
}
.navbar .options {
  margin: 10px;
  text-align: center;
}
.navbar a {
  outline: none;
  cursor: pointer;
  color: #ccd6f6;
  padding: 13px 13px;
  text-decoration: none;
}
.navbar > a:hover {
  color: #64ffda;
}
.navbar #menu {
  margin-top: 15px;
  width: 150px;
  height: 25px;
  outline: none;
}
.navbar > .icon {
  display: none;
}
#start {
  margin: 10px;
}
#random {
  margin-top: 5px;
}
button {
  width: 100px;
  padding: 5px;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  background-color: #222;
  transition: 0.2s ease-in;
  border: 2px solid #ccd6f6;
}
button:hover {
  color: #222;
  background-color: #ccd6f6;
}
@media screen and (max-width: 900px) {
  .navbar button, .navbar .options {
      display: none;
  }
  .navbar a.icon {
      float: right;
      display: block;
  }
  .navbar.responsive {
      position: relative;
  }
  .navbar.responsive a.icon {
      position: absolute;
      right: 0;
      top: 0;
  }
  .navbar.responsive .options {
      float: none;
      display: block;
      text-align: center;
  }
  .navbar.responsive button {
    display: inline;
  }
}
`;

const Layout = ({ children }) => {
  return (
    <div>
      <GlobalStyle />
      <HeaderBar />
      {children}
    </div>
  );
};

export default Layout;
