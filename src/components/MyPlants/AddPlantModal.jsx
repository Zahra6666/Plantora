import {
  X,
  ImagePlus,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import gsap from "gsap";

function AddPlantModal({
  plant,
  onClose,
  onSave,
}) {
  const isEditing = Boolean(plant);

  const [form, setForm] = useState({
    name: plant?.name || "",
    scientificName:
      plant?.scientificName || "",
    image: plant?.image || "",
    healthStatus:
      plant?.healthStatus || "good",
    wateringInterval:
      plant?.wateringInterval || 7,
    notes: plant?.notes || "",
    light: plant?.light || "إضاءة غير محددة",
    watering:
      plant?.watering || "حسب الحاجة",
    soil: plant?.soil || "تربة مناسبة للنبات",
  });

  useEffect(() => {
    gsap.fromTo(
      ".myplants-modal-panel",
      {
        opacity: 0,
        y: 35,
        scale: 0.97,
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

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    const finalPlant = {
      ...form,
      id:
        plant?.id ||
        `custom-${Date.now()}`,
      wateringInterval:
        Number(form.wateringInterval) || 7,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=85",
      addedAt:
        plant?.addedAt ||
        new Date().toISOString(),
    };

    onSave(finalPlant);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#23361A]/85 p-4 backdrop-blur-md"
      dir="rtl"
      onClick={onClose}
    >
      <div
        className="myplants-modal-panel max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[32px] border border-[#EFF4BD]/10 bg-[#362F22] shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="flex items-center justify-between border-b border-[#EFF4BD]/10 p-6">
          <div>
            <p className="font-['Katibeh'] text-lg text-[#A2B447]">
              My Plants
            </p>

            <h2 className="font-['Katibeh'] text-3xl text-[#EFF4BD]">
              {isEditing
                ? "تعديل بيانات النبات"
                : "إضافة نبات جديد"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#23361A] text-[#EFF4BD] transition hover:bg-[#556F30]"
          >
            <X size={19} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="font-['Katibeh'] text-xl text-[#EFF4BD]">
                اسم النبات
              </span>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="مثال: Monstera"
                className="w-full rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A] px-4 py-3 text-[#EFF4BD] outline-none transition focus:border-[#A2B447]"
              />
            </label>

            <label className="space-y-2">
              <span className="font-['Katibeh'] text-xl text-[#EFF4BD]">
                الاسم العلمي
              </span>

              <input
                name="scientificName"
                value={
                  form.scientificName
                }
                onChange={handleChange}
                placeholder="Monstera deliciosa"
                dir="ltr"
                className="w-full rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A] px-4 py-3 text-left text-[#EFF4BD] outline-none transition focus:border-[#A2B447]"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="font-['Katibeh'] text-xl text-[#EFF4BD]">
              رابط صورة النبات
            </span>

            <div className="flex gap-3">
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A] px-4">
                <ImagePlus
                  size={18}
                  className="text-[#A2B447]"
                />

                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  dir="ltr"
                  className="w-full bg-transparent py-3 text-[#EFF4BD] outline-none"
                />
              </div>
            </div>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="font-['Katibeh'] text-xl text-[#EFF4BD]">
                الحالة الصحية
              </span>

              <select
                name="healthStatus"
                value={
                  form.healthStatus
                }
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A] px-4 py-3 text-[#EFF4BD] outline-none focus:border-[#A2B447]"
              >
                <option value="good">
                  جيدة
                </option>

                <option value="attention">
                  تحتاج انتباه
                </option>

                <option value="needs-care">
                  تحتاج عناية
                </option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="font-['Katibeh'] text-xl text-[#EFF4BD]">
                فترة الري
              </span>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="60"
                  name="wateringInterval"
                  value={
                    form.wateringInterval
                  }
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A] px-4 py-3 text-[#EFF4BD] outline-none focus:border-[#A2B447]"
                />

                <span className="whitespace-nowrap font-['Katibeh'] text-lg text-[#A2B447]">
                  يوم
                </span>
              </div>
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="font-['Katibeh'] text-xl text-[#EFF4BD]">
                الإضاءة
              </span>

              <input
                name="light"
                value={form.light}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A] px-4 py-3 text-[#EFF4BD] outline-none focus:border-[#A2B447]"
              />
            </label>

            <label className="space-y-2">
              <span className="font-['Katibeh'] text-xl text-[#EFF4BD]">
                التربة
              </span>

              <input
                name="soil"
                value={form.soil}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A] px-4 py-3 text-[#EFF4BD] outline-none focus:border-[#A2B447]"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="font-['Katibeh'] text-xl text-[#EFF4BD]">
              ملاحظات
            </span>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="4"
              placeholder="أضف ملاحظاتك عن النبات..."
              className="w-full resize-none rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A] px-4 py-3 text-[#EFF4BD] outline-none transition focus:border-[#A2B447]"
            />
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#A2B447] px-5 py-4 text-[#23361A] transition duration-300 hover:bg-[#EFF4BD]"
          >
            <Save size={18} />

            <span className="font-['Katibeh'] text-2xl">
              {isEditing
                ? "حفظ التعديلات"
                : "إضافة إلى نباتاتي"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPlantModal;