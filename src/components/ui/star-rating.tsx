"use client";

interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
  size?: number;
}

const StarRating = ({
  rating,
  max = 5,
  className = "",
  size = 24,
}: StarRatingProps) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: max }).map((_, i) => {
        const isFull = i + 1 <= Math.floor(rating);
        const isHalf = i < rating && i + 1 > rating;

        return (
          <div
            key={i}
            className="relative"
            style={{ width: size, height: size }}
          >
            {/* Empty gray star */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-full h-full text-[var(--bg-progress)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>

            {/* Filled or partial star */}
            {(isFull || isHalf) && (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-[var(--star)] absolute left-0 top-0"
                style={{
                  clipPath: isHalf
                    ? `inset(0 ${100 - (rating - i) * 100}% 0 0)`
                    : "none",
                }}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { StarRating };
