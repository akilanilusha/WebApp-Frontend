
import hero from '../../assets/homepage/hero.jpg';

function Card2(
    {
  img = hero,
  title = "Down South Package",
  rating = 4.8,
  ratingText = "(4.8 Rating)",
  price = "980.00",
  per = "/Person",
  duration = "7 Days",
  hid = "",
  blo = "",
}

) {
  return (
    <div
      className={`w-[275px] h-[400px] rounded-3xl bg-white shadow-xl overflow-hidden flex flex-col ${hid} ${blo}`}
    >
      {/* Top image */}
      <div className="h-[55%] w-full overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Middle content */}
      <div className="flex-1 px-4 pt-3 pb-2 space-y-2">
        {/* Title */}
        <h3 className="text-[16px] font-semibold text-gray-900">
          {title}
        </h3>

        {/* Rating row */}
        <div className="flex items-center gap-1 text-sm">
          <span className="text-amber-400 text-base">★★★★★</span>
          <span className="text-gray-500 ml-1">{ratingText}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-bold text-gray-900">${price}</span>
          <span className="text-sm text-gray-500">{per}</span>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="h-2 w-2 rounded-full bg-gray-400" />
          <span>{duration}</span>
        </div>

        <button className="flex items-center gap-2 rounded-full border border-secondary px-4 py-1.5 text-sm font-medium text-secondary hover:bg-emerald-500 hover:text-white transition">
          Book Now
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default Card2;