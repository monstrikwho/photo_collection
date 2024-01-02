"use client";

import React from "react";

import { AuthProvider } from "../_providers/Auth";
import { FilterProvider } from "./Filter";
import { PhotosProvider } from "./Photos";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <AuthProvider>
      <PhotosProvider>
        <FilterProvider>{children}</FilterProvider>
      </PhotosProvider>
    </AuthProvider>
  );
};
