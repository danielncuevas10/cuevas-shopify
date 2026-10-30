"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const HERO_CONTENT = [
  {
    id: 1,
    mobileSrc: "/images/landing/landing1-mobile.png",
    desktopSrc: "/images/landing/landing1-desktop.png",
    title: "Chamarras rompevientos",
    link: "/collections/new-collection",
  },
  {
    id: 2,
    mobileSrc: "/images/landing/motociclista-desktop.png",
    desktopSrc: "/images/landing/motociclista-desktop.png",
    // Wide shot: on phones, frame the red bike instead of the gap between both.
    mobilePosition: "object-[10%_50%]",
    title: "Motociclista",
    link: "/collections/rompevientos",
  },
  {
    id: 3,
    mobileSrc: "/images/landing/baseball-desktop.png",
    desktopSrc: "/images/landing/baseball-desktop.png",
    // Wide shot: on phones, keep the player lifting the trophy in frame.
    mobilePosition: "object-[54%_50%]",
    title: "Jerseys Baseball",
    link: "/collections/baseball",
  },
];

// The first slide is repeated at the end so the loop keeps sliding forward
// (last -> first) instead of rewinding back across every image.
const SLIDES = [...HERO_CONTENT, HERO_CONTENT[0]];
const SLIDE_INTERVAL_MS = 6000;

// Swiping is only enabled below Tailwind's `lg` breakpoint (phones and tablets).
const SWIPE_MEDIA_QUERY = "(max-width: 1023px)";
const SWIPE_THRESHOLD_PX = 50;

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  // null until we know whether the gesture is horizontal (swipe) or vertical (page scroll).
  const isHorizontal = useRef<boolean | null>(null);

  useEffect(() => {
    if (dragging) return;
    const timer = setInterval(() => {
      setAnimate(true);
      setCurrentIndex((prev) => Math.min(prev + 1, HERO_CONTENT.length));
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [currentIndex, dragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!window.matchMedia(SWIPE_MEDIA_QUERY).matches) return;
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    isHorizontal.current = null;
    setDragging(true);
    setAnimate(false);
    // On the first slide, silently switch to its clone at the end so there is
    // a real slide to the left to swipe back to.
    if (currentIndex === 0) setCurrentIndex(HERO_CONTENT.length);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (isHorizontal.current === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      isHorizontal.current = Math.abs(dx) > Math.abs(dy);
    }
    if (isHorizontal.current) setDragOffset(dx);
  };

  const handleTouchEnd = () => {
    if (!touchStart.current) return;
    touchStart.current = null;
    setDragging(false);
    setAnimate(true);

    if (dragOffset <= -SWIPE_THRESHOLD_PX) {
      setCurrentIndex((prev) => (prev >= HERO_CONTENT.length ? 1 : prev + 1));
    } else if (dragOffset >= SWIPE_THRESHOLD_PX) {
      setCurrentIndex((prev) => prev - 1);
    } else if (currentIndex === HERO_CONTENT.length) {
      // Not a swipe: return from the clone to the real first slide.
      setAnimate(false);
      setCurrentIndex(0);
    }
    setDragOffset(0);
  };

  // Once the cloned first slide is fully in view, jump back to the real one
  // without animation so the seam is invisible.
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Ignore transitions bubbling up from children (e.g. the hover overlay).
    if (e.target !== e.currentTarget) return;
    if (currentIndex === HERO_CONTENT.length) {
      setAnimate(false);
      setCurrentIndex(0);
    }
  };

  const goTo = (i: number) => {
    setAnimate(true);
    setCurrentIndex(i);
  };

  const activeDot = currentIndex % HERO_CONTENT.length;

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative w-full h-[80vh] overflow-hidden bg-gray-100 touch-pan-y lg:touch-auto"
    >
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
        }}
        className={`flex h-full will-change-transform ${
          animate
            ? "transition-transform duration-1200 ease-in-out motion-reduce:transition-none"
            : ""
        }`}
      >
        {SLIDES.map((hero, i) => (
          <Link
            key={i}
            href={hero.link}
            aria-hidden={i !== currentIndex}
            tabIndex={i === currentIndex ? 0 : -1}
            className="relative w-full h-full shrink-0 cursor-pointer group"
          >
            <div className="hidden md:block relative w-full h-full">
              <Image
                src={hero.desktopSrc}
                alt={hero.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="block md:hidden relative w-full h-full">
              <Image
                src={hero.mobileSrc}
                alt={hero.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover ${hero.mobilePosition ?? ""}`}
              />
            </div>

            <div className="absolute inset-0 bg-black/10 md:bg-black/30 z-10 transition-opacity duration-300 md:group-hover:bg-black/35" />

            {/* Only the first slide is the page's h1 */}
            {i === 0 ? (
              <h1 className="absolute bottom-28 left-8 md:left-16 z-20 text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tight font-montserrat text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                {hero.title}
              </h1>
            ) : (
              <h2 className="absolute bottom-28 left-8 md:left-16 z-20 text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tight font-montserrat text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                {hero.title}
              </h2>
            )}
          </Link>
        ))}
      </div>

      <div className="absolute bottom-12 left-8 md:left-16 text-[#F4F5F0] z-20">
        <div className="flex gap-6">
          <Link
            href="/collections/womens"
            className="border-b border-[#F4F5F0] pb-1 uppercase text-sm font-bold hover:opacity-50 transition"
          >
            Comprar Mujer
          </Link>
          <Link
            href="/collections/rompevientos"
            className="border-b border-[#F4F5F0] pb-1 uppercase text-sm font-bold hover:opacity-50 transition"
          >
            Comprar Hombre
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 right-8 flex gap-2 z-20">
        {HERO_CONTENT.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            onMouseEnter={() => goTo(i)}
            className={`h-0.5 rounded-full cursor-pointer transition-all duration-300 ${
              i === activeDot ? "w-10 bg-gray-700" : "w-6 bg-gray-100"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
