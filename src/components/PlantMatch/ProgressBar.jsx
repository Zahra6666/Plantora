function ProgressBar({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div className="mx-auto mb-10 w-full max-w-4xl">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-katibeh text-xl text-[#EFF4BD]">
          التقدم
        </span>

        <span className="text-sm font-semibold text-[#EFF4BD]/60">
          {current} / {total}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#23361A]/70">
        <div
          className="h-full rounded-full bg-[#A2B447] transition-all duration-700 ease-out"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;