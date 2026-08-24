import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "./FeatureCard";

gsap.registerPlugin(ScrollTrigger);

function FeaturesSection() {
  const horizontalRef = useRef(null);
  const cardsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalTween = gsap.to(cardsRef.current, {
        x: () =>
          -(cardsRef.current.scrollWidth - horizontalRef.current.offsetWidth),

        ease: "none",

        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top top",
          end: () =>
            `+=${cardsRef.current.scrollWidth - horizontalRef.current.offsetWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const cards = gsap.utils.toArray(".feature-card");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            scale: 0.82,
            opacity: 0.35,
          },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",

            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 80%",
              end: "left 45%",
              scrub: true,
            },
          },
        );
      });
    }, horizontalRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={horizontalRef}
      dir="ltr"
      className="relative h-screen overflow-hidden bg-[#556F30]"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="
            absolute -left-40 top-10
            h-[500px] w-[500px]
            rounded-full
            bg-[#A2B447]/40
            blur-3xl
          "
        />

        <div
          className="
            absolute -bottom-40 -right-40
            h-[600px] w-[600px]
            rounded-full
            bg-[#556F30]/30
            blur-3xl
          "
        />

        <div
          className="
            absolute left-[20%] top-[15%]
            h-6 w-6 rounded-full
            bg-[#A2B447]/50
          "
        />

        <div
          className="
            absolute left-[60%] top-[70%]
            h-3 w-3 rounded-full
            bg-[#516F7A]/40
          "
        />

        <div
          className="
            absolute right-[15%] top-[25%]
            h-10 w-10 rounded-full
            bg-[#556F30]/20
          "
        />
      </div>

      {/* ONLY THIS MOVES HORIZONTALLY */}
      <div
        ref={cardsRef}
        className="
          relative z-10
          flex h-full w-max
          items-center
          gap-[8vw]
          px-[15vw]
        "
      >
        <FeatureCard
          href="/my-plants"
          number="01"
          title="نباتاتي"
          description="نظّم نباتاتك وتابع احتياجاتها ومواعيد العناية بها."
          gradient="bg-gradient-to-br from-[#A2B447] via-[#A2B447] to-[#556F30]"
          titleColor="text-[#362F22]"
          textColor="text-[#362F22]/80"
          decoration="🍃"
          decorationPosition="-right-4 top-8 rotate-12 group-hover:rotate-0"
          glowPosition="-right-20 -top-20"
          glowColor="bg-[#EFF4BD]/20"
          actionText="اكتشف المزيد"
        />

        <FeatureCard
          href="/plant-doctor"
          number="02"
          title="تشخيص النباتات"
          description="تعرّف على نباتك واكتشف حالته الصحية واحتياجاته."
          gradient="bg-gradient-to-br from-[#516F7A] via-[#516F7A] to-[#23361A]"
          titleColor="text-[#A2B447]"
          textColor="text-[#EFF4BD]/80"
          decoration="🌿"
          decorationPosition="-left-4 bottom-12 -rotate-12 group-hover:rotate-0"
          glowPosition="-left-20 -top-20"
          glowColor="bg-[#A2B447]/20"
          actionText="ابدأ التشخيص"
        />

        <FeatureCard
          href="/discover"
          number="03"
          title="اكتشف نبتتك"
          description="اعثر على النباتات التي تتوافق مع منزلك وأسلوب حياتك."
          gradient="bg-gradient-to-br from-[#23361A] via-[#23361A] to-[#362F22]"
          titleColor="text-[#EFF4BD]"
          textColor="text-[#EFF4BD]/75"
          decoration="🌱"
          decorationPosition="right-8 bottom-2"
          glowPosition="-right-20 -bottom-20"
          glowColor="bg-[#A2B447]/15"
          actionText="اكتشف الآن"
        />
      </div>
    </section>
  );
}

export default FeaturesSection;
