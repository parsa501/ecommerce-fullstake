import React from "react";
import { Outlet } from "react-router-dom";

export default function Comments() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">مدیریت کامنت ها</h2>
      <Outlet />
    </div>
  );
}
