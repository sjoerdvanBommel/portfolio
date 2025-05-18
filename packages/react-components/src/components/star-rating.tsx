import { Star, StarHalf } from 'lucide-react';

export function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
      ))}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-current text-yellow-500" />}
    </div>
  );
}
