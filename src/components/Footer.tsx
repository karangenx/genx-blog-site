"use client";

import Link from "next/link";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "GenX Web Hosting",
          text: "Check out GenX Web Hosting!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  return (
    <footer className="bg-surface-container-highest dark:bg-deep-navy border-t border-outline-variant dark:border-on-surface-variant mt-auto">
      <div className="py-section-gap px-margin-edge max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="relative w-48 h-16">
            <img
              src="https://genxwhosting.com/templates/genx/img/theme/logo.png"
              alt="GenX Web Hosting"
              className="object-contain w-full h-full dark:brightness-0 dark:invert"
            />
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim">
            Professional High-Performance Hosting.
          </p>
        </div>
        {/* Links Column 1 */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline-md text-base font-bold text-deep-navy dark:text-surface-white mb-2">Legal</h4>
          <a href="https://genxwhosting.com/pages/privacy-policy.php" className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim hover:underline hover:text-primary dark:hover:text-primary-fixed-dim transition-all duration-200" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <a href="https://genxwhosting.com/pages/terms.php" className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim hover:underline hover:text-primary dark:hover:text-primary-fixed-dim transition-all duration-200" target="_blank" rel="noopener noreferrer">Terms of Service</a>
        </div>
        {/* Links Column 2 */}
        <div className="flex flex-col gap-3">
          <h4 className="font-headline-md text-base font-bold text-deep-navy dark:text-surface-white mb-2">Resources</h4>
          <a href="https://genxwhosting.com/knowledgebase.php" className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim hover:underline hover:text-primary dark:hover:text-primary-fixed-dim transition-all duration-200" target="_blank" rel="noopener noreferrer">Knowledge Base</a>
          <a href="https://genxwhosting.com/pages/affiliates.php" className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim hover:underline hover:text-primary dark:hover:text-primary-fixed-dim transition-all duration-200" target="_blank" rel="noopener noreferrer">Affiliate Program</a>
        </div>
        {/* Connect Column */}
        <div className="flex flex-col gap-3 md:items-end">
          <h4 className="font-headline-md text-base font-bold text-deep-navy dark:text-surface-white mb-2">Connect</h4>
          <a href="https://genxwhosting.com/submitticket.php?step=2&deptid=2" className="font-body-md text-body-md text-on-surface-variant dark:text-secondary-fixed-dim hover:underline hover:text-primary dark:hover:text-primary-fixed-dim transition-all duration-200" target="_blank" rel="noopener noreferrer">Contact Us</a>
          <div className="flex gap-4 mt-2">
            <a href="https://genxwhosting.com" className="text-secondary hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Visit GenX Web Hosting">
              <span className="material-symbols-outlined" data-icon="language">language</span>
            </a>
            <button onClick={handleShare} className="text-secondary hover:text-primary transition-colors cursor-pointer" aria-label="Share this page">
              <span className="material-symbols-outlined" data-icon="share">share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Footer: Separated Social Media & Copyright */}
      <div className="border-t border-outline-variant dark:border-on-surface-variant bg-surface-container dark:bg-inverse-surface">
        <div className="py-6 px-margin-edge max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-sm text-sm text-on-surface-variant dark:text-secondary-fixed-dim">
            &copy; {new Date().getFullYear()} <a href="https://genxwhosting.com/" className="hover:text-primary transition-colors hover:underline" target="_blank" rel="noopener noreferrer">GenX Web Hosting</a>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <SocialIcon 
              href="https://www.facebook.com/GenXWebHosting/" 
              label="Facebook" 
              hoverColorClass="hover:text-[#1877F2]"
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
            <SocialIcon 
              href="https://www.instagram.com/genxwebhosting/" 
              label="Instagram" 
              hoverColorClass="hover:text-[#E4405F]"
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
            />
            <SocialIcon 
              href="https://www.linkedin.com/company/genxwebhosting/?viewAsMember=true" 
              label="LinkedIn" 
              hoverColorClass="hover:text-[#0A66C2]"
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
            <SocialIcon 
              href="https://x.com/genxwebhosting" 
              label="X (Twitter)" 
              hoverColorClass="hover:text-deep-navy dark:hover:text-white"
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
