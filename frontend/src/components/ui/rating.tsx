import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ratingVariants = {
  default: {
    star: "text-primary",
    emptyStar: "text-primary",
  },
  destructive: {
    star: "text-destructive",
    emptyStar: "text-destructive",
  },
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-yellow-200",
  },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  variant?: keyof typeof ratingVariants;
  onRatingChange?: (rating: number) => void;
}

export const Rating = ({
  rating: initialRating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = "default",
  onRatingChange,
  ...props
}: RatingsProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0"
    );
    onRatingChange?.(starIndex);
  };

  const fullStars = Math.floor(initialRating);

  return (
    <div className={cn("flex w-fit items-center gap-2")} {...props}>
      <div className="flex items-center cursor-pointer">
        {[...Array(fullStars)].map((_, i) =>
          React.cloneElement(Icon, {
            key: i,
            size,
            className: cn(
              fill ? "fill-current stroke-1" : "fill-transparent",
              ratingVariants[variant].star
            ),
            onClick: handleClick,
            "data-star-index": i + 1,
          })
        )}
        {[...Array(Math.max(0, totalStars - fullStars))].map((_, i) =>
          React.cloneElement(Icon, {
            key: i + fullStars + 1,
            size,
            className: cn("stroke-1", ratingVariants[variant].emptyStar),
            onClick: handleClick,
            "data-star-index": i + fullStars + 1,
          })
        )}
      </div>
    </div>
  );
};
