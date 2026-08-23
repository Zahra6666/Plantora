import { useState } from "react";
import ImageUpload from "./ImageUpload";
import DiagnosisResult from "./DiagnosisResult";

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
      // تحويل الصورة إلى Base64
      const imageBase64 = await convertImageToBase64(image);

      // إزالة بداية data:image/...;base64,
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

      // إزالة ```json إذا أضافها Gemini
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
    <main className="min-h-screen bg-green-50 px-4 py-10" dir="rtl">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-green-900">
            طبيب النباتات 🌿
          </h1>

          <p className="mt-3 text-gray-600">
            ارفع صورة لنبتتك ودع الذكاء الاصطناعي يساعدك في معرفة حالتها.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
            {error}
          </div>
        )}

        {!diagnosis ? (
          <ImageUpload
            image={image}
            onImageSelect={handleImageSelect}
            onDiagnose={handleDiagnose}
            loading={loading}
          />
        ) : (
          <DiagnosisResult
            diagnosis={diagnosis}
            image={image}
            onReset={handleReset}
          />
        )}

        {loading && (
          <div className="mt-6 flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-700" />

            <p className="mt-4 font-medium text-green-800">جاري فحص نبتتك...</p>

            <p className="mt-1 text-sm text-gray-500">
              يقوم الذكاء الاصطناعي بتحليل الصورة، انتظر قليلاً...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default PlantDoctor;
