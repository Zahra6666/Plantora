function ImageUpload({ image, onImageSelect, onDiagnose, loading }) {
  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    onImageSelect(file);
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-green-800">
          {" "}
          ارفع صورة نبتتك 🌱
        </h2>

        <p className="mt-2 text-gray-600">
          التقط صورة واضحة لنبتتك ودع طبيب النباتات يفحصها.
        </p>
      </div>

      <label
        htmlFor="plant-image"
        className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-300 bg-green-50 p-6 transition hover:border-green-500 hover:bg-green-100"
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="النبتة المختارة"
            className="max-h-64 rounded-lg object-contain"
          />
        ) : (
          <>
            <div className="mb-3 text-5xl">🌱</div>

            <p className="font-semibold text-green-800">
              اضغط هنا لاختيار صورة
            </p>

            <p className="mt-1 text-sm text-gray-500">JPG أو PNG أو WEBP</p>
          </>
        )}

        <input
          id="plant-image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {image && (
        <button
          onClick={onDiagnose}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-green-400"
        >
          {loading ? "جاري فحص النبتة..." : "شخّص نبتتي 🌿"}
        </button>
      )}
    </div>
  );
}

export default ImageUpload;
