import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gen X Web Hosting Blog",
  description: "Guides and product updates on hosting, DNS, SSL, email, and AI tools.",
  alternates: {
    canonical: "https://blog.genxwhosting.com/",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <head>
        <meta httpEquiv="refresh" content="0;url=/" />
        <link rel="canonical" href="https://blog.genxwhosting.com/" />
      </head>
      <main className="flex-grow flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="font-headline-lg text-2xl font-bold text-deep-navy dark:text-surface-white mb-4">
            Redirecting to Gen X Web Hosting Blog
          </h1>
          <p className="text-secondary dark:text-secondary-fixed-dim mb-6">
            You are being redirected to our blog homepage.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      </main>
    </>
  );
}
