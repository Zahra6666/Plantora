import { useLayoutEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import plantQuestions from "../data/PlantQuestions.js";
import Plants from "../data/Plants.js";

import { getPlantMatches } from "../utils/plantMatching.js";

import { getMyPlants, addMyPlant } from "../utils/myPlantsStorage.js";

import ProgressBar from "../components/PlantMatch/ProgressBar.jsx";
import QuestionCard from "../components/PlantMatch/QuestionCard.jsx";
import PlantCard from "../components/PlantMatch/PlantCard.jsx";
import PlantDetails from "../components/PlantMatch/PlantDetails.jsx";

import BackToHome from "../components/BackToHome";

gsap.registerPlugin(ScrollTrigger);

function BotanicalBackground() {
  const leafRefs = useRef([]);
  const flowerRefs = useRef([]);
  const orbRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      leafRefs.current.forEach((leaf, index) => {
        if (!leaf) return;

        gsap.to(leaf, {
          x: index % 2 === 0 ? 35 : -35,
          y: index % 3 === 0 ? -30 : 25,
          rotation: index % 2 === 0 ? 8 : -8,
          duration: 6 + index * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.25,
        });
      });

      flowerRefs.current.forEach((flower, index) => {
        if (!flower) return;

        gsap.to(flower, {
          y: index % 2 === 0 ? -18 : 18,
          rotation: index % 2 === 0 ? 12 : -12,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      });

      orbRefs.current.forEach((orb, index) => {
        if (!orb) return;

        gsap.to(orb, {
          x: index % 2 === 0 ? 70 : -70,
          y: index % 2 === 0 ? -45 : 45,
          scale: 1.15,
          duration: 9 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#556F30]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(239,244,189,0.13),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(81,111,122,0.16),transparent_30%),linear-gradient(135deg,#556F30_0%,#23361A_72%)]" />

      <div
        ref={(el) => (orbRefs.current[0] = el)}
        className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#A2B447]/10 blur-3xl"
      />

      <div
        ref={(el) => (orbRefs.current[1] = el)}
        className="absolute -right-40 bottom-10 h-[32rem] w-[32rem] rounded-full bg-[#516F7A]/10 blur-3xl"
      />

      <div
        ref={(el) => (orbRefs.current[2] = el)}
        className="absolute left-[40%] top-[40%] h-72 w-72 rounded-full bg-[#EFF4BD]/5 blur-3xl"
      />

      <svg
        className="absolute -left-20 top-8 h-[32rem] w-[28rem] opacity-30"
        viewBox="0 0 400 500"
        fill="none"
        ref={(el) => (leafRefs.current[0] = el)}
      >
        <path
          d="M70 430C80 270 140 130 330 55C300 235 220 390 70 430Z"
          fill="#23361A"
        />

        <path
          d="M78 415C150 305 215 210 310 92"
          stroke="#A2B447"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M145 310L105 270M180 265L135 220M220 215L175 170M260 165L225 125"
          stroke="#A2B447"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute -right-24 top-28 h-[34rem] w-[30rem] opacity-25"
        viewBox="0 0 400 500"
        fill="none"
        ref={(el) => (leafRefs.current[1] = el)}
      >
        <path
          d="M335 450C320 285 250 145 65 65C95 245 180 390 335 450Z"
          fill="#23361A"
        />

        <path
          d="M325 430C250 315 180 210 90 100"
          stroke="#EFF4BD"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M260 325L300 285M220 270L265 225M180 220L225 175M140 170L180 130"
          stroke="#EFF4BD"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute bottom-[-80px] left-[12%] h-72 w-72 opacity-20"
        viewBox="0 0 300 300"
        fill="none"
        ref={(el) => (leafRefs.current[2] = el)}
      >
        <path
          d="M145 275C120 200 135 110 245 35C260 160 225 235 145 275Z"
          fill="#A2B447"
        />

        <path
          d="M145 270C170 190 195 120 235 55"
          stroke="#23361A"
          strokeWidth="4"
        />
      </svg>

      <svg
        className="absolute bottom-[-70px] right-[8%] h-80 w-80 opacity-20"
        viewBox="0 0 300 300"
        fill="none"
        ref={(el) => (leafRefs.current[3] = el)}
      >
        <path
          d="M155 275C180 195 165 105 55 35C40 155 75 235 155 275Z"
          fill="#EFF4BD"
        />

        <path
          d="M155 270C130 190 105 120 65 55"
          stroke="#23361A"
          strokeWidth="4"
        />
      </svg>

      <svg
        className="absolute left-[12%] top-[45%] h-28 w-28 opacity-25"
        viewBox="0 0 100 100"
        ref={(el) => (flowerRefs.current[0] = el)}
      >
        <circle cx="50" cy="50" r="12" fill="#A2B447" />

        <ellipse cx="50" cy="20" rx="14" ry="25" fill="#EFF4BD" />

        <ellipse cx="50" cy="80" rx="14" ry="25" fill="#EFF4BD" />

        <ellipse cx="20" cy="50" rx="25" ry="14" fill="#EFF4BD" />

        <ellipse cx="80" cy="50" rx="25" ry="14" fill="#EFF4BD" />
      </svg>

      <svg
        className="absolute right-[14%] top-[58%] h-24 w-24 opacity-20"
        viewBox="0 0 100 100"
        ref={(el) => (flowerRefs.current[1] = el)}
      >
        <circle cx="50" cy="50" r="10" fill="#556F30" />

        <ellipse cx="50" cy="20" rx="12" ry="22" fill="#A2B447" />

        <ellipse cx="50" cy="80" rx="12" ry="22" fill="#A2B447" />

        <ellipse cx="20" cy="50" rx="22" ry="12" fill="#A2B447" />

        <ellipse cx="80" cy="50" rx="22" ry="12" fill="#A2B447" />
      </svg>
    </div>
  );
}

function PlantMatch() {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [selectedPlant, setSelectedPlant] = useState(null);

  const [myPlants, setMyPlants] = useState(() => {
    try {
      return getMyPlants();
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const [error, setError] = useState(null);

  const question = plantQuestions[currentQuestion];

  const totalQuestions = plantQuestions.length;

  const selectedAnswer = answers[question.category];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 45,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 35,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!showResults) return;

    const cards = document.querySelectorAll(".plant-result-card");

    const animation = gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 70,
        scale: 0.94,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".plant-results-grid",
          start: "top 85%",
        },
      },
    );

    return () => {
      animation.kill();

      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, [showResults]);

  const handleSelectAnswer = (answer) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [question.category]: answer,
    }));

    gsap.fromTo(
      ".question-option",
      {
        scale: 0.99,
      },
      {
        scale: 1,
        duration: 0.3,
        ease: "back.out(2)",
        stagger: 0.03,
      },
    );
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const updatedAnswers = {
      ...answers,
      [question.category]: selectedAnswer,
    };

    setAnswers(updatedAnswers);

    if (currentQuestion < totalQuestions - 1) {
      gsap.to(".question-card", {
        opacity: 0,
        x: -35,
        duration: 0.25,
        ease: "power2.in",

        onComplete: () => {
          setCurrentQuestion((previous) => previous + 1);

          gsap.fromTo(
            ".question-card",
            {
              opacity: 0,
              x: 35,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power3.out",
            },
          );
        },
      });

      return;
    }

    setIsCalculating(true);
    setError(null);

    setTimeout(() => {
      try {
        const matches = getPlantMatches(updatedAnswers, Plants);

        if (!matches) {
          throw new Error("Unable to calculate matches");
        }

        setResults(matches);
        setShowResults(true);
      } catch (error) {
        console.error(error);

        setError("حدث خطأ أثناء حساب النتائج.");
      } finally {
        setIsCalculating(false);
      }
    }, 800);
  };

  const handleBack = () => {
    if (currentQuestion === 0) return;

    gsap.to(".question-card", {
      opacity: 0,
      x: 35,
      duration: 0.25,
      ease: "power2.in",

      onComplete: () => {
        setCurrentQuestion((previous) => previous - 1);

        gsap.fromTo(
          ".question-card",
          {
            opacity: 0,
            x: -35,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
          },
        );
      },
    });
  };

  const handleViewDetails = (plant) => {
    setSelectedPlant(plant);

    setTimeout(() => {
      gsap.fromTo(
        ".plant-details",
        {
          opacity: 0,
          y: 35,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
      );
    }, 0);
  };

  const handleAddToMyPlants = (plant) => {
    const currentPlants = getMyPlants();

    const alreadyAdded = currentPlants.some((item) => item.id === plant.id);

    if (!alreadyAdded) {
      addMyPlant(plant);
    }

    setMyPlants(getMyPlants());

    navigate("/my-plants");
  };

  const handleRestart = () => {
    gsap.to(".plant-results-content", {
      opacity: 0,
      y: 25,
      duration: 0.3,

      onComplete: () => {
        setCurrentQuestion(0);
        setAnswers({});
        setResults([]);
        setSelectedPlant(null);
        setShowResults(false);
        setIsCalculating(false);
        setError(null);
      },
    });
  };

  if (error) {
    return (
      <main
        ref={pageRef}
        dir="rtl"
        className="relative min-h-screen overflow-hidden bg-[#556F30] px-5 py-12"
      >
        <BackToHome />
        <BotanicalBackground />
        <div className="relative z-10 flex min-h-[80vh] items-center justify-center">
          <div className="w-full max-w-lg rounded-[2rem] border border-[#EFF4BD]/15 bg-[#362F22]/90 p-10 text-center shadow-[0_35px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#A2B447]/40 bg-[#23361A] text-2xl font-bold text-[#A2B447]">
              !
            </div>

            <h2 className="mt-6 font-katibeh text-5xl text-[#EFF4BD]">
              حدث خطأ
            </h2>

            <p className="mt-3 font-katibeh text-2xl leading-9 text-[#EFF4BD]/65">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                setError(null);
                setIsCalculating(false);
              }}
              className="mt-8 rounded-xl bg-[#A2B447] px-8 py-3.5 font-katibeh text-xl text-[#23361A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#EFF4BD]"
            >
              المحاولة مرة أخرى
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (isCalculating) {
    return (
      <main
        dir="rtl"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#556F30] px-5"
      >
        <BackToHome />
        <BotanicalBackground />

        <div className="relative z-10 w-full max-w-lg rounded-[2rem] border border-[#EFF4BD]/15 bg-[#362F22]/90 p-10 text-center shadow-[0_35px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[#23361A] border-t-[#A2B447]" />

          <h2 className="mt-8 font-katibeh text-5xl text-[#EFF4BD]">
            جاري تحليل النتائج
          </h2>

          <p className="mt-3 font-katibeh text-2xl leading-9 text-[#EFF4BD]/60">
            تتم مقارنة الإجابات مع احتياجات النباتات.
          </p>

          <div className="mx-auto mt-8 h-1.5 w-52 overflow-hidden rounded-full bg-[#23361A]">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#A2B447]" />
          </div>
        </div>
      </main>
    );
  }

  if (showResults) {
    return (
      <main
        dir="rtl"
        className="relative min-h-screen overflow-hidden bg-[#556F30] px-5 py-14 sm:px-8 lg:py-20"
      >
        <BackToHome />
        <BotanicalBackground />

        <div className="relative z-10 mx-auto max-w-7xl plant-results-content">
          <header className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-[#EFF4BD]/20 bg-[#23361A]/60 px-5 py-2 text-xs font-bold tracking-[0.25em] text-[#EFF4BD] backdrop-blur-md">
              PLANT MATCH
            </span>

            <h1 className="mt-7 font-katibeh text-6xl leading-none text-[#EFF4BD] sm:text-8xl">
              النباتات <span className="text-[#A2B447]">المناسبة</span>
            </h1>

            <p className="mt-6 font-katibeh text-2xl leading-9 text-[#EFF4BD]/65">
              تم ترتيب النباتات حسب نسبة توافقها مع إجاباتك واحتياجاتك.
            </p>
          </header>

          {results.length === 0 ? (
            <div className="mx-auto max-w-lg rounded-[2rem] border border-[#EFF4BD]/15 bg-[#362F22]/90 p-10 text-center backdrop-blur-xl">
              <h2 className="font-katibeh text-5xl text-[#EFF4BD]">
                لم يتم العثور على نتائج
              </h2>

              <p className="mt-4 font-katibeh text-2xl leading-9 text-[#EFF4BD]/60">
                جرّب إجابات مختلفة للعثور على نبات أكثر توافقًا.
              </p>

              <button
                type="button"
                onClick={handleRestart}
                className="mt-8 rounded-xl bg-[#A2B447] px-8 py-3.5 font-katibeh text-xl text-[#23361A] transition hover:bg-[#EFF4BD]"
              >
                إعادة الاختبار
              </button>
            </div>
          ) : (
            <section>
              <div className="mb-10 flex flex-col gap-6 rounded-[2rem] border border-[#EFF4BD]/10 bg-[#23361A]/70 p-7 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-katibeh text-xl text-[#A2B447]">
                    نتائج المطابقة
                  </span>

                  <h2 className="mt-1 font-katibeh text-5xl text-[#EFF4BD]">
                    أفضل الاختيارات
                  </h2>
                </div>

                {results[0] && (
                  <div className="rounded-2xl border border-[#A2B447]/20 bg-[#362F22] px-6 py-4">
                    <span className="block font-katibeh text-lg text-[#EFF4BD]/50">
                      أعلى نسبة توافق
                    </span>

                    <strong className="block font-katibeh text-2xl text-[#EFF4BD]">
                      {results[0].name}
                    </strong>

                    <span className="text-sm font-bold text-[#A2B447]">
                      {results[0].matchPercentage}%
                    </span>
                  </div>
                )}
              </div>

              <div className="plant-results-grid grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {results.map((plant) => (
                  <div key={plant.id} className="plant-result-card">
                    <PlantCard
                      plant={plant}
                      onViewDetails={handleViewDetails}
                      onAddToMyPlants={handleAddToMyPlants}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {selectedPlant && (
            <PlantDetails
              plant={selectedPlant}
              onClose={() => setSelectedPlant(null)}
              onAddToMyPlants={handleAddToMyPlants}
              isAdded={myPlants.some((item) => item.id === selectedPlant.id)}
            />
          )}

          {results.length > 0 && (
            <div className="mt-16 text-center">
              <button
                type="button"
                onClick={handleRestart}
                className="rounded-xl border border-[#EFF4BD]/15 bg-[#362F22]/80 px-8 py-3.5 font-katibeh text-xl text-[#EFF4BD] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#A2B447]/50 hover:bg-[#23361A]"
              >
                بدء الاختبار من جديد
              </button>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main
      ref={pageRef}
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#556F30] px-5 py-14 sm:px-8 lg:py-20"
    >
      <BackToHome />
      <BotanicalBackground />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header ref={heroRef} className="mx-auto mb-14 max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-[#EFF4BD]/20 bg-[#23361A]/60 px-5 py-2 text-xs font-bold tracking-[0.25em] text-[#EFF4BD] backdrop-blur-md">
            PLANT MATCH
          </span>

          <h1 className="mt-7 font-katibeh text-7xl leading-none text-[#EFF4BD] sm:text-8xl">
            اكتشف النبات <span className="text-[#A2B447]">المناسب</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-katibeh text-2xl leading-10 text-[#EFF4BD]/65">
            أجب عن مجموعة من الأسئلة البسيطة لنحدد النباتات التي تتوافق مع
            احتياجاتك وأسلوب حياتك.
          </p>
        </header>

        <div ref={contentRef}>
          <ProgressBar current={currentQuestion + 1} total={totalQuestions} />

          <QuestionCard
            question={question}
            selectedAnswer={selectedAnswer}
            onSelect={handleSelectAnswer}
          />

          <div className="mx-auto mt-8 flex max-w-4xl items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="rounded-xl border border-[#EFF4BD]/15 bg-[#23361A]/70 px-7 py-3.5 font-katibeh text-xl text-[#EFF4BD] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#362F22] disabled:cursor-not-allowed disabled:opacity-30"
            >
              السابق
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="rounded-xl bg-[#A2B447] px-9 py-3.5 font-katibeh text-xl text-[#23361A] shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#EFF4BD] hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              {currentQuestion === totalQuestions - 1
                ? "عرض النتائج"
                : "التالي"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PlantMatch;
