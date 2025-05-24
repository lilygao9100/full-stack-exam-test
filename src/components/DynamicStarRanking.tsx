"use client";

import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface DynamicStarRankingProps {
    initialRating?: number;
    onRatingChange?: (newRating: number) => void;
  }
  
  /**
 * Interactive star rating component that allows users to select and display ratings
 * Features hover effects and click-to-rate functionality
 */
  const DynamicStarRanking: React.FC<DynamicStarRankingProps> = ({
    initialRating = 0,
    onRatingChange,
  }) => {
    // Current selected rating (0-5)
    const [rating, setRating] = useState(initialRating);

    // Temporary rating shown during hover (null when not hovering)
    const [hoverRating, setHoverRating] = useState<number | null>(null);
  
    /**
     * Handles star selection
     * Updates the current rating and invokes the callback if provided
     * @param {number} star - The selected star value (1-5)
     */
    const handleClick = (star: number) => {
      setRating(star);
      if (onRatingChange) {
        onRatingChange(star);
      }
    };
  
    return (
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => {
            // Determine if star should appear filled (either hovered or selected)
            const isFilled = hoverRating !== null ? star <= hoverRating : star <= rating;
            return (
              <button
                key={star}
                type="button"
                onClick={() => handleClick(star)}
                onMouseEnter={() => {
                  console.log("Hovering star:", star);
                  setHoverRating(star);
                }}
                onMouseLeave={() => setHoverRating(null)}
                className="cursor-pointer focus:outline-none"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <FaStar
                  className={isFilled ? "text-yellow-400" : "text-gray-300"}
                  size={24}
                />
              </button>
            );
          })}
        </div>
      );
    };

export default DynamicStarRanking;


