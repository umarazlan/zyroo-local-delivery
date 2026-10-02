import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>

        <p className="mt-2 text-gray-600">
          You do not have permission to access this page.
        </p>

        <Link
          to="/"
          className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-white"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
