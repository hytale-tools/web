import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/terms')({
  component: TermsOfService
});

function TermsOfService() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/content-upper-3840.jpg"
        alt="Hytale Banner"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90" />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-2xl">
              Terms of Service
            </h1>
            <p className="text-lg text-white/60">
              Last updated: December 14, 2025
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="prose prose-lg prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">About hytl.tools</h2>
                <p className="text-white/80 leading-relaxed">
                  hytl.tools is a free community service that provides Hytale username availability checking. This service is provided free of charge to the Hytale community.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">API Terms of Use</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  By accessing or using the hytl.tools API, you agree to the following terms:
                </p>

                <h3 className="text-xl font-semibold text-white mb-4">Allowed Uses</h3>
                <div className="space-y-3 mb-6">
                  <p className="text-white/80 leading-relaxed flex items-start gap-2">
                    <span className="text-green-400 text-lg">✅</span>
                    <span><strong>Embedding with clear attribution to hytl.tools</strong><br/>
                    You may embed functionality with visible attribution linking back to hytl.tools.</span>
                  </p>
                  <p className="text-white/80 leading-relaxed flex items-start gap-2">
                    <span className="text-green-400 text-lg">✅</span>
                    <span><strong>Open source projects (non-commercial)</strong><br/>
                    You may use the API in open source projects that are non-commercial and properly attributed.</span>
                  </p>
                  <p className="text-white/80 leading-relaxed flex items-start gap-2">
                    <span className="text-green-400 text-lg">✅</span>
                    <span><strong>Creating alternative frontends</strong><br/>
                    You may create your own interface/frontend, provided it remains free and properly attributes hytl.tools.</span>
                  </p>
                  <p className="text-white/80 leading-relaxed flex items-start gap-2">
                    <span className="text-green-400 text-lg">✅</span>
                    <span><strong>Self-hosting</strong><br/>
                    You may self-host your own instance of this service (if source code is available) without restriction.</span>
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">Prohibited Uses</h3>
                <div className="space-y-3">
                  <p className="text-white/80 leading-relaxed flex items-start gap-2">
                    <span className="text-red-400 text-lg">❌</span>
                    <span><strong>Soliciting donations/payments for access to this API</strong><br/>
                    You may not monetize, accept donations, or charge fees for any service that uses this API.</span>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Rate Limits</h2>
                <p className="text-white/80 leading-relaxed">
                  The API is rate-limited to ensure fair access for all users. Excessive use may result in temporary or permanent IP blocking.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Service Availability</h2>
                <p className="text-white/80 leading-relaxed">
                  This service is provided "as is" without any guarantees of uptime or availability. We reserve the right to modify, suspend, or discontinue the service at any time.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Enforcement</h2>
                <p className="text-white/80 leading-relaxed mb-2">
                  Violations of these terms may result in:
                </p>
                <ul className="text-white/80 list-disc pl-6 space-y-1">
                  <li>Blocking of your IP address or domain</li>
                  <li>Reports to hosting providers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                <p className="text-white/80 leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of any changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
                <p className="text-white/80 leading-relaxed">
                  hytl.tools is an unofficial, community-created tool and is not affiliated with or endorsed by Hypixel Studios or Hytale. All Hytale-related trademarks and data remain the property of their respective owners.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
                <p className="text-white/80 leading-relaxed">
                  For questions or permissions:<br/>
                  <strong>Email:</strong> hytl-tools@jackgamesftw.xyz<br/>
                  <strong>Website:</strong> <a href="https://hytl.tools" className="text-cyan-400 hover:text-cyan-300 underline">https://hytl.tools</a>
                </p>
              </section>

              <hr className="border-white/20 my-8" />

              <p className="text-white/60 text-center italic">
                *By using hytl.tools, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.*
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-white/40">Unofficial tool, not affiliated with Hytale</p>
              <div className="flex items-center gap-4 text-sm">
                <a
                  href="https://x.com/jackgamesftw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white/60 transition-colors"
                >
                  made by @jackgamesftw
                </a>
                <span className="text-white/30">•</span>
                <a
                  href="https://github.com/orgs/hytale-tools/repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white/60 transition-colors"
                >
                  source code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
