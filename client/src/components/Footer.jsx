import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-600 py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <p className="text-2xl font-bold text-center mb-6 max-w-2xl">
          "The only way to do great work is to love what you do."
        </p>
        <p className="text-sm italic mb-4">- Steve Jobs</p>
        <div className="mt-4">
          <p>Mail: an0731aa@naver.com</p>
        </div>
        <div className="mt-4 text-sm">
          <p>&copy; {currentYear} MyBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
