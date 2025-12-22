import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
}

export default function FormContainer({ children, title }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}
