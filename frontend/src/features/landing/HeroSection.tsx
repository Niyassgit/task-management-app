import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-amber-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Small tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8 backdrop-blur-sm">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <span
            className="text-amber-200 text-sm font-medium tracking-wide"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            PRODUCTIVITY REIMAGINED
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] mb-8 tracking-tight">
          <span
            className="block"
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
          >
            Stop planning.
          </span>
          <span
            className="block bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent"
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
          >
            Start doing.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
          style={{ fontFamily: "Georgia, serif" }}
        >
          A task manager that gets out of your way. No complexity. No clutter.
          Just you and your next move.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/login`)}
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-lg rounded-none overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Get Started Free
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>

          <button className="px-8 py-4 border-2 border-white/20 text-white font-bold text-lg rounded-none hover:bg-white/5 hover:border-white/40 transition-all duration-300 backdrop-blur-sm">
            Watch Demo
          </button>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {[
            {
              number: "01",
              title: "Lightning Fast",
              desc: "Add tasks faster than you think them",
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
            },
            {
              number: "02",
              title: "Zero Friction",
              desc: "No learning curve. Just works",
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ),
            },
            {
              number: "03",
              title: "Always Synced",
              desc: "Every device. Instantly",
              icon: (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              ),
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-black/60 backdrop-blur-sm p-8 hover:bg-black/80 transition-all duration-300 group cursor-pointer border-r border-white/5 last:border-r-0"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-amber-500 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <span className="text-amber-500/40 text-sm font-mono">
                  {feature.number}
                </span>
              </div>
              <h3
                className="text-white text-xl font-bold mb-2"
                style={{ fontFamily: '"Helvetica Neue", sans-serif' }}
              >
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/10">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-4xl font-black text-white mb-1">50K+</div>
              <div className="text-gray-500 text-sm">Active Users</div>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div>
              <div className="text-4xl font-black text-white mb-1">1M+</div>
              <div className="text-gray-500 text-sm">Tasks Completed</div>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div>
              <div className="text-4xl font-black text-white mb-1">4.9★</div>
              <div className="text-gray-500 text-sm">User Rating</div>
            </div>
          </div>

          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-black flex items-center justify-center text-black font-bold"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="w-12 h-12 rounded-full bg-white/10 border-2 border-black flex items-center justify-center text-white text-xs font-bold backdrop-blur-sm">
              +45K
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default HeroSection;
