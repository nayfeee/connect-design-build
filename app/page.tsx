"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const navItems = ["Home", "Services", "Projects", "About", "Contact"];

const services = [
  {
    title: "Extensions",
    copy: "Considered home extensions designed to add space, value and a finish that feels integrated with the property.",
  },
  {
    title: "Full Refurbishments",
    copy: "Complete property transformations managed with clear communication from strip-out to final finish.",
  },
  {
    title: "Kitchens",
    copy: "Sharp kitchen upgrades with refined detailing, practical layouts and a high-end residential feel.",
  },
  {
    title: "Bathrooms",
    copy: "Clean, modern bathroom installations with careful finishing, lighting and material choices.",
  },
  {
    title: "External Works",
    copy: "Exterior improvements that lift kerb appeal and help properties look sharper and better maintained.",
  },
  {
    title: "Property Development",
    copy: "Build and refurbishment support for property clients improving or preparing homes for market.",
  },
];

const galleryImages = Array.from(
  { length: 10 },
  (_, i) => `/images/gallery/gallery${i + 1}.jpg`
);

const galleryLayouts = [
  [
    "lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2",
    "lg:col-start-3 lg:row-start-1",
    "lg:col-start-4 lg:row-start-1",
    "lg:col-start-3 lg:row-start-2",
    "lg:col-start-4 lg:row-start-2",
    "lg:col-start-1 lg:col-span-2 lg:row-start-3",
    "lg:col-start-3 lg:row-start-3",
    "lg:col-start-4 lg:row-start-3",
  ],
  [
    "lg:col-start-1 lg:row-start-1",
    "lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2",
    "lg:col-start-4 lg:row-start-1",
    "lg:col-start-1 lg:row-start-2",
    "lg:col-start-4 lg:row-start-2",
    "lg:col-start-1 lg:col-span-2 lg:row-start-3",
    "lg:col-start-3 lg:row-start-3",
    "lg:col-start-4 lg:row-start-3",
  ],
  [
    "lg:col-start-1 lg:col-span-2 lg:row-start-1",
    "lg:col-start-3 lg:row-start-1",
    "lg:col-start-4 lg:row-start-1",
    "lg:col-start-1 lg:row-start-2",
    "lg:col-start-2 lg:row-start-2",
    "lg:col-start-3 lg:col-span-2 lg:row-start-2 lg:row-span-2",
    "lg:col-start-1 lg:row-start-3",
    "lg:col-start-2 lg:row-start-3",
  ],
];

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[#e6884b]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.09 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.6 2.5a2 2 0 0 1-.45 2.11L9 10.59a16 16 0 0 0 4.41 4.41l1.26-1.26a2 2 0 0 1 2.11-.45c.8.28 1.64.48 2.5.6A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[#e6884b]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-[#e6884b]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryStart, setGalleryStart] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(true);
  const [introVisible, setIntroVisible] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setIntroLeaving(true), 950);
    const removeTimer = setTimeout(() => setIntroVisible(false), 1650);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (galleryPaused) return;

    const timer = setInterval(() => {
      setGalleryVisible(false);

      setTimeout(() => {
        setGalleryStart((current) => (current + 1) % galleryImages.length);
        setGalleryVisible(true);
      }, 450);
    }, 5000);

    return () => clearInterval(timer);
  }, [galleryPaused]);

  const visibleGallery = Array.from(
    { length: 8 },
    (_, i) => galleryImages[(galleryStart + i) % galleryImages.length]
  );

  const activeLayout = galleryLayouts[galleryStart % galleryLayouts.length];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f4ef] text-black">
      <style jsx global>{`
        @keyframes mobile-call-wobble {
          0%, 92%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          94% {
            transform: translateX(-1px) rotate(-0.6deg);
          }
          96% {
            transform: translateX(1px) rotate(0.6deg);
          }
          98% {
            transform: translateX(-0.5px) rotate(-0.3deg);
          }
        }

        .mobile-call-wobble {
          animation: mobile-call-wobble 5s ease-in-out infinite;
        }
      `}</style>
      {introVisible && (
        <div
          className={`fixed inset-0 z-[999] flex items-center justify-center bg-white transition-all duration-700 ease-out ${
            introLeaving ? "pointer-events-none opacity-0 blur-md" : "opacity-100 blur-0"
          }`}
        >
          <Image
            src="/images/logo.jpg"
            alt="Connect Design & Build"
            width={190}
            height={95}
            priority
            className={`object-contain transition-all duration-700 ease-out ${
              introLeaving ? "scale-[1.55] opacity-0 blur-md" : "scale-100 opacity-100 blur-0"
            }`}
            style={{ width: "190px", height: "auto" }}
          />
        </div>
      )}

      <header className="fixed top-0 z-50 w-full md:pointer-events-none">
        <div
          className={`hidden transition-all duration-500 md:block ${
            scrolled
              ? "mt-0 w-full max-w-none px-0"
              : "mx-auto mt-5 max-w-7xl px-6"
          }`}
        >
          {!scrolled ? (
            <div className="pointer-events-auto grid h-[172px] grid-cols-[260px_1fr_220px] grid-rows-[68px_104px] overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5">
              <a
                href="#"
                className="row-span-2 flex items-center justify-center bg-white px-7"
              >
                <Image
                  src="/images/logo.jpg"
                  alt="Connect Design & Build"
                  width={180}
                  height={110}
                  className="h-[128px] w-auto object-contain"
                  priority
                />
              </a>

              <div className="col-span-1 flex h-full items-center justify-end gap-8 rounded-bl-[2rem] bg-[#050505] px-9 text-sm font-black text-white">
                <a
                  href="tel:07875196719"
                  className="flex items-center gap-2 hover:text-[#e6884b]"
                >
                  <PhoneIcon />
                  07875 196 719
                </a>

                <a
                  href="https://instagram.com/connectdesignbuild"
                  className="flex items-center gap-2 hover:text-[#e6884b]"
                >
                  <InstagramIcon />
                  @connectdesignbuild
                </a>

                <span className="flex items-center gap-2 text-white/90">
                  <ClockIcon />
                  Mon - Fri: 08:00 AM to 06:00 PM
                </span>
              </div>

              <a
                href="tel:07875196719"
                className="flex h-full items-center justify-center bg-[#e6884b] px-6 text-[1.4rem] font-black uppercase tracking-[0.08em] text-white transition hover:bg-black"
              >
                Call Now
              </a>

              <nav className="flex items-center justify-center gap-10 text-xs font-black uppercase tracking-[0.18em]">
                {navItems.map((item) => (
                  <a key={item} href="#" className="transition hover:text-[#e6884b]">
                    {item}
                  </a>
                ))}
              </nav>

              <div className="bg-white" />
            </div>
          ) : (
            <div className="pointer-events-auto flex h-[112px] w-full items-center justify-between bg-white px-10 shadow-md ring-1 ring-black/5">
              <a href="#" className="flex items-center">
                <Image
                  src="/images/logo.jpg"
                  alt="Connect Design & Build"
                  width={150}
                  height={90}
                  className="h-[88px] w-auto object-contain"
                  priority
                />
              </a>

              <nav className="flex items-center gap-10 text-xs font-black uppercase tracking-[0.18em]">
                {navItems.map((item) => (
                  <a key={item} href="#" className="transition hover:text-[#e6884b]">
                    {item}
                  </a>
                ))}
              </nav>

              <a
                href="tel:07875196719"
                className="rounded-full bg-[#e6884b] px-8 py-4 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-black"
              >
                Call Now
              </a>
            </div>
          )}
        </div>

        <div className="bg-white shadow-sm md:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-[92px_1fr_auto] items-center gap-3 px-4 py-3">
            <a href="#" className="flex items-center justify-start">
              <Image
                src="/images/logo.jpg"
                alt="Connect Design & Build"
                width={104}
                height={54}
                className="object-contain opacity-[0.96]"
                style={{ width: "92px", height: "auto" }}
                priority
              />
            </a>

            <a
              href="tel:07875196719"
              className="mobile-call-wobble rounded-full bg-[#e6884b] px-3 py-3 text-center text-xs font-black uppercase tracking-[0.08em] text-white transition hover:bg-black"
            >
              Call Now
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white"
            >
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-black" />
                <span className="block h-0.5 w-5 rounded-full bg-black" />
                <span className="block h-0.5 w-5 rounded-full bg-black" />
              </span>
            </button>
          </div>

          {menuOpen && (
            <div className="border-t border-black/10 bg-white px-5 py-5">
              <div className="flex flex-col gap-4 text-center text-lg font-black">
                {navItems.map((item) => (
                  <a key={item} href="#" onClick={() => setMenuOpen(false)}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="relative h-screen overflow-hidden">
  <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/42 to-black/78 md:bg-gradient-to-r md:from-black/82 md:via-black/18 md:to-transparent" />

  <div className="absolute inset-y-0 left-0 z-10 hidden w-[40%] bg-gradient-to-r from-black/45 via-black/12 to-transparent md:block" />

  <div className="absolute -left-24 top-1/2 z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#e6884b]/10 blur-3xl md:h-[520px] md:w-[520px]" />

  <Image
    src="/images/kitchen.png"
    alt="Luxury Connect Design & Build kitchen renovation"
    fill
    sizes="100vw"
    className="object-cover saturate-[0.98] contrast-[1.04] brightness-[0.92] md:hidden"
    style={{ objectPosition: "center center" }}
    priority
  />

  <Image
    src="/images/hero.png"
    alt="Connect Design & Build project"
    fill
    sizes="100vw"
    className="hidden object-cover saturate-[0.98] contrast-[1.04] brightness-[1.03] md:block"
    style={{ objectPosition: "center 48%" }}
    priority
  />

        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 md:px-6 md:pb-8 md:pt-[205px] lg:pt-[205px]">
          <div className="flex h-[calc(100vh-92px)] items-center md:h-full"><div className="w-full translate-y-8 md:translate-y-0">
            <div className="max-w-[820px] animate-fade-up text-white">
              <p className="mb-3 inline-flex rounded-full bg-[#e6884b] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] md:text-[11px]">
                Design • Build • Invest
              </p>

              <h1 className="max-w-[18ch] text-[2.25rem] font-black leading-[0.88] tracking-tight sm:text-[2.8rem] md:hidden">
                High-end building, renovation & property development across Cheshire.
              </h1>

              <h1 className="hidden max-w-[22ch] text-[3rem] font-black leading-[0.9] tracking-tight md:block lg:text-[3.25rem] xl:text-[3.45rem] 2xl:text-[3.6rem]">
                High-end building, renovation & property development across Cheshire.
              </h1>

              <div className="mt-4 grid gap-2 text-sm font-bold leading-5 text-white/90 md:hidden">
                {[
                  "Extensions",
                  "Kitchens",
                  "Bathrooms",
                  "Full Refurbishments",
                  "Loft Conversions",
                  "Garden Rooms & Landscaping",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#e6884b] text-[10px] font-black leading-none text-white">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid w-full max-w-[270px] grid-cols-1 gap-4 md:mt-5 md:max-w-[500px] md:grid-cols-2">
                <a
                  href="tel:07875196719"
                  className="hidden rounded-full bg-[#e6884b] px-4 py-3 text-center text-sm font-black text-white transition hover:bg-white hover:text-black md:block md:py-3.5"
                >
                  Call Now
                </a>
                <a
                  href="#quote-form"
                  className="rounded-full border border-white/60 bg-white/10 px-4 py-3 text-center text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-black md:py-3.5"
                >
                  Request Quote
                </a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-4 pb-10 pt-14 md:px-5 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="font-black uppercase tracking-[0.25em] text-[#e6884b]">What We Do</p>
            <h2 className="mt-3 max-w-4xl text-[2rem] font-black leading-[0.95] tracking-tight md:text-5xl">
              Building, renovating and transforming homes across Cheshire.
            </h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5">
              <Image src="/images/kitchen.png" alt="Luxury kitchen renovation" width={1200} height={900}
                className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]" />
            </div>
            <div className="space-y-6">
              {[
                ["Full House Refurbishments","Complete transformations managed from strip-out through to final finish."],
                ["High-End Kitchens","Premium kitchen renovations designed around modern living."],
                ["Bathrooms","Beautiful, functional bathroom spaces finished to a high standard."],
                ["Loft Conversions","Unlock valuable extra living space within your existing home."],
                ["Extensions","Beautifully integrated extensions that create more space and add value."],
                ["Garden Rooms & Offices","Purpose-built spaces for work, leisure and family life."],
                ["Exterior Renovations & Landscaping","Improve kerb appeal with considered exterior and garden improvements."],
              ].map(([title, copy]) => (
                <div key={title} className="border-b border-black/10 pb-5 last:border-0">
                  <div className="mb-3 h-1.5 w-12 rounded-full bg-[#e6884b]" />
                  <h3 className="text-xl font-black tracking-tight">{title}</h3>
                  <p className="mt-2 leading-7 text-black/65">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-5 md:py-24">
        <div className="mb-8 grid gap-5 md:mb-10 md:grid-cols-[0.9fr_1fr] md:items-end">
          <div>
            <p className="font-black uppercase tracking-[0.25em] text-[#e6884b]">
              Recent Work
            </p>
            <h2 className="mt-3 max-w-3xl text-[2rem] font-black leading-[0.95] tracking-tight md:text-5xl">
              Finished to be noticed.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/65 md:ml-auto md:text-base">
            A curated selection of completed projects across Cheshire, including
            refurbishments, interiors, bathrooms, kitchens and development work.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 gap-4 transition-opacity duration-700 ease-out sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[210px] ${
            galleryVisible ? "opacity-100" : "opacity-0"
          }`}
          onMouseEnter={() => setGalleryPaused(true)}
          onMouseLeave={() => setGalleryPaused(false)}
        >
          {visibleGallery.map((src, index) => (
            <div
              key={`${src}-${index}-${galleryStart}`}
              className={`group relative h-[230px] overflow-hidden rounded-[1.4rem] bg-black shadow-sm ring-1 ring-black/5 transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl sm:h-[260px] lg:h-auto lg:rounded-[1.5rem] ${
                activeLayout[index]
              }`}
            >
              <Image
                src={src}
                alt={`Connect Design & Build gallery image ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                loading={index < 2 ? "eager" : "lazy"}
                className="object-cover saturate-[0.92] contrast-[1.02] brightness-[0.98] transition-all duration-1000 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-5 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <p className="font-black uppercase tracking-[0.25em] text-[#e6884b]">
              Why Connect
            </p>
            <h2 className="mt-3 max-w-3xl text-[2rem] font-black leading-[0.95] tracking-tight md:text-5xl">
              One team for the full project.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-black/70 md:text-lg">
            <p>
              Whether it’s an extension, a full home refurbishment, a kitchen redesign,
              a bathroom upgrade or property development work, Connect Design & Build
              bring the trades together under one clear point of contact.
            </p>
            <p>
              Based in Cheshire, the team works with homeowners and property clients who
              want practical building knowledge, smart finishes and a job that feels
              organised from first conversation to final clean-up.
            </p>
            <a
              href="tel:07875196719"
              className="inline-flex rounded-full bg-[#e6884b] px-7 py-3.5 text-sm font-black text-white transition hover:bg-black"
            >
              CONNECT with us
            </a>
          </div>
        </div>
      </section>

      <section id="quote-form" className="bg-[#101010] px-4 py-16 text-white md:px-5 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="font-black uppercase tracking-[0.25em] text-[#e6884b]">Request A Consultation</p>
            <h2 className="mt-3 text-[2rem] font-black leading-[0.95] tracking-tight md:text-5xl">Ready to discuss your project?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/65">Tell us a little about your project and we'll be in touch to discuss your plans.</p>
          </div>
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-6 text-black shadow-2xl md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <input className="field" placeholder="Your Name" />
              <input className="field" placeholder="Phone Number" />
              <select className="field md:col-span-2">
                <option>Project Type</option>
                <option>Full Refurbishment</option>
                <option>Kitchen Renovation</option>
                <option>Bathroom Renovation</option>
                <option>Loft Conversion</option>
                <option>Garden Room / Office</option>
                <option>Extension</option>
                <option>Landscaping</option>
              </select>
              <textarea className="field min-h-[160px] md:col-span-2" placeholder="Tell us about your project..." />
              <button className="rounded-full bg-[#e6884b] px-8 py-3.5 text-sm font-black text-white transition hover:bg-black md:col-span-2">Request Consultation</button>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-black px-4 py-12 text-white md:px-5">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
          <div>
            <Image
              src="/images/logo.jpg"
              alt="Connect Design & Build"
              width={150}
              height={80}
              className="rounded-xl bg-white p-3"
              style={{ width: "150px", height: "auto" }}
            />
            <p className="mt-5 max-w-md leading-7 text-white/55">
              Multi-trade building services, refurbishments, extensions and property
              development across Cheshire.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#e6884b]">
              Services
            </p>
            <div className="space-y-2 text-white/65">
              <p>Extensions</p>
              <p>Full Home Refurbishments</p>
              <p>High-End Kitchens</p>
              <p>Bathrooms</p>
              <p>Loft Conversions</p>
              <p>Garden Rooms & Offices</p>
              <p>Exterior Renovations & Landscaping</p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#e6884b]">
              Contact
            </p>
            <div className="space-y-3 text-white/65">
              <p className="font-bold text-white">Connect Design & Build</p>
              <p>Cheshire Based</p>
              <a href="tel:07875196719" className="block hover:text-[#e6884b]">
                07875 196 719
              </a>
              <a
                href="https://instagram.com/connectdesignbuild"
                className="flex items-center gap-3 hover:text-[#e6884b]"
              >
                <InstagramIcon />
                @connectdesignbuild
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/35 md:flex-row">
          <p>© Connect Design & Build. All rights reserved.</p>
          <p>Design • Build • Invest</p>
        </div>
      </footer>
    </main>
  );
}
