import { useState } from "react";
import ImageUpload from "./ImageUpload";
import DiagnosisResult from "./DiagnosisResult";
import BackToHome from "../../components/BackToHome";

function PlantDoctor() {
  const [image, setImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleImageSelect(file) {
    setError("");
    setDiagnosis(null);

    if (!file.type.startsWith("image/")) {
      setError("يرجى رفع صورة صحيحة.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("حجم الصورة يجب أن يكون أقل من 10 ميجابايت.");
      return;
    }

    setImage(file);
  }

  async function handleDiagnose() {
    if (!image) {
      setError("يرجى رفع صورة أولاً.");
      return;
    }

    setLoading(true);
    setError("");
    setDiagnosis(null);

    try {
      const imageBase64 = await convertImageToBase64(image);
      const base64Data = imageBase64.split(",")[1];

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
          },

          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      mimeType: image.type,
                      data: base64Data,
                    },
                  },
                  {
                    text: `
أنت طبيب نباتات متخصص.

حلل صورة النبتة المرفقة بعناية.

أريد منك تحديد:

1. اسم النبتة إذا كان من الممكن تحديدها.
2. حالة النبتة الحالية.
3. مستوى صحتها.
4. المشاكل أو العلامات غير الطبيعية الظاهرة عليها.
5. خطوات بسيطة للعناية بها وتحسين صحتها.

إذا كانت الصورة لا تحتوي على نبتة، أو كانت الصورة غير واضحة بما يكفي للتحليل، اعتبرها صورة غير صالحة.

أجب باللغة العربية.

أرجع النتيجة بصيغة JSON فقط، بدون أي كلام إضافي، بهذا الشكل:

{
  "plantName": "اسم النبتة",
  "condition": "وصف حالة النبتة",
  "health": "مستوى صحة النبتة",
  "careSteps": [
    "الخطوة الأولى",
    "الخطوة الثانية",
    "الخطوة الثالثة"
  ]
}
                    `,
                  },
                ],
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();

        console.error("Gemini API error:", errorData);

        throw new Error(
          errorData.error?.message ||
            "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.",
        );
      }

      const data = await response.json();

      console.log("Gemini response:", data);

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        throw new Error("لم تصل نتيجة من الذكاء الاصطناعي.");
      }

      const cleanedResponse = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const result = JSON.parse(cleanedResponse);

      setDiagnosis(result);
    } catch (error) {
      console.error("Diagnosis error:", error);

      setError(
        "تعذر تحليل الصورة. تأكدي من أن الصورة واضحة وتحتوي على نبتة، ثم حاولي مرة أخرى.",
      );
    } finally {
      setLoading(false);
    }
  }

  function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("فشل في قراءة الصورة."));
      };

      reader.readAsDataURL(file);
    });
  }

  function handleReset() {
    setImage(null);
    setDiagnosis(null);
    setError("");
  }

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#516F7A] px-4 py-12 md:px-8"
    >
      <BackToHome />

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#A2B447]/30 blur-3xl" />

        <div className="absolute -bottom-48 -left-40 h-[600px] w-[600px] rounded-full bg-[#23361A]/50 blur-3xl" />

        <div className="absolute right-[12%] top-[30%] h-8 w-8 rounded-full bg-[#EFF4BD]/20" />

        <div className="absolute left-[15%] top-[18%] h-4 w-4 rounded-full bg-[#A2B447]/50" />

        <div className="absolute bottom-[20%] right-[20%] h-5 w-5 rounded-full bg-[#EFF4BD]/20" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        {/* Header */}
        <div className="mb-10 w-full text-center">
          <span className="inline-block rounded-full border border-[#EFF4BD]/20 bg-[#23361A]/30 px-5 py-2 text-sm font-medium text-[#EFF4BD]/80 backdrop-blur-md">
            Plant doctor
          </span>

          <h1 className="mt-5 font-[Katibeh] text-6xl text-[#EFF4BD] md:text-8xl">
            🌿 عيادة نباتاتك
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-[#EFF4BD]/75 md:text-xl">
            دع الذكاء الاصطناعي يفحص نبتتك
            <br />
            ويساعدك على فهم حالتها والعناية بها.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-auto mb-6 max-w-3xl rounded-2xl border border-red-200/30 bg-red-950/30 p-4 text-center text-red-100 backdrop-blur-md">
            {error}
          </div>
        )}

        {/* Upload / Result */}
        {!diagnosis ? (
          <div className="w-full">
            {/* Big Upload Card */}
            <div className="mx-auto w-full max-w-3xl">
              <ImageUpload
                image={image}
                onImageSelect={handleImageSelect}
                onDiagnose={handleDiagnose}
                loading={loading}
              />
            </div>

            {/* Information Cards */}
            <div className="mx-auto mt-6 grid w-full max-w-3xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A]/30 p-5 text-center backdrop-blur-md">
                <div className="text-2xl">📷</div>
                <p className="mt-2 text-sm text-[#EFF4BD]/70">صورة واضحة</p>
              </div>

              <div className="rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A]/30 p-5 text-center backdrop-blur-md">
                <div className="text-2xl">🤖</div>
                <p className="mt-2 text-sm text-[#EFF4BD]/70">
                  تحليل بالذكاء الاصطناعي
                </p>
              </div>

              <div className="rounded-2xl border border-[#EFF4BD]/10 bg-[#23361A]/30 p-5 text-center backdrop-blur-md">
                <div className="text-2xl">🌱</div>
                <p className="mt-2 text-sm text-[#EFF4BD]/70">نصائح للعناية</p>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="mx-auto mt-6 flex w-full max-w-3xl flex-col items-center rounded-3xl border border-[#EFF4BD]/10 bg-[#23361A]/40 p-8 text-center backdrop-blur-md">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#EFF4BD]/20 border-t-[#A2B447]" />

                <p className="mt-5 text-lg font-semibold text-[#EFF4BD]">
                  جاري فحص نبتتك...
                </p>

                <p className="mt-2 text-sm text-[#EFF4BD]/60">
                  الذكاء الاصطناعي ينظر إلى تفاصيل نبتتك الآن 🌿
                </p>
              </div>
            )}
          </div>
        ) : (
          <DiagnosisResult
            diagnosis={diagnosis}
            image={image}
            onReset={handleReset}
          />
        )}
        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#EFF4BD]/40">
            نماء • نعتني بنباتاتنا لتنمو معنا
          </p>
        </div>
      </div>
    </main>
  );
}

export default PlantDoctor;
