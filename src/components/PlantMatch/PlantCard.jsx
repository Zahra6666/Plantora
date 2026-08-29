const getMatchLabel = (percentage) => {
  if (percentage >= 90) return "توافق ممتاز";
  if (percentage >= 75) return "توافق رائع";
  if (percentage >= 50) return "توافق جيد";
  return "توافق منخفض";
};

function PlantCard({
  plant,
  onViewDetails,
  onAddToMyPlants,
}) {
  const careLevel =
    plant.careLevel === "low"
      ? "سهلة"
      : plant.careLevel === "medium"
      ? "متوسطة"
      : "متقدمة";

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-[#EFF4BD]/10 bg-[#362F22] shadow-[0_25px_70px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-3 hover:border-[#A2B447]/40 hover:shadow-[0_35px_90px_rgba(0,0,0,0.35)]">
      <div className="relative h-72 overflow-hidden bg-[#23361A]">
        <img
          src={plant.image}
          alt={plant.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute left-5 top-5 rounded-2xl border border-[#EFF4BD]/20 bg-[#23361A]/90 px-4 py-3 backdrop-blur-md">
          <strong className="block text-xl text-[#EFF4BD]">
            {plant.matchPercentage}%
          </strong>

          <span className="font-katibeh text-lg text-[#A2B447]">
            {getMatchLabel(
              plant.matchPercentage
            )}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h2 className="font-katibeh text-4xl text-[#EFF4BD]">
            {plant.name}
          </h2>

          <p className="mt-1 text-sm italic text-[#516F7A]">
            {plant.scientificName}
          </p>
        </div>

        {plant.matchReasons?.length > 0 && (
          <div className="mb-6 rounded-2xl border border-[#A2B447]/10 bg-[#23361A]/70 p-4">
            <span className="font-katibeh text-xl text-[#A2B447]">
              سبب التوافق
            </span>

            <ul className="mt-3 space-y-2">
              {plant.matchReasons
                .slice(0, 3)
                .map((reason) => (
                  <li
                    key={reason}
                    className="flex gap-2 font-katibeh text-lg leading-7 text-[#EFF4BD]"
                  >
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A2B447]" />

                    <span>{reason}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A]">
          <InfoItem
            label="الإضاءة"
            value={plant.light}
          />

          <InfoItem
            label="الري"
            value={plant.watering}
          />

          <InfoItem
            label="العناية"
            value={careLevel}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() =>
              onViewDetails(plant)
            }
            className="flex-1 rounded-xl border border-[#A2B447]/40 px-4 py-3 font-katibeh text-xl text-[#EFF4BD] transition-all duration-300 hover:bg-[#556F30]"
          >
            عرض التفاصيل
          </button>

          <button
            type="button"
            onClick={() =>
              onAddToMyPlants(plant)
            }
            className="flex-1 rounded-xl bg-[#A2B447] px-4 py-3 font-katibeh text-xl text-[#23361A] transition-all duration-300 hover:bg-[#EFF4BD]"
          >
            أضف إلى نباتاتي
          </button>
        </div>
      </div>
    </article>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="min-w-0 border-l border-[#EFF4BD]/10 px-3 py-4 text-center last:border-l-0">
      <span className="block font-katibeh text-lg text-[#516F7A]">
        {label}
      </span>

      <strong className="mt-1 block truncate font-katibeh text-lg text-[#EFF4BD]">
        {value}
      </strong>
    </div>
  );
}

export default PlantCard;