function FeatureCard({
  href,
  number,
  title,
  description,
  gradient,
  titleColor,
  textColor,
  decoration,
  decorationPosition,
  glowPosition,
  glowColor,
  actionText,
}) {
  return (
    <a
      href={href}
      className={`
        feature-card
        group relative flex h-[52vh] w-[48vw] max-w-[620px]
        shrink-0 cursor-pointer flex-col justify-between
        overflow-hidden rounded-[3rem]
        border border-[#EFF4BD]/20
        ${gradient}
        p-10 shadow-2xl
        transition-shadow duration-700
        hover:shadow-[0_25px_60px_rgba(35,54,26,0.4)]
        md:p-14
      `}
    >
      {/* Glow */}
      <div
        className={`
          absolute ${glowPosition}
          h-60 w-60 rounded-full
          ${glowColor}
          blur-3xl
          transition-all duration-700
          group-hover:scale-150
        `}
      />

      {/* Decoration */}
      <div
        className={`
          absolute ${decorationPosition}
          text-8xl opacity-10
          transition-all duration-700
          group-hover:scale-110
          group-hover:opacity-30
        `}
      >
        {decoration}
      </div>

      {/* Number */}
      <span
        dir="ltr"
        className="
          relative z-10
          font-sans text-sm tracking-[0.3em]
          text-[#EFF4BD]/70
        "
      >
        {number}
      </span>

      {/* Content */}
      <div className="relative z-10" dir="rtl">
        <h2
          className={`
            font-[Katibeh]
            text-6xl
            ${titleColor}
            transition-transform duration-700
            group-hover:-translate-x-2
            md:text-7xl
          `}
        >
          {title}
        </h2>

        <p
          className={`
            mt-4 max-w-md
            text-lg leading-relaxed
            ${textColor}
            md:text-xl
          `}
        >
          {description}
        </p>
      </div>

      {/* Action */}
      <div
        className={`
          relative z-10 flex items-center justify-between
          ${textColor}
        `}
      >
        <span className="text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {actionText}
        </span>

        <span className="text-3xl transition-transform duration-500 group-hover:-translate-x-3">
          ←
        </span>
      </div>
    </a>
  );
}

export default FeatureCard;
