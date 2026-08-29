import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import gardenVideo from "../../assets/garden.mp4";

function Hero() {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "back.out(1.7)",
        },
      );

      gsap.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={gardenVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-[#23361A]/30" />

      <div className="relative z-10 flex h-full -translate-y-15 flex-col items-center justify-center text-center">
        <h1
          ref={titleRef}
          dir="rtl"
          className="
            cursor-pointer select-none
            font-[Katibeh]
            text-7xl font-normal
            text-[#EFF4BD]
            transition-all duration-500
            hover:-translate-y-2
            drop-shadow-[0_0_18px_rgba(239,244,189,0.45)]
            md:text-8xl
          "
        >
          نَمَاء
        </h1>

        <p
          ref={descriptionRef}
          dir="rtl"
          className="
            mt-4 max-w-xl
            text-lg text-[#EFF4BD]
            drop-shadow-[0_0_13px_rgba(239,244,189,0.45)]
            md:text-xl
          "
        >
          رَفيقكَ لِلْعِنَايَة بِالنَّبَاتَات وَاِكْتِشَاف عَالَمهَا
        </p>
      </div>
    </section>
  );
}

export default Hero;
