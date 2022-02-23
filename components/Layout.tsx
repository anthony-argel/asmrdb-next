const { default: Footer } = require("./Footer");
const { default: Nav } = require("./Nav");

function Layout({ children }: any) {
  return (
    <div style={{ backgroundColor: "#023430" }}>
      <Nav></Nav>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
