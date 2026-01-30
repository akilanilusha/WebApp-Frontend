import { GiStarShuriken } from "react-icons/gi";
import { FaRegCompass } from "react-icons/fa6";
import { PiTargetBold } from "react-icons/pi";
import { BiSolidDollarCircle } from "react-icons/bi";

function TourGuideCard({ guide }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4">
      <img
        src={guide.image}
        alt={guide.name}
        className="w-full h-52 object-cover rounded-lg"
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-blue-700">
          {guide.name}
        </h3>

        <p className="text-sm text-gray-500">{guide.role}</p>

        <div className="mt-3 text-sm space-y-1">
            <div className="flex flex-row justify-start items-center gap-2">
                <div className=""><GiStarShuriken /> </div>
                <div className="">{guide.rating} ({guide.reviews} reviews)</div>
            </div>

            <div className="flex flex-row justify-start items-center gap-2">
                <div className=""><FaRegCompass /> </div>
                <div className="">Experience: {guide.experience}</div>
            </div>

            <div className="flex flex-row justify-start items-center gap-2">
                <div className=""><PiTargetBold /> </div>
                <div className="">Best for: {guide.bestFor}</div>
            </div>

            <div className="flex flex-row justify-start items-center gap-2 font-semibold text-blue-600">
                <div className=""><BiSolidDollarCircle /> </div>
                <div className="">${guide.price} / hour</div>
            </div>
        
        </div>

        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
          View Profile
        </button>
      </div>
    </div>
  );
}

export default TourGuideCard;