import BackToHome from "../components/BackToHome";

import { useEffect, useMemo, useRef, useState } from "react";

import gsap from "gsap";

import {
  Plus,
  Sprout,
  HeartPulse,
  CalendarClock,
  Search,
  Leaf,
  Droplets,
} from "lucide-react";

import MyPlantCard from "../components/MyPlants/MyPlantCard.jsx";
import MyPlantDetails from "../components/MyPlants/MyPlantDetails.jsx";
import AddPlantModal from "../components/MyPlants/AddPlantModal.jsx";

import {
  getMyPlants,
  addMyPlant,
  updateMyPlant,
  deleteMyPlant,
  markPlantAsWatered,
} from "../utils/myPlantsStorage.js";

function getNextWateringDate(plant) {
  if (!plant.lastWatered) {
    return null;
  }

  const date = new Date(plant.lastWatered);

  date.setDate(date.getDate() + Number(plant.wateringInterval || 7));

  return date;
}

function MyPlants() {
  const pageRef = useRef(null);

  const [plants, setPlants] = useState(() => getMyPlants());

  const [selectedPlant, setSelectedPlant] = useState(null);

  const [editingPlant, setEditingPlant] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".myplants-hero-item",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".myplants-stat",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out",
        },
      );
    }, pageRef);

    return () => context.revert();
  }, []);

  const filteredPlants = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return plants;
    }

    return plants.filter((plant) =>
      `${plant.name} ${plant.scientificName || ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [plants, search]);

  const plantsNeedingAttention = plants.filter(
    (plant) => plant.healthStatus !== "good",
  ).length;

  const upcomingWaterings = plants.filter((plant) => {
    const nextDate = getNextWateringDate(plant);

    if (!nextDate) {
      return false;
    }

    const days = (nextDate - new Date()) / (1000 * 60 * 60 * 24);

    return days <= 3;
  }).length;

  const handleSavePlant = (plant) => {
    const exists = plants.some((item) => item.id === plant.id);

    let updatedPlants;

    if (exists) {
      updatedPlants = updateMyPlant(plant.id, plant);
    } else {
      updatedPlants = addMyPlant(plant);
    }

    setPlants(updatedPlants);
    setEditingPlant(null);
    setShowAddModal(false);
    setSelectedPlant(null);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("هل تريد حذف هذا النبات من نباتاتك؟");

    if (!confirmed) {
      return;
    }

    const updatedPlants = deleteMyPlant(id);

    setPlants(updatedPlants);

    if (selectedPlant?.id === id) {
      setSelectedPlant(null);
    }
  };

  const handleWater = (id) => {
    const updatedPlants = markPlantAsWatered(id);

    setPlants(updatedPlants);

    const updatedPlant = updatedPlants.find((plant) => plant.id === id);

    if (selectedPlant?.id === id && updatedPlant) {
      setSelectedPlant(updatedPlant);
    }
  };

  const handleEdit = (plant) => {
    setSelectedPlant(null);
    setEditingPlant(plant);
    setShowAddModal(true);
  };

  const handleOpenAdd = () => {
    setEditingPlant(null);
    setShowAddModal(true);
  };

  return (
    <main
      ref={pageRef}
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#23361A] text-[#EFF4BD]"
    >
      <BackToHome />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#556F30]/20 blur-[120px]" />

        <div className="absolute -left-40 top-[45%] h-96 w-96 rounded-full bg-[#516F7A]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <section className="mb-12">
          <div className="max-w-3xl">
            <p className="myplants-hero-item font-['Katibeh'] text-2xl text-[#A2B447]">
              My Plants
            </p>

            <h1 className="myplants-hero-item mt-2 font-['Katibeh'] text-5xl leading-[1.05] text-[#EFF4BD] md:text-7xl">
              نباتاتك، تحت
              <span className="text-[#A2B447]"> رعايتك</span>
            </h1>

            <p className="myplants-hero-item mt-5 max-w-2xl font-['Katibeh'] text-2xl leading-relaxed text-[#EFF4BD]/65 md:text-3xl">
              تابع حالة نباتاتك، مواعيد الري، واحتياجات العناية من مكان واحد.
            </p>
          </div>

          <div className="myplants-hero-item mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleOpenAdd}
              className="group flex items-center justify-center gap-3 rounded-2xl bg-[#A2B447] px-6 py-3.5 text-[#23361A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#EFF4BD]"
            >
              <Plus
                size={19}
                className="transition-transform duration-300 group-hover:rotate-90"
              />

              <span className="font-['Katibeh'] text-2xl">إضافة نبات</span>
            </button>
          </div>
        </section>

        <section className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="myplants-stat rounded-[26px] border border-[#EFF4BD]/10 bg-[#362F22] p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A2B447]/10 text-[#A2B447]">
                <Sprout size={22} />
              </div>

              <span className="font-serif text-4xl text-[#EFF4BD]">
                {plants.length}
              </span>
            </div>

            <p className="mt-5 font-['Katibeh'] text-2xl text-[#EFF4BD]/70">
              إجمالي النباتات
            </p>
          </div>

          <div className="myplants-stat rounded-[26px] border border-[#EFF4BD]/10 bg-[#362F22] p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A2B447]/10 text-[#A2B447]">
                <HeartPulse size={22} />
              </div>

              <span className="font-serif text-4xl text-[#EFF4BD]">
                {plantsNeedingAttention}
              </span>
            </div>

            <p className="mt-5 font-['Katibeh'] text-2xl text-[#EFF4BD]/70">
              تحتاج انتباه
            </p>
          </div>

          <div className="myplants-stat rounded-[26px] border border-[#EFF4BD]/10 bg-[#362F22] p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A2B447]/10 text-[#A2B447]">
                <CalendarClock size={22} />
              </div>

              <span className="font-serif text-4xl text-[#EFF4BD]">
                {upcomingWaterings}
              </span>
            </div>

            <p className="mt-5 font-['Katibeh'] text-2xl text-[#EFF4BD]/70">
              مواعيد قريبة
            </p>
          </div>
        </section>

        <section>
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-['Katibeh'] text-xl text-[#A2B447]">مجموعتك</p>

              <h2 className="font-['Katibeh'] text-4xl text-[#EFF4BD]">
                كل نباتاتك
              </h2>
            </div>

            {plants.length > 0 && (
              <div className="relative w-full md:w-72">
                <Search
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A2B447]"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="ابحث عن نبات..."
                  className="w-full rounded-2xl border border-[#EFF4BD]/10 bg-[#362F22] py-3 pr-11 pl-4 font-['Katibeh'] text-xl text-[#EFF4BD] outline-none transition focus:border-[#A2B447]"
                />
              </div>
            )}
          </div>

          {plants.length === 0 ? (
            <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[32px] border border-dashed border-[#A2B447]/25 bg-[#362F22]/70 px-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#A2B447]/10 text-[#A2B447]">
                <Leaf size={34} />
              </div>

              <h3 className="mt-6 font-['Katibeh'] text-4xl text-[#EFF4BD]">
                ما عندك نباتات بعد
              </h3>

              <p className="mt-2 max-w-md font-['Katibeh'] text-2xl leading-relaxed text-[#EFF4BD]/55">
                اكتشف نباتك المناسب من Plant Match وأضفه إلى مجموعتك، أو أضف
                نباتًا جديدًا يدويًا.
              </p>

              <button
                type="button"
                onClick={handleOpenAdd}
                className="mt-7 flex items-center gap-2 rounded-2xl bg-[#A2B447] px-6 py-3 text-[#23361A] transition hover:bg-[#EFF4BD]"
              >
                <Plus size={18} />

                <span className="font-['Katibeh'] text-2xl">أضف أول نبات</span>
              </button>
            </div>
          ) : filteredPlants.length === 0 ? (
            <div className="rounded-[30px] bg-[#362F22] p-12 text-center">
              <Search size={34} className="mx-auto text-[#A2B447]" />

              <h3 className="mt-5 font-['Katibeh'] text-3xl text-[#EFF4BD]">
                لم يتم العثور على نبات
              </h3>

              <p className="mt-2 font-['Katibeh'] text-xl text-[#EFF4BD]/50">
                جرب اسمًا مختلفًا.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredPlants.map((plant) => (
                <MyPlantCard
                  key={plant.id}
                  plant={plant}
                  onView={setSelectedPlant}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onWater={handleWater}
                />
              ))}
            </div>
          )}
        </section>

        {plants.length > 0 && (
          <section className="mt-12 overflow-hidden rounded-[32px] border border-[#A2B447]/10 bg-[#362F22] p-7 md:p-9">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-['Katibeh'] text-xl text-[#A2B447]">
                  Plantora Care
                </p>

                <h2 className="font-['Katibeh'] text-4xl text-[#EFF4BD]">
                  خلي العناية بنباتاتك أسهل
                </h2>

                <p className="mt-2 max-w-2xl font-['Katibeh'] text-xl text-[#EFF4BD]/55">
                  تابع مواعيد الري والحالة الصحية لكل نبات بدون ما تضيع
                  التفاصيل.
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#A2B447]/10 text-[#A2B447]">
                <Droplets size={27} />
              </div>
            </div>
          </section>
        )}
      </div>

      {selectedPlant && (
        <MyPlantDetails
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
          onEdit={handleEdit}
        />
      )}

      {showAddModal && (
        <AddPlantModal
          plant={editingPlant}
          onClose={() => {
            setShowAddModal(false);
            setEditingPlant(null);
          }}
          onSave={handleSavePlant}
        />
      )}
    </main>
  );
}

export default MyPlants;
