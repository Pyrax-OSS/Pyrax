import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";

interface DropdownProps {
  trigger: (isOpen: boolean) => ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function Dropdown({ trigger, children, className = "", contentClassName = "" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {isOpen && (
        <div className={`absolute bottom-full mb-2 w-full p-2 bg-white dark:bg-zinc-900/95 border border-zinc-300 dark:border-zinc-800 rounded-lg backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200 ${contentClassName}`}>
          {children}
        </div>
      )}
      <div onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0} aria-expanded={isOpen} aria-haspopup="true">
        {trigger(isOpen)}
      </div>
    </div>
  );
}
