"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WELCOME", "ITZFIZZ"];
const STATS = [
  { value: "58%", label: "more leads from redesigned landing pages" },
  { value: "27%", label: "faster average page load" },
  { value: "40%", label: "lift in mobile conversions" },
];

function Wheel({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 108)`}>
      <g className="wheel">
        <circle r="27" fill="#0b1240" stroke="#ffffff" strokeWidth="3" />
        <circle r="15" fill="#e8edff" />
        <path d="M0 -15V15M-15 0H15M-10.6 -10.6L10.6 10.6M10.6 -10.6L-10.6 10.6" stroke="#0b1240" strokeWidth="3" />
        <circle r="4" fill="#0b1240" />
        <circle cx="20" cy="0" r="3" fill="#ff7a1a" />
      </g>
    </g>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const car = el.querySelector<SVGSVGElement>(".car")!;
      const carWidth = () => car.getBoundingClientRect().width;
      const wheels = Array.from(el.querySelectorAll<SVGGElement>(".wheel"));
      const spin = { deg: 0 };

      // 1. Intro: staggered headline, then stats one by one
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".letter", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.05 })
        .fromTo(".stat", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.25 }, "-=0.3");

      // 2. Scroll: pinned hero, motion tied to scroll progress
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=1300",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(car, { x: () => -carWidth() }, { x: () => window.innerWidth, duration: 1 }, 0)
        .to(
          spin,
          {
            deg: 1080,
            duration: 1,
            onUpdate: () => wheels.forEach((w) => w.setAttribute("transform", `rotate(${spin.deg})`)),
          },
          0
        )
        .fromTo(".dashes", { x: 0 }, { x: -420, duration: 1 }, 0)
        .fromTo(
          ".letter",
          { color: "#cdd5ff" },
          { color: "#ffffff", stagger: 0.04, duration: 0.3, immediateRender: false },
          0.1
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-svh overflow-hidden">
      <div className="absolute inset-x-0 top-[12%] px-4 text-center">
        <h1
          aria-label="Welcome Itzfizz"
          className="display text-[clamp(1rem,4.2vw,3.2rem)] font-medium leading-tight"
        >
          {WORDS.map((word, i) => (
            <span key={word} aria-hidden="true" className={i === 0 ? "mr-[.9em]" : ""}>
              {[...word].map((ch, j) => (
                <span key={j} className="letter mx-[.12em] inline-block">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-3 gap-3 sm:gap-8">
          {STATS.map((s) => (
            <div key={s.value} className="stat">
              <p className="display text-[clamp(1.4rem,5vw,3.2rem)] font-bold">{s.value}</p>
              <p className="text-sm font-semibold sm:text-lg">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="road">
        <div className="dashes" />
      </div>

      <svg className="car" viewBox="0 0 400 140" aria-hidden="true" style={{ overflow: "visible" }}>
        <ellipse cx="200" cy="132" rx="170" ry="7" fill="rgba(0,0,0,.28)" />
        <path
          d="M14 96 C14 82 30 76 62 72 L110 42 C118 36 128 34 140 34 L250 34 C266 34 276 38 286 48 L322 70 C356 74 386 80 386 98 L386 108 L14 108 Z"
          fill="#ff7a1a"
        />
        <path
          d="M122 50 L150 42 L196 42 L196 72 L104 72 Z M208 42 L252 42 C258 42 262 44 266 48 L288 72 L208 72 Z"
          fill="#cfe0ff"
        />
        <rect x="16" y="94" width="26" height="6" rx="3" fill="#fff3b0" />
        <rect x="360" y="90" width="24" height="7" rx="3" fill="#ffd0d0" />
        <Wheel x={96} />
        <Wheel x={306} />
      </svg>
    </section>
  );
}