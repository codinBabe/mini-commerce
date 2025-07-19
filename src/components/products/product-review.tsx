"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, ChevronDown } from "lucide-react";
import { reviewSchema, ReviewFormData } from "@/schema";
import { Input, Textarea, StarRating } from "../ui";

interface Review {
  user: string;
  comment: string;
  rating: number;
  date: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    user: "Grace Curry",
    comment:
      "I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn’t be happier with my purchase!! I have a pre-paid data plan so I was worried that this phone wouldn’t connect with my data plan, since the new phones don’t have the physical Sim tray anymore, but couldn’t have been easier! I bought an Unlocked black iPhone 14 Pro Max in excellent condition and everything is PERFECT. It was super easy to set up and the phone works and looks great. It truly was in excellent condition. Highly recommend!!!🖤",
    rating: 5,
    date: "21 January, 2025",
  },
  {
    user: "Ronald R. Richards",
    comment:
      "This phone has 1T storage and is durable. Plus all the new iPhones have a C port! Apple is phasing out the current ones! (All about the Benjamin’s) So if you want a phone that’s going to last grab an iPhone 14 pro max and get several cords and plugs.",
    rating: 4,
    date: "15 January, 2025",
  },
  {
    user: "Darcy King",
    comment:
      "I might be the only one to say this but the camera is a little funky. Hoping it will change with a software update: otherwise, love this phone! Came in great condition",
    rating: 4,
    date: "11 January, 2025",
  },
];

interface Props {
  rating: number;
  reviewCount: number;
  slug?: string;
}

export default function ProductReviews({
  rating,
  reviewCount,
  slug = "global",
}: Props) {
  const storageKey = `reviews-${slug}`;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAll, setShowAll] = useState(false);

  const starLabels = [
    { label: "Excellent", value: 5 },
    { label: "Good", value: 4 },
    { label: "Average", value: 3 },
    { label: "Below Average", value: 2 },
    { label: "Poor", value: 1 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setReviews(JSON.parse(saved));
  }, [storageKey]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { user: "", comment: "", rating: 0 },
  });

  const selectedRating = watch("rating");

  const onSubmit = (data: ReviewFormData) => {
    const newReview: Review = {
      user: data.user?.trim() || "You",
      comment: data.comment.trim(),
      rating: data.rating,
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    reset();
  };

  const allReviews = [...reviews, ...DEFAULT_REVIEWS];
  const visibleReviews = showAll ? allReviews : allReviews.slice(0, 3);
  const ratingCounts = starLabels.map(({ label, value }) => ({
    star: label,
    count: allReviews.filter((r) => r.rating === value).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="flex flex-col md:flex-row md:items-start items-center gap-16 mt-2">
          <div className="bg-[var(--bg-section)] p-5 rounded-md space-y-4 text-center">
            <p className="text-2xl md:text-5xl font-medium">
              {rating.toFixed(1)}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              of ({reviewCount} reviews)
            </p>
            <StarRating rating={rating} />
          </div>

          {/* Breakdown */}
          <div className="flex-1 space-y-2 text-sm">
            {ratingCounts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="w-40 font-medium text-lg">{star}</span>
                <div className="w-full bg-[var(--bg-progress)] rounded h-2">
                  <div
                    className="bg-[var(--star)] h-2 rounded"
                    style={{ width: `${(count / allReviews.length) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-[--text-secondary]">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leave a review */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 p-4 rounded-md"
      >
        <Input
          type="text"
          {...register("user")}
          placeholder="Your name (optional)"
          className="w-full border border-[var(--color-gray-300)] rounded-md p-2 text-sm"
        />
        <Textarea
          {...register("comment")}
          placeholder="Write your review..."
          className="w-full border-[var(--color-gray-300)] p-2 rounded-md text-sm resize-none"
          rows={3}
        />
        {errors.comment && (
          <p className="text-xs text-[var(--accent)]">
            {errors.comment.message}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setValue("rating", star)}
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= selectedRating
                      ? "text-[var(--star)]"
                      : "text-gray-300"
                  }`}
                  fill={star <= selectedRating ? "#facc15" : "none"}
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-xs text-[var(--accent)]">
              {errors.rating.message}
            </p>
          )}
          <button
            type="submit"
            className="ml-auto bg-black text-white text-sm px-4 py-1.5 rounded-md hover:bg-gray-900"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Reviews */}
      <div className="space-y-6">
        {visibleReviews.map((r, i) => (
          <div
            key={i}
            className="bg-[var(--bg-section)] rounded-xl p-4 animate-fade-in"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-bold">{r.user}</p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {r.date}
                  </p>
                </div>
                <p className="text-xl text-[var(--star)]">
                  {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                </p>

                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  {r.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allReviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mx-auto flex items-center gap-1 text-sm font-medium border px-3 py-1 rounded-md hover:bg-gray-50 transition"
        >
          View {showAll ? "Less" : "More"}{" "}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showAll ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
}
