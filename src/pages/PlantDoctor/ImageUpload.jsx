function ImageUpload({ image, onImageSelect, onDiagnose, loading }) {
  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    onImageSelect(file);
  }

  return (
    <div className="w-full max-w-2xl rounded-[2.5rem] border border-[#EFF4BD]/15 bg-[#516F7A]/25 p-6 shadow-2xl backdrop-blur-md md:p-8">
      {/* Header */}
      <div className="mb-7 text-center">
        <div className="mb-4 text-5xl">🌱</div>

        <h2 className="font-[Katibeh] text-5xl text-[#A2B447]">
          ارفع صورة نبتتك
        </h2>

        <p className="mt-2 text-[#EFF4BD]/60">
          دع طبيب النباتات يلقي نظرة عليها ويخبرك بما تحتاجه.
        </p>
      </div>

      {/* Upload area */}
      <label
        htmlFor="plant-image"
        className="
          group flex min-h-80 cursor-pointer flex-col
          items-center justify-center overflow-hidden
          rounded-[2rem]
          border-2 border-dashed border-[#A2B447]/30
          bg-[#23361A]/60 p-6
          transition-all duration-500
          hover:border-[#A2B447]/70
          hover:bg-[#23361A]/80
        "
      >
        {image ? (
          <div className="relative flex w-full justify-center">
            <img
              src={URL.createObjectURL(image)}
              alt="النبتة المختارة"
              className="max-h-72 rounded-2xl object-contain shadow-xl"
            />

            <div className="absolute bottom-3 rounded-full bg-[#23361A]/80 px-4 py-2 text-xs text-[#EFF4BD]/80 backdrop-blur-sm">
              اضغط لاختيار صورة أخرى
            </div>
          </div>
        ) : (
          <>
            <div className="mb-5 text-6xl transition-transform duration-500 group-hover:scale-110">
              📷
            </div>

            <p className="font-semibold text-[#A2B447]">
              اضغط هنا لاختيار صورة
            </p>

            <p className="mt-2 text-sm text-[#EFF4BD]/40">JPG أو PNG أو WEBP</p>

            <div className="mt-5 rounded-full border border-[#A2B447]/10 bg-[#A2B447]/5 px-4 py-2 text-xs text-[#EFF4BD]/40">
              الحد الأقصى لحجم الصورة 10 ميجابايت
            </div>
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

      {/* Button */}
      {image && (
        <button
          onClick={onDiagnose}
          disabled={loading}
          className="
            mt-6 w-full rounded-2xl
            bg-[#A2B447]
            px-6 py-4
            font-bold text-[#23361A]
            shadow-lg shadow-[#A2B447]/10
            transition-all duration-300
            hover:-translate-y-1
            hover:bg-[#EFF4BD]
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-50
            disabled:hover:translate-y-0
          "
        >
          {loading ? "جاري الفحص..." : "شخّص نبتتي 🌿"}
        </button>
      )}
    </div>
  );
}

export default ImageUpload;
