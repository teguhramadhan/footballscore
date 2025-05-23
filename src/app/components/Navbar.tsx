export default function Navbar() {
  return (
    <div>
      <nav className="bg-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg"
                alt="Premier League"
                className="w-24 h-24"
              />
            </div>

            {/* Icons: Login & Hamburger */}
            <div className="flex items-center gap-6">
              {/* Login Icon */}
              <button className="text-gray-600 hover:text-blue-700 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Hamburger Icon */}
              <button className="text-gray-600 hover:text-blue-700 transition md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <nav className="hidden md:block bg-white py-2 border-b-2 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Navigation Links */}
            <div className="flex justify-center md:flex md:justify-start space-x-8">
              <a
                href="#upcoming"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Match Mendatang
              </a>
              <a
                href="#previous"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Match Sebelumnya
              </a>
              <a
                href="#standings"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Tabel Klasemen
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
