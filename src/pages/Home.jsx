import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function Home() {
  const titleRef = useRef(null);

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
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <center>
        <h1
          ref={titleRef}
          className="font-[Tajawal] text-7xl md:text-8xl font-extrabold text-[#315C3A] "
        >
          نماء
        </h1>
      </center>
    </main>
  );
}

export default Home;
