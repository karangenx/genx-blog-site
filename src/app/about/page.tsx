import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex-grow pb-section-gap">
      {/* Hero Section */}
      <header className="py-section-gap px-margin-edge max-w-container-max mx-auto text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-surface-white to-surface-container opacity-50"></div>
        <h1 className="font-display-lg text-display-lg mb-6 text-deep-navy">
          Empowering the <span className="text-primary">Digital Builders</span>
        </h1>
        <p className="font-quote-accent text-quote-accent max-w-3xl mx-auto text-secondary mb-10">
          The Gen X Web Hosting blog is dedicated to providing uncompromising technical depth, architectural insights, and proven strategies for IT professionals scaling modern infrastructure.
        </p>
      </header>

      {/* Mission Bento Grid */}
      <section className="px-margin-edge max-w-container-max mx-auto mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Mission Statement */}
          <div className="col-span-1 md:col-span-2 bg-surface-white border border-surface-variant rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-primary-container/10 rounded flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary" data-icon="terminal">terminal</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg mb-4 text-deep-navy">Our Mission</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
              We believe that robust infrastructure is the foundation of digital innovation. Our mission is to demystify complex server architectures, share battle-tested security protocols, and guide developers through the evolving landscape of cloud technologies. We cut through the noise to deliver actionable, high-signal content.
            </p>
            <div className="flex gap-4">
              <span className="inline-flex items-center px-3 py-1 bg-[#EBF2F7] rounded-full font-label-sm text-label-sm text-slate-text">High-Signal Content</span>
              <span className="inline-flex items-center px-3 py-1 bg-[#EBF2F7] rounded-full font-label-sm text-label-sm text-slate-text">Architectural Depth</span>
            </div>
          </div>

          {/* Stats / Fact 1 */}
          <div className="bg-deep-navy rounded-lg p-8 text-surface-white flex flex-col justify-center items-center text-center shadow-lg transform hover:scale-[1.02] transition-transform">
            <span className="material-symbols-outlined text-action-orange mb-4 text-[48px]" data-icon="speed">speed</span>
            <h3 className="font-headline-lg text-headline-lg mb-2">99.99%</h3>
            <p className="font-body-md text-body-md text-secondary-fixed-dim">Uptime Mindset in Every Article</p>
          </div>

          {/* Stats / Fact 2 */}
          <div className="md:col-span-2 lg:col-span-3 bg-surface-white border border-surface-variant rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-center text-center">
            <div className="flex justify-center mb-4">
               <span className="material-symbols-outlined text-primary text-[40px]" data-icon="group">group</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-2 text-deep-navy">For the Community</h3>
            <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">Built by sysadmins and developers, for sysadmins and developers. We share what we learn on the frontlines.</p>
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section className="bg-surface-container-low py-section-gap border-y border-surface-variant">
        <div className="px-margin-edge max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display-lg text-display-lg mb-4 text-deep-navy">Meet the Editors</h2>
            <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">The technical minds curating and authoring the insights you read.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Team Member 1 */}
            <div className="bg-surface-white border border-outline-variant rounded-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
              <div className="h-64 overflow-hidden relative bg-surface-container">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYLSeTtgNfc0Uj7OMpwfgmN9pndCNU_H--OeP_ZzfafGqoD0zO6sIfNPMjS31ONDgpoNVWxhJeh3V8SdNvAanquDE5ZHoPOrvICeQ9cSyCY87AUInnPo9piXTXIHWMG5_ubGRJKCSZD7AoOicGBg7EnS6Rdtw-MRBaq6cFKSuLZXRc6XQdo_Nj9XtKLG2K8CvPhe4FN3Har0T_OLnFDEI2K94sqzgHg4z97dDDyf2lx39J5343a2685A4X02r19nozUfyjJHXoDbSb" alt="Sarah Jenkins" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-headline-md text-headline-md mb-1 text-deep-navy">Sarah Jenkins</h3>
                <p className="font-label-sm text-label-sm text-primary mb-4 uppercase tracking-wider">Lead Cloud Architect</p>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Specializes in Kubernetes deployments, multi-cloud strategy, and high-availability systems.</p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-surface-white border border-outline-variant rounded-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
              <div className="h-64 overflow-hidden relative bg-surface-container">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwWMv0tEn1qGpiw320D7s2QMh0tlXjofjVfGpsnzV7-QiSQhUnFMlVcqowvEcw0Cax6x_s-DlU-B9g-W1jG04ozbRSvkjNx_RyUrt2Jo1z3V8Q5bIPcMuqHI0RQ0TbRZEYW8V4AYg-tI4u73X7EsBHMbmVYhNTaLRQNkw5UGFsVBspeS1avUfaRYKobGnPq-LroCzQ7lFlVglfVNikJYr7mKkynoU4Oxe8Qah0bQDUMkHaxiNPgUi0Dq8t-HFvY4hO8NknyTE9CdJT" alt="David Chen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-headline-md text-headline-md mb-1 text-deep-navy">David Chen</h3>
                <p className="font-label-sm text-label-sm text-primary mb-4 uppercase tracking-wider">Senior Security Analyst</p>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Focuses on zero-trust architecture, penetration testing, and compliance frameworks.</p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-surface-white border border-outline-variant rounded-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
              <div className="h-64 overflow-hidden relative bg-surface-container">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuClQYsG5Jwu5edMAShFA-mU2YPaip2ngahUm_XN_Ez4zoWOPV1o1oykDfiOLat2cU4nolN85gO1xY8bQAbvVEtzRooq2Vewpq6ByyqZ4xqtReV38_EozsaV3Lsg_cjXeSmvIHQ5Rjd5hjsww5HY1BknUcutJdiyfEXTNZ4LwNm8MLRw54eVqgQ6J6fZohpiEvdXrY3oVQGDJ0QLySt6CKpaOO_UEh7xfdWfOQ74RQDG7_oRbtAkwTvlJvvdP2-pqWunMObUDObiRZ7W" alt="Elena Rodriguez" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-headline-md text-headline-md mb-1 text-deep-navy">Elena Rodriguez</h3>
                <p className="font-label-sm text-label-sm text-primary mb-4 uppercase tracking-wider">Infrastructure Dev</p>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Writes about CI/CD pipelines, automation scripts, and optimizing server performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-gap px-margin-edge max-w-container-max mx-auto text-center">
        <div className="bg-deep-navy rounded-xl p-12 shadow-lg relative overflow-hidden transform hover:scale-[1.01] transition-transform">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-container rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-action-orange rounded-full opacity-10 blur-2xl"></div>
          <h2 className="font-display-lg text-display-lg mb-6 text-surface-white relative z-10">Have a topic you want us to cover?</h2>
          <p className="font-body-lg text-body-lg text-secondary-fixed-dim max-w-2xl mx-auto mb-10 relative z-10">
            We are always looking for new challenges and architectural problems to dissect. Reach out to our editorial team with your suggestions or technical questions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button className="bg-action-orange text-surface-white px-8 py-3 rounded font-headline-md text-headline-md hover:opacity-90 transition-opacity shadow-sm">Contact Editors</button>
            <button className="border border-outline-variant text-surface-white px-8 py-3 rounded font-headline-md text-headline-md hover:bg-surface-white hover:text-deep-navy transition-colors">Submit Guest Post</button>
          </div>
        </div>
      </section>
    </main>
  );
}
