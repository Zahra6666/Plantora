import { useNavigate } from "react-router-dom";

function BackToHome() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      aria-label="العودة إلى الرئيسية"
      className="
  fixed left-5 top-5 z-50
  flex items-center gap-2
  rounded-full
  border border-[#EFF4BD]/50
  bg-[#A2B447]/95
  px-5 py-3
  font-katibeh text-xl
  text-[#23361A]
  shadow-[0_10px_35px_rgba(35,54,26,0.35)]
  backdrop-blur-xl
  transition-all duration-300
  hover:-translate-y-1
  hover:border-[#EFF4BD]
  hover:bg-[#EFF4BD]
  hover:text-[#23361A]
  hover:shadow-[0_15px_40px_rgba(35,54,26,0.4)]
  active:translate-y-0
"
    >
      <span className="text-2xl leading-none">⌂</span>
      <span>الرئيسية</span>
    </button>
  );
}

export default BackToHome;
