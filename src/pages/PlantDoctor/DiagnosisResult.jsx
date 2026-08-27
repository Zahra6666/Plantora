function DiagnosisResult({ diagnosis, image, onReset }) {
  if (!diagnosis) return null;

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Result header */}
      <div className="mb-8 text-center">
        <div className="mb-3 text-5xl">🌿</div>

        <h2 className="font-[Katibeh] text-6xl text-[#A2B447]">
          نتيجة التشخيص
        </h2>

        <p className="mt-2 text-[#EFF4BD]/60">
          إليك ما اكتشفه طبيب النباتات عن نبتتك
        </p>
      </div>

      {/* Result layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image card */}
        {image && (
          <div className="flex min-h-[500px] items-center justify-center rounded-[2.5rem] border border-[#EFF4BD]/15 bg-[#516F7A]/20 p-6 shadow-2xl backdrop-blur-md">
            <img
              src={URL.createObjectURL(image)}
              alt="النبتة"
              className="max-h-[450px] max-w-full rounded-3xl object-contain shadow-2xl"
            />
          </div>
        )}

        {/* Information */}
        <div className="grid gap-4">
          {/* Plant name */}
          <div className="rounded-3xl border border-[#A2B447]/10 bg-[#516F7A]/20 p-6 shadow-lg backdrop-blur-md">
            <span className="text-sm text-[#A2B447]/70">اسم النبتة</span>

            <h3 className="mt-2 text-2xl font-bold text-[#EFF4BD]">
              🌱 {diagnosis.plantName}
            </h3>
          </div>

          {/* Health */}
          <div className="rounded-3xl border border-[#A2B447]/10 bg-[#516F7A]/20 p-6 shadow-lg backdrop-blur-md">
            <span className="text-sm text-[#A2B447]/70">الصحة العامة</span>

            <h3 className="mt-2 text-xl font-bold text-[#EFF4BD]">
              🩺 {diagnosis.health}
            </h3>
          </div>

          {/* Condition */}
          <div className="rounded-3xl border border-[#A2B447]/10 bg-[#516F7A]/20 p-6 shadow-lg backdrop-blur-md">
            <span className="text-sm text-[#A2B447]/70">حالة النبتة</span>

            <p className="mt-3 leading-relaxed text-[#EFF4BD]/80">
              ❤️ {diagnosis.condition}
            </p>
          </div>
        </div>
      </div>

      {/* Care steps */}
      <div className="mt-6 rounded-[2.5rem] border border-[#A2B447]/10 bg-[#516F7A]/20 p-6 shadow-2xl backdrop-blur-md md:p-8">
        <span className="text-sm text-[#A2B447]/70">نصائح العناية</span>

        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {diagnosis.careSteps?.map((step, index) => (
            <li key={index} className="rounded-2xl bg-[#23361A]/60 p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#A2B447] font-bold text-[#23361A]">
                {index + 1}
              </div>

              <p className="leading-relaxed text-[#EFF4BD]/80">{step}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="
          mt-6 w-full rounded-2xl
          border border-[#A2B447]/40
          px-6 py-4
          font-semibold text-[#A2B447]
          transition-all duration-300
          hover:bg-[#A2B447]
          hover:text-[#23361A]
        "
      >
        تشخيص نبتة أخرى 🌱
      </button>
    </div>
  );
}

export default DiagnosisResult;
