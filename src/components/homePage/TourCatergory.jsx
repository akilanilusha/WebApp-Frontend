import CurveSlider from "./CurveSlider"
import Topic from "./topic"

function TourCatergory() {
  return (
    <section className="w-full min-h-[700px] flex flex-col
                        bg-gradient-to-b from-white via-slate-50 to-white">

      {/* 🔹 Heading Section */}
      <div className="text-center pt-24 pb-12">
        <Topic
          topic="Wonderfull Places For You"
          subtopic="Tour Categories"
        />

        {/* Accent line */}
        <div className="mt-6 flex justify-center">
          <span className="w-20 h-1 rounded-full bg-blue-600"></span>
        </div>
      </div>

      {/* 🔹 Slider */}
      <div className="w-full flex items-center justify-center px-4 sm:px-10">
        <CurveSlider />
      </div>

    </section>
  )
}

export default TourCatergory
