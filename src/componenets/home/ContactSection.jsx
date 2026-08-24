import rootsImage from "../../assets/roots.jpg";

function ContactSection() {
  return (
    <section
      className="
        relative min-h-[70vh]
        overflow-hidden
        bg-[#362F22]
        flex flex-col
        items-center justify-center
        px-6
        text-center
      "
    >
      {/* Roots background */}
      <div
        className="
    absolute inset-0
    scale-105
    bg-cover
    bg-center
    blur-[4px]
    opacity-35
  "
        style={{
          backgroundImage: `url(${rootsImage})`,
        }}
      />

      {/* Dark earthy overlay */}
      <div
        className="
          absolute inset-0
          bg-[#362F22]/70
        "
      />

      {/* Soft green atmosphere */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-[#556F30]/20
          blur-3xl
        "
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <span
          dir="ltr"
          className="
            mb-4
            block
            font-sans
            text-sm
            tracking-[0.3em]
            text-[#A2B447]/70
          "
        >
          تواصل
        </span>

        <h2
          dir="rtl"
          className="
            font-[Katibeh]
            text-6xl
            text-[#EFF4BD]
            drop-shadow-[0_0_20px_rgba(239,244,189,0.2)]
            md:text-8xl
          "
        >
          تواصل معنا
        </h2>

        <p
          dir="rtl"
          className="
            mx-auto
            mt-5
            max-w-xl
            text-lg
            leading-relaxed
            text-[#EFF4BD]/80
            md:text-xl
          "
        >
          لديك سؤال أو اقتراح؟
          <br />
          يسعدنا أن نسمع منك
        </p>

        {/* Decorative line */}
        <div className="mx-auto mt-8 h-px w-24 bg-[#A2B447]/50" />

        <p
          dir="rtl"
          className="
            mt-6
            text-sm
            text-[#EFF4BD]/50
          "
        >
          نماء — حيث تبدأ العناية وتنمو الحياة
        </p>
      </div>
    </section>
  );
}

export default ContactSection;
