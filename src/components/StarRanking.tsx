import { FaStar } from 'react-icons/fa';
import React from 'react';

interface StarRankingProps {
  rating: number;
}

/**
 * Displays a static star rating visualization
 * Shows filled stars up to the given rating, with remaining stars as outline
 * Useful for displaying read-only ratings in a consistent visual style
 */
const StarRanking = ({ rating = 0 }: StarRankingProps) => {
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
          size={20}
        />
      ))}
    </div>
  );
};

export default StarRanking;
