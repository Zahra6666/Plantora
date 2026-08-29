import {
  X,
  Droplets,
  Sun,
  Sprout,
  HeartPulse,
  CalendarDays,
  Pencil,
} from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";

function getHealthLabel(status) {
  if (status === "good") {
    return "حالة جيدة";
  }

  if (status === "attention") {
    return "تحتاج انتباه";
  }

  return "تحتاج عناية";
}

function getNextWatering(plant) {
  if (!plant.lastWatered) {
    return "لم يتم تسجيل الري";
  }

  const date = new Date(
    plant.lastWatered
  );

  date.setDate(
    date.getDate() +
      Number(plant.wateringInterval || 7)
  );

  return date.toLocaleDateString(
    "ar-IQ",
    {
      day: "numeric",
      month: "long",
    }
  );
}

function MyPlantDetails({
  plant,
  onClose,
  onEdit,
}) {
  useEffect(() => {
    gsap.fromTo(
      ".plant-details-panel",
      {
        opacity: 0,
        y: 30,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
      }
    );
  }, []);

  if (!plant) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#23361A]/85 p-4 backdrop-blur-md"
      dir="rtl"
      onClick={onClose}
    >
      <div
        className="plant-details-panel flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[34px] border border-[#EFF4BD]/10 bg-[#362F22] shadow-[0_40px_100px_rgba(0,0,0,0.45)] md:flex-row"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="relative h-72 shrink-0 md:h-auto md:w-[42%]">
          <img
            src={plant.image}
            alt={plant.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#23361A] via-transparent to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#23361A]/70 text-[#EFF4BD] backdrop-blur-md"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-6 right-6 left-6">
            <span className="font-['Katibeh'] text-xl text-[#A2B447]">
              My Plant
            </span>

            <h2 className="mt-1 font-serif text-3xl font-semibold text-[#EFF4BD]">
              {plant.name}
            </h2>

            <p className="mt-1 text-sm italic text-[#EFF4BD]/60">
              {plant.scientificName}
            </p>
          </div>
        </div>

        <div className="overflow-y-auto p-6 md:p-8 md:w-[58%]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-['Katibeh'] text-lg text-[#A2B447]">
                معلومات النبات
              </p>

              <h3 className="font-['Katibeh'] text-3xl text-[#EFF4BD]">
                تفاصيل العناية
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onEdit(plant)}
              className="flex items-center gap-2 rounded-xl border border-[#A2B447]/20 bg-[#A2B447]/10 px-3 py-2 text-[#EFF4BD] transition hover:bg-[#A2B447] hover:text-[#23361A]"
            >
              <Pencil size={15} />

              <span className="font-['Katibeh'] text-lg">
                تعديل
              </span>
            </button>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#23361A] p-4">
              <Sun
                size={20}
                className="text-[#A2B447]"
              />

              <p className="mt-3 font-['Katibeh'] text-lg text-[#EFF4BD]/60">
                الإضاءة
              </p>

              <strong className="font-['Katibeh'] text-xl text-[#EFF4BD]">
                {plant.light}
              </strong>
            </div>

            <div className="rounded-2xl bg-[#23361A] p-4">
              <Droplets
                size={20}
                className="text-[#A2B447]"
              />

              <p className="mt-3 font-['Katibeh'] text-lg text-[#EFF4BD]/60">
                الري
              </p>

              <strong className="font-['Katibeh'] text-xl text-[#EFF4BD]">
                كل {plant.wateringInterval || 7} أيام
              </strong>
            </div>

            <div className="rounded-2xl bg-[#23361A] p-4">
              <Sprout
                size={20}
                className="text-[#A2B447]"
              />

              <p className="mt-3 font-['Katibeh'] text-lg text-[#EFF4BD]/60">
                التربة
              </p>

              <strong className="font-['Katibeh'] text-xl text-[#EFF4BD]">
                {plant.soil}
              </strong>
            </div>

            <div className="rounded-2xl bg-[#23361A] p-4">
              <HeartPulse
                size={20}
                className="text-[#A2B447]"
              />

              <p className="mt-3 font-['Katibeh'] text-lg text-[#EFF4BD]/60">
                الحالة
              </p>

              <strong className="font-['Katibeh'] text-xl text-[#EFF4BD]">
                {getHealthLabel(
                  plant.healthStatus
                )}
              </strong>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#A2B447]/15 bg-[#A2B447]/5 p-5">
            <div className="flex items-center gap-3">
              <CalendarDays
                size={19}
                className="text-[#A2B447]"
              />

              <span className="font-['Katibeh'] text-xl text-[#EFF4BD]">
                موعد الري القادم
              </span>
            </div>

            <p className="mt-2 font-['Katibeh'] text-2xl text-[#A2B447]">
              {getNextWatering(plant)}
            </p>
          </div>

          {plant.notes && (
            <div className="mt-6">
              <p className="font-['Katibeh'] text-xl text-[#A2B447]">
                ملاحظاتك
              </p>

              <p className="mt-2 rounded-2xl bg-[#23361A] p-5 font-['Katibeh'] text-xl leading-relaxed text-[#EFF4BD]/80">
                {plant.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPlantDetails;