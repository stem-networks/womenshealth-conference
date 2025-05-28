"use client";

import { useContext } from "react";
import { NavContext } from "@/context/NavContext";
import Link from "next/link";

export const NavBar = () => {
  const { navItems, isLoading, error, refresh } = useContext(NavContext);
   
  if (isLoading) return <div>Loading navigation...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log("nav items", navItems);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="hover:text-gray-300 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <button
          onClick={refresh}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
        >
          Refresh
        </button>
      </div>
    </nav>
  );
};
