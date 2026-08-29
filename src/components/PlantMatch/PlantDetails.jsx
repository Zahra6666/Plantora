function PlantDetails({
  plant,
  onClose,
  onAddToMyPlants,
  isAdded,
}) {
  if (!plant) return null;

  const careLevel =
    plant.careLevel === "low"
      ? "سهلة"
      : plant.careLevel === "medium"
      ? "متوسطة"
      : "متقدمة";

  const size =
    plant.size === "small"
      ? "صغير"
      : plant.size === "medium"
      ? "متوسط"
      : "كبير";

  const location =
    plant.location === "bedroom"
      ? "غرفة النوم"
      : plant.location === "living-room"
      ? "غرفة المعيشة"
      : "المكتب";

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-[#23361A]/90 p-4 backdrop-blur-lg"
      onClick={onClose}
    >
      <div
        className="plant-details relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-[#A2B447]/20 bg-[#362F22] shadow-[0_45px_130px_rgba(0,0,0,0.5)]"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#EFF4BD] text-2xl text-[#23361A] transition-all duration-300 hover:rotate-90 hover:bg-[#A2B447]"
        >
          ×
        </button>

        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-[600px]">
            <img
              src={plant.image}
              alt={plant.name}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute bottom-6 left-6 rounded-2xl bg-[#23361A]/90 px-5 py-4 backdrop-blur-md">
              <span className="block font-katibeh text-lg text-[#A2B447]">
                نسبة التوافق
              </span>

              <strong className="text-2xl text-[#EFF4BD]">
                {plant.matchPercentage}%
              </strong>
            </div>
          </div>

          <div className="p-7 sm:p-10">
            <span className="font-katibeh text-xl text-[#A2B447]">
              النبات المناسب
            </span>

            <h2 className="mt-4 font-katibeh text-6xl text-[#EFF4BD]">
              {plant.name}
            </h2>

            <p className="mt-2 text-sm italic text-[#516F7A]">
              {plant.scientificName}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <DetailItem
                label="الإضاءة"
                value={plant.light}
              />

              <DetailItem
                label="الري"
                value={plant.watering}
              />

              <DetailItem
                label="التربة"
                value={plant.soil}
              />

              <DetailItem
                label="العناية"
                value={careLevel}
              />

              <DetailItem
                label="الحجم"
                value={size}
              />

              <DetailItem
                label="المكان"
                value={location}
              />
            </div>

            {plant.tags?.length > 0 && (
              <div className="mt-7">
                <span className="font-katibeh text-xl text-[#EFF4BD]">
                  خصائص النبات
                </span>

                <div className="mt-3 flex flex-wrap gap-2">
                  {plant.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#A2B447]/30 bg-[#556F30]/50 px-3 py-1.5 font-katibeh text-base text-[#EFF4BD]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  onAddToMyPlants(plant)
                }
                disabled={isAdded}
                className="flex-1 rounded-xl bg-[#A2B447] px-5 py-3.5 font-katibeh text-xl text-[#23361A] transition hover:bg-[#EFF4BD] disabled:bg-[#556F30] disabled:text-[#EFF4BD]"
              >
                {isAdded
                  ? "تمت الإضافة إلى نباتاتي"
                  : "أضف إلى نباتاتي"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-[#A2B447]/30 px-5 py-3.5 font-katibeh text-xl text-[#EFF4BD] transition hover:bg-[#556F30]"
              >
                العودة للنتائج
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A]/70 p-4">
      <span className="block font-katibeh text-lg text-[#516F7A]">
        {label}
      </span>

      <strong className="mt-1 block font-katibeh text-xl text-[#EFF4BD]">
        {value}
      </strong>
    </div>
  );
}

export default PlantDetails;