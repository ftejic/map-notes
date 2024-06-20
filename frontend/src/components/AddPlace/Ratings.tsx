import { Rating } from "../ui/rating";

interface RatingsProps {
  foodRating: number;
  setFoodRating: (value: number) => void;
  pricesRating: number;
  setPricesRating: (value: number) => void;
  attractionsRating: number;
  setAttractionsRating: (value: number) => void;
  nightlifeRating: number;
  setNightlifeRating: (value: number) => void;
}

function Ratings({
  foodRating,
  setFoodRating,
  pricesRating,
  setPricesRating,
  attractionsRating,
  setAttractionsRating,
  nightlifeRating,
  setNightlifeRating,
}: RatingsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-base">
      <div className="flex items-center justify-between gap-4 border-2 rounded-md py-2 px-3">
        <p>Food</p>
        <Rating rating={foodRating} size={35} onRatingChange={setFoodRating} />
      </div>
      <div className="flex items-center justify-between gap-4 border-2 rounded-md py-2 px-3">
        <p>Prices</p>
        <Rating
          rating={pricesRating}
          size={35}
          onRatingChange={setPricesRating}
        />
      </div>
      <div className="flex items-center justify-between gap-4 border-2 rounded-md py-2 px-3">
        <p>Attractions</p>
        <Rating
          rating={attractionsRating}
          size={35}
          onRatingChange={setAttractionsRating}
        />
      </div>
      <div className="flex items-center justify-between gap-4 border-2 rounded-md py-2 px-3">
        <p>Nightlife</p>
        <Rating
          rating={nightlifeRating}
          size={35}
          onRatingChange={setNightlifeRating}
        />
      </div>
    </div>
  );
}

export default Ratings;
