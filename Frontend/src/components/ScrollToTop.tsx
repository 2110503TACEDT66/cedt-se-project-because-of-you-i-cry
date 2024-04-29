"use client";

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling animation
    });
  };

  return (
    <div className="flex flex-row justify-center items-center p-4 h-[20vh]">
      <button
        onClick={scrollToTop}
        className="py-2 px-4 bg-transparent border border-[#4C6449] rounded-lg hover:shadow-lg text-black"
      >
        Scroll To Top
      </button>
    </div>
  );
}
