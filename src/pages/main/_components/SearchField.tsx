"use client";

import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Updated import
import { Input } from "@/components/ui/input";

export default function SearchField() {
  const navigate = useNavigate(); // Updated hook

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`); // Updated method
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input name="q" placeholder="Search" className="pe-10" />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
}