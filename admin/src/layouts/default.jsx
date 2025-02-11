/* eslint-disable react/prop-types */

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">


      {/* Main content should expand to fill the available space */}
      <main className="flex-grow">{children}</main>

      {/* Footer remains at the bottom */}
      <footer className="bg-gray-800 z-100  text-white text-center py-4">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
