function DiagnosisResult({ diagnosis, image, onReset }) {
  if (!diagnosis) return null;

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-green-800">نتيجة التشخيص 🌿</h2>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          إليك نتيجة فحص نبتتك
        </span>
      </div>

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="النبتة"
          className="mb-6 max-h-72 w-full rounded-xl object-contain"
        />
      )}

      <div className="space-y-4">
        <div className="rounded-xl bg-green-50 p-4">
          <h3 className="font-semibold text-green-800">🌱 اسم النبتة</h3>

          <p className="mt-1 text-gray-700">{diagnosis.plantName}</p>
        </div>

        <div className="rounded-xl bg-green-50 p-4">
          <h3 className="font-semibold text-green-800">❤️ حالة النبتة</h3>

          <p className="mt-1 text-gray-700">{diagnosis.condition}</p>
        </div>

        <div className="rounded-xl bg-green-50 p-4">
          <h3 className="font-semibold text-green-800">🩺 الصحة العامة</h3>

          <p className="mt-1 text-gray-700">{diagnosis.health}</p>
        </div>

        <div className="rounded-xl bg-green-50 p-4">
          <h3 className="font-semibold text-green-800">🌿 نصائح العناية</h3>

          <ul className="mt-2 list-disc space-y-2 pl-5 text-gray-700">
            {diagnosis.careSteps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-6 w-full rounded-xl border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
      >
        تشخيص نبتة أخرى
      </button>
    </div>
  );
}

export default DiagnosisResult;
