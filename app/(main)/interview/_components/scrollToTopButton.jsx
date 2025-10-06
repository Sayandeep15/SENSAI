"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 group flex items-center gap-2
        rounded-full transition-all duration-300 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        bg-zinc-700 hover:bg-zinc-600 text-white shadow-inner hover:shadow-[0_0_15px_#66ccff]
        h-10 px-3`}
      aria-label="Back to top"
    >
      <ArrowUp
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 flex-shrink-0"
      />
      <span
        className="whitespace-nowrap opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[100px]
        transition-all duration-300 overflow-hidden text-sm font-medium"
      >
        Back to top
      </span>
    </button>
  );
}
