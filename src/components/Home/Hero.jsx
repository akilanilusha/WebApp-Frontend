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

        {/* Search Bar */}
        <div className="mt-10">
          <RoutePlanner />
        </div>
      </div>
    </section>
  );
}

export default Hero;
