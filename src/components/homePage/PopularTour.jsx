import Card1 from "./Card1";
import Card2 from "./Card2";
import Topic from "./topic";
import tour from "../../assets/sectionImg/tour.jpg";
import hero from '../../assets/homepage/hero.jpg';

function PopularTour() {
  const cardData = [
    {
      img: hero,
      title: "Down South Package",
      rating: 4.8,
      ratingText: "(4.8 Rating)",
      price: "980.00",
      per: "/Person",
      duration: "7 Days",
      hid: "hidden",
      blo: "md:block",
    },

    {
      img: hero,
      title: "Down South Package",
      rating: 4.8,
      ratingText: "(4.8 Rating)",
      price: "980.00",
      per: "/Person",
      duration: "7 Days",
      hid: "hidden",
      blo: "lg:block",
    },

    {
      img: hero,
      title: "Down South Package",
      rating: 4.8,
      ratingText: "(4.8 Rating)",
      price: "980.00",
      per: "/Person",
      duration: "7 Days",
      hid: "hidden",
      blo: "lg:block",
    },

    {
      img: hero,
      title: "Down South Package",
      rating: 4.8,
      ratingText: "(4.8 Rating)",
      price: "980.00",
      per: "/Person",
      duration: "7 Days",
      hid: "hidden",
      blo: "lg:block",
    },
  ];
  return (
    <section className="w-full h-fit flex flex-col relative justify-center items-center">
      <div className="w-full h-[650px] sm:h-[700px]">
        <div
          className="w-full h-[500px] flex flex-col items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${tour})` }}
        >
          <Topic
            topic="Best Popular Tour"
            subtopic="Most Popular Tour"
            margin="mt-10"
          />
          <p className="w-fit text-center mt-5 text-accent text-[14px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="w-full h-[400px] max-w-6xl absolute z-8 top-50 left-5 lg:left-1/9 sm:top-60 gap-6 place-items-center justify-items-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          
            {cardData.map((card, index) => (
                <Card2 
                  img={card.img}
                  title={card.title}
                  rating={card.rating}
                  ratingText={card.ratingText}
                  price={card.price}
                  per={card.per}
                  duration={card.duration}
                  hid={card.hid}
                  blo={card.blo}
                />
            ))}
         
        </div>
      </div>
    </section>
  );
}

export default PopularTour;
