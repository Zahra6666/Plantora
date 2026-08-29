import {
  Droplets,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  HeartPulse,
} from "lucide-react";
import { useState } from "react";

function getNextWateringDate(plant) {
  if (!plant.lastWatered) {
    return null;
  }

  const date = new Date(plant.lastWatered);

  date.setDate(
    date.getDate() + Number(plant.wateringInterval || 7)
  );

  return date;
}

function getWateringText(plant) {
  const nextDate = getNextWateringDate(plant);

  if (!nextDate) {
    return "لم يتم تسجيل الري";
  }

  const today = new Date();

  const difference =
    Math.ceil(
      (nextDate - today) /
        (1000 * 60 * 60 * 24)
    );

  if (difference < 0) {
    return "حان وقت الري";
  }

  if (difference === 0) {
    return "الري اليوم";
  }

  if (difference === 1) {
    return "الري غدًا";
  }

  return `الري بعد ${difference} أيام`;
}

function getHealthLabel(status) {
  if (status === "good") {
    return "حالة جيدة";
  }

  if (status === "attention") {
    return "تحتاج انتباه";
  }

  return "تحتاج عناية";
}

function MyPlantCard({
  plant,
  onView,
  onEdit,
  onDelete,
  onWater,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-[#EFF4BD]/10 bg-[#362F22] shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
      <div className="relative h-[270px] overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#23361A] via-[#23361A]/10 to-transparent" />

        <div className="absolute right-5 top-5">
          <button
            type="button"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#23361A]/70 text-[#EFF4BD] backdrop-blur-md transition hover:bg-[#556F30]"
            aria-label="خيارات"
          >
            <MoreVertical size={19} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 z-20 w-40 overflow-hidden rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A] p-1.5 shadow-2xl">
              <button
                type="button"
                onClick={() => {
                  onEdit(plant);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm text-[#EFF4BD] transition hover:bg-[#556F30]"
              >
                <Pencil size={15} />
                <span className="font-['Katibeh'] text-lg">
                  تعديل
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onDelete(plant.id);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm text-[#EFF4BD] transition hover:bg-[#556F30]"
              >
                <Trash2 size={15} />
                <span className="font-['Katibeh'] text-lg">
                  حذف
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#EFF4BD]">
              {plant.name}
            </h2>

            <p className="mt-1 text-sm italic text-[#EFF4BD]/65">
              {plant.scientificName}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#EFF4BD]/15 bg-[#23361A]/70 px-3 py-1.5 backdrop-blur-md">
            <HeartPulse
              size={14}
              className="text-[#A2B447]"
            />

            <span className="font-['Katibeh'] text-lg text-[#EFF4BD]">
              {getHealthLabel(
                plant.healthStatus
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#23361A] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#A2B447]">
              <Droplets size={17} />
              <span className="font-['Katibeh'] text-lg">
                الري
              </span>
            </div>

            <p className="font-['Katibeh'] text-xl text-[#EFF4BD]">
              {getWateringText(plant)}
            </p>
          </div>

          <div className="rounded-2xl bg-[#23361A] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#A2B447]">
              <HeartPulse size={17} />
              <span className="font-['Katibeh'] text-lg">
                الصحة
              </span>
            </div>

            <p className="font-['Katibeh'] text-xl text-[#EFF4BD]">
              {getHealthLabel(
                plant.healthStatus
              )}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onView(plant)}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#A2B447]/30 bg-[#A2B447]/10 px-4 py-3 text-[#EFF4BD] transition duration-300 hover:bg-[#A2B447] hover:text-[#23361A]"
          >
            <Eye size={17} />

            <span className="font-['Katibeh'] text-xl">
              التفاصيل
            </span>
          </button>

          <button
            type="button"
            onClick={() => onWater(plant.id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#A2B447] px-4 py-3 text-[#23361A] transition duration-300 hover:bg-[#EFF4BD]"
          >
            <Droplets size={17} />

            <span className="font-['Katibeh'] text-xl">
              تم الري
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default MyPlantCard;