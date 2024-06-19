import { Rating } from "../ui/rating";

interface RatingsProps {
  foodRate: number;
  setFoodRate: (value: number) => void;
  pricesRate: number;
  setPricesRate: (value: number) => void;
  attractionsRate: number;
  setAttractionsRate: (value: number) => void;
  nightlifeRate: number;
  setNightlifeRate: (value: number) => void;
}

function Ratings({
  foodRate,
  setFoodRate,
  pricesRate,
  setPricesRate,
  attractionsRate,
  setAttractionsRate,
  nightlifeRate,
  setNightlifeRate,
}: RatingsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex items-center justify-between gap-4 border-2 rounded-md py-2 px-3">
        <p>Food</p>
        <Rating rating={foodRate} size={35} onRatingChange={setFoodRate} />
      </div>
      <div className="flex items-center justify-between gap-4 border-2 rounded-md py-2 px-3">
        <p>Prices</p>
        <Rating rating={pricesRate} size={35} onRatingChange={setPricesRate} />
      </div>
      <div className="flex items-center justify-between gap-4 border-2 rounded-md py-2 px-3">
        <p>Attractions</p>
        <Rating
          rating={attractionsRate}
          size={35}
          onRatingChange={setAttractionsRate}
        />
      </div>
      <div className="flex items-center justify-between gap-4 border-2 rounded-md py-2 px-3">
        <p>Nightlife</p>
        <Rating
          rating={nightlifeRate}
          size={35}
          onRatingChange={setNightlifeRate}
        />
      </div>
    </div>
  );
}

export default Ratings;
