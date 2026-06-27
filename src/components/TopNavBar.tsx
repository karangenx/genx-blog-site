"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import posts from "../data/posts.json";

export default function TopNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  // Close mobile menu and search on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Prevent scroll when mobile menu or search is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  // Escape key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredPosts = searchQuery.trim() === "" ? [] : posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  return (
    <header className="bg-surface-white dark:bg-deep-navy border-b border-outline-variant dark:border-on-surface-variant sticky top-0 z-50">
      <div className="flex justify-between items-center h-20 w-full px-margin-edge max-w-container-max mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          {/* Logo from user's URL */}
          <div className="relative w-40 h-12">
            <img
              src="https://genxwhosting.com/templates/genx/img/theme/logo.png"
              alt="GenxWHosting Logo"
              className="object-contain w-full h-full"
            />
          </div>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-gutter items-center h-full">
          <Link href="/" className="text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 h-full flex items-center font-body-md text-body-md font-semibold">Home</Link>
          <Link href="/category/domain" className="text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 h-full flex items-center font-body-md text-body-md font-semibold">Domain</Link>
          <Link href="/category/wordpress" className="text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 h-full flex items-center font-body-md text-body-md font-semibold">WordPress</Link>
          <div className="relative group h-full flex items-center">
            <Link href="/category/php" className="text-secondary dark:text-secondary-fixed-dim group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors duration-200 h-full flex items-center font-body-md text-body-md font-semibold gap-1">
              PHP <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180">expand_more</span>
            </Link>
            <div className="absolute top-full left-0 mt-0 w-48 bg-surface-white dark:bg-surface-container-highest border border-outline-variant dark:border-on-surface-variant rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2">
              <Link href="/category/php-versions" className="px-4 py-2 text-sm text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container hover:text-primary transition-colors">PHP Versions</Link>
              <Link href="/category/php-extensions" className="px-4 py-2 text-sm text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container hover:text-primary transition-colors">Extensions</Link>
              <Link href="/category/php-config" className="px-4 py-2 text-sm text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container hover:text-primary transition-colors">Configuration</Link>
              <Link href="/category/php-optimization" className="px-4 py-2 text-sm text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container hover:text-primary transition-colors">Optimization</Link>
            </div>
          </div>

          <div className="relative group h-full flex items-center">
            <Link href="/category/cpanel" className="text-secondary dark:text-secondary-fixed-dim group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors duration-200 h-full flex items-center font-body-md text-body-md font-semibold gap-1">
              cPanel <span className="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180">expand_more</span>
            </Link>
            <div className="absolute top-full left-0 mt-0 w-48 bg-surface-white dark:bg-surface-container-highest border border-outline-variant dark:border-on-surface-variant rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2">
              <Link href="/category/cpanel-emails" className="px-4 py-2 text-sm text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container hover:text-primary transition-colors">Emails</Link>
              <Link href="/category/cpanel-databases" className="px-4 py-2 text-sm text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container hover:text-primary transition-colors">Databases</Link>
              <Link href="/category/cpanel-files" className="px-4 py-2 text-sm text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container hover:text-primary transition-colors">File Manager</Link>
              <Link href="/category/cpanel-backups" className="px-4 py-2 text-sm text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container hover:text-primary transition-colors">Backups</Link>
            </div>
          </div>
          <Link href="/categories" className="text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 h-full flex items-center font-body-md text-body-md font-semibold">All Categories</Link>
        </nav>

        {/* Actions (Search & CTA & Theme) */}
        <div className="flex items-center gap-base">
          <ThemeToggle />
          <button aria-label="Search" className="p-2 text-secondary hover:text-primary transition-colors duration-200" onClick={() => setIsSearchOpen(true)}>
            <span className="material-symbols-outlined" data-icon="search">search</span>
          </button>
          <a href="https://genxwhosting.com/pages/deals-zone.php" className="hidden lg:inline-flex bg-[#e3000f] text-white font-body-md text-body-md px-6 py-2 rounded-sm font-semibold hover:bg-red-700 transition-colors shadow-sm items-center justify-center">
            See Offers
          </a>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Menu"
            className="md:hidden p-2 text-secondary hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`md:hidden fixed inset-0 top-20 bg-surface-white dark:bg-deep-navy z-40 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
        <div className="flex flex-col p-6 gap-6">
          <Link href="/" className="font-headline-md text-xl font-semibold text-deep-navy dark:text-white border-b border-outline-variant pb-4">Home</Link>
          <Link href="/category/domain" className="font-headline-md text-xl font-semibold text-deep-navy dark:text-white border-b border-outline-variant pb-4">Domain</Link>
          <Link href="/category/wordpress" className="font-headline-md text-xl font-semibold text-deep-navy dark:text-white border-b border-outline-variant pb-4">WordPress</Link>

          <div className="flex flex-col gap-3 border-b border-outline-variant pb-4">
            <Link href="/category/php" className="font-headline-md text-xl font-semibold text-deep-navy dark:text-white">PHP</Link>
            <div className="flex flex-col gap-2 pl-4 border-l-2 border-primary/20">
              <Link href="/category/php-versions" className="text-secondary py-1">PHP Versions</Link>
              <Link href="/category/php-extensions" className="text-secondary py-1">Extensions</Link>
              <Link href="/category/php-config" className="text-secondary py-1">Configuration</Link>
              <Link href="/category/php-optimization" className="text-secondary py-1">Optimization</Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-b border-outline-variant pb-4">
            <Link href="/category/cpanel" className="font-headline-md text-xl font-semibold text-deep-navy dark:text-white">cPanel</Link>
            <div className="flex flex-col gap-2 pl-4 border-l-2 border-primary/20">
              <Link href="/category/cpanel-emails" className="text-secondary py-1">Emails</Link>
              <Link href="/category/cpanel-databases" className="text-secondary py-1">Databases</Link>
              <Link href="/category/cpanel-files" className="text-secondary py-1">File Manager</Link>
              <Link href="/category/cpanel-backups" className="text-secondary py-1">Backups</Link>
            </div>
          </div>

          <Link href="/categories" className="font-headline-md text-xl font-semibold text-deep-navy dark:text-white pb-4">All Categories</Link>

          <a href="https://genxwhosting.com/pages/deals-zone.php" className="w-full mt-4 bg-[#e3000f] text-white font-body-md text-body-md px-6 py-4 rounded-sm font-semibold hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center text-lg">
            See Offers
          </a>
        </div>
      </div>


      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4 transition-opacity">
          <div className="bg-surface-white dark:bg-surface-container-highest w-full max-w-2xl rounded-xl shadow-2xl border border-outline-variant dark:border-on-surface-variant overflow-hidden flex flex-col">
            <div className="p-3 md:p-4 border-b border-outline-variant dark:border-on-surface-variant flex items-center gap-2 md:gap-3 relative">
              <span className="material-symbols-outlined text-secondary ml-1">search</span>
              <input
                type="search"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                placeholder="Search articles..."
                className="flex-1 bg-transparent border-none outline-none font-body-lg text-base md:text-lg text-deep-navy dark:text-surface-white placeholder:text-secondary-fixed-dim"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button aria-label="Close search" className="p-2 rounded-full hover:bg-surface-variant text-secondary transition-colors cursor-pointer" onClick={() => setIsSearchOpen(false)}>
                <span className="material-symbols-outlined block">close</span>
              </button>
            </div>
            
            {/* Search Results */}
            {searchQuery.trim() !== "" && (
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredPosts.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {filteredPosts.map(post => (
                      <Link key={post.id} href={`/blog/${post.slug}`} className="flex flex-col gap-1 p-3 rounded-lg hover:bg-surface-container transition-colors group">
                        <span className="font-label-sm text-xs text-primary uppercase tracking-wide">{post.category}</span>
                        <h4 className="font-headline-md text-base text-deep-navy group-hover:text-primary transition-colors line-clamp-1" dangerouslySetInnerHTML={{ __html: post.title }}></h4>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-secondary font-body-md text-body-md">
                    No articles found for "{searchQuery}".
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
