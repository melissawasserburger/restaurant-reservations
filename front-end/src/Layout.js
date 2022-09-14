import React from "react";
import Menu from "./common/Menu";
import Routes from "./Routes";
import Footer from "./common/Footer";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div>
        <div>
          <Menu />
        </div>
        <div>
          <Routes />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
