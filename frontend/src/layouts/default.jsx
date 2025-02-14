/* eslint-disable react/prop-types */
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      <main className="flex-grow">{children}</main>

      {/* Footer remains at the bottom */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
