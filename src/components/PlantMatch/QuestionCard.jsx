function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
}) {
  return (
    <section className="question-card mx-auto w-full max-w-4xl rounded-[2rem] border border-[#EFF4BD]/10 bg-[#362F22]/85 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-10">
      <div className="mb-8">
        <span className="inline-flex rounded-full border border-[#A2B447]/30 bg-[#23361A] px-4 py-2 font-katibeh text-xl text-[#EFF4BD]">
          السؤال {question.id}
        </span>

        <h2 className="mt-5 font-katibeh text-5xl leading-tight text-[#EFF4BD] sm:text-6xl">
          {question.question}
        </h2>

        {question.description && (
          <p className="mt-3 font-katibeh text-xl leading-8 text-[#EFF4BD]/55">
            {question.description}
          </p>
        )}
      </div>

      <div className="grid gap-4">
        {question.options.map((option, index) => {
          const isSelected =
            selectedAnswer === option.value;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                onSelect(option.value)
              }
              className={`question-option group flex w-full items-center gap-4 rounded-2xl border p-5 text-right transition-all duration-300 ${
                isSelected
                  ? "border-[#A2B447] bg-[#556F30]/70 shadow-[0_15px_45px_rgba(162,180,71,0.12)]"
                  : "border-[#EFF4BD]/10 bg-[#23361A]/50 hover:-translate-x-1 hover:border-[#A2B447]/40 hover:bg-[#556F30]/50"
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                  isSelected
                    ? "bg-[#EFF4BD] text-[#23361A]"
                    : "bg-[#556F30] text-[#EFF4BD] group-hover:bg-[#A2B447] group-hover:text-[#23361A]"
                }`}
              >
                {index + 1}
              </span>

              <span className="min-w-0 flex-1">
                <strong className="block font-katibeh text-2xl text-[#EFF4BD]">
                  {option.title}
                </strong>

                {option.description && (
                  <small className="mt-1 block font-katibeh text-lg leading-7 text-[#EFF4BD]/50">
                    {option.description}
                  </small>
                )}
              </span>

              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isSelected
                    ? "border-[#A2B447] bg-[#A2B447]"
                    : "border-[#EFF4BD]/30"
                }`}
              >
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-[#23361A]" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default QuestionCard;