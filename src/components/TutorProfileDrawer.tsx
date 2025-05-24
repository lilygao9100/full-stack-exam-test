"use client";
import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import ProfileEntirePage from "./tutorProfile/ProfileEntirePage";
import DynamicStarRanking from "./DynamicStarRanking";
import { FaTimes, FaChevronLeft, FaExpand, FaCompress } from "react-icons/fa";
import { Tutor } from "@/types/tutors";

interface TutorProfileDrawerProps {
  onClose: () => void;
  tutor: Tutor;
}

/**
 * TutorProfileDrawer component - Resizable and draggable profile drawer
 * Features full-screen toggle, rating system, and comment functionality
 */
const TutorProfileDrawer: React.FC<TutorProfileDrawerProps> = ({ onClose, tutor }) => {
  // State for fullscreen mode
  const [fullScreen, setFullScreen] = useState(false);

  // State for draggable/resizable window properties
  const [rndProps, setRndProps] = useState({
    width: 400,
    height: window.innerHeight,
    x: window.innerWidth - 400,
    y: 0,
  });

  /**
   * Effect to handle window resize and fullscreen toggle
   * Updates the drawer dimensions based on current screen size and fullscreen state
   */
  useEffect(() => {
    setRndProps(fullScreen
      ? { width: window.innerWidth, height: window.innerHeight, x: 0, y: 0 }
      : { width: 400, height: window.innerHeight, x: window.innerWidth - 400, y: 0 });
  }, [fullScreen]);

  // Toggle between fullscreen and default size
  const toggleFullScreen = () => setFullScreen(!fullScreen);
  
  // Rating system state
  const [rating, setRating] = useState(0);

  // Comment system state
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<string[]>([
    "Great tutor!",
    "Very knowledgeable.",
  ]);

  /**
   * Handles comment submission
   * Adds new comment to the list and clears the input field
   */
  const handleSubmitComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, commentInput.trim()]);
      setCommentInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Semi-transparent overlay that closes the drawer when clicked */}
      <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose} />
      
      {/* Draggable/Resizable window component */}
      <Rnd
        size={{ width: rndProps.width, height: rndProps.height }}
        position={{ x: rndProps.x, y: rndProps.y }}
        minWidth={300}
        bounds="window"
        enableResizing={{ left: true }}
        onDragStop={(e, d) => setRndProps(prev => ({ ...prev, x: d.x, y: d.y }))}
        onResizeStop={(e, dir, ref, delta, pos) =>
          setRndProps({ width: ref.offsetWidth, height: ref.offsetHeight, x: pos.x, y: pos.y })
        }
      >
        {/* Main drawer container */}
        <div className="h-full bg-white flex flex-col border">
          {/* Header with navigation controls */}
          <div className="flex justify-between items-center p-3 border-b">
            <button onClick={onClose} className="text-sm flex items-center gap-2">
              <FaChevronLeft />
              Back
            </button>
            <div className="flex gap-2">
              <button onClick={toggleFullScreen}>
                {fullScreen ? <FaCompress /> : <FaExpand />}
              </button>
              <button onClick={onClose}>
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Rating and Comment Section */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-base">Rate & Comment</h3>

              {/* Interactive star rating component */}
              <DynamicStarRanking
                initialRating={rating}
                onRatingChange={setRating}
              />

              {/* Comment input field */}
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Leave a comment..."
                className="w-full border rounded p-2 mt-2"
              />

              {/* Comment submission button */}
              <button
                onClick={handleSubmitComment}
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm"
              >
                Submit
              </button>

              {/* Display existing comments */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-base">Comments</h4>
                {comments.map((c, i) => (
                  <p key={i} className="text-sm border-b py-1">{c}</p>
                ))}
              </div>
            </div>

            {/* Tutor Profile */}
            <ProfileEntirePage />
          </div>

          {/* Footer with close button */}
          <div className="p-3 border-t flex justify-end">
            <button onClick={onClose} className="text-sm underline">Close</button>
          </div>
        </div>
      </Rnd>
    </div>
  );
};

export default TutorProfileDrawer;


