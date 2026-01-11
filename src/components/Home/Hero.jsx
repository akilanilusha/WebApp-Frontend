import heroVideo from "../../assets/homepage/hero/herovideo.mp4";
import RoutePlanner from "./RoutePlanner";

function Hero() {
  return (
    <section className="relative h-screen overflow-hidden text-white">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-[calc(100vh-120px)]">
        <p className="uppercase tracking-[0.3em] text-sm mb-4">
          Plan smarter with
        </p>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-wide">
          TRIPGENIX
        </h1>

        <p className="max-w-2xl mt-6 text-sm md:text-base text-white/90">
          Effortlessly plan your journey with intelligent route optimization.
          Discover the shortest paths, estimated distance, time, and cost — all
          before you book your trip.
        </p>        
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <button className="px-6 py-3 bg-[#1DA9CC] text-white rounded-full font-semibold hover:bg-[#0d8a9f] transition duration-300">
          Plan your trip
        </button>
      </div>
    </section>
  );
}

export default Hero;
