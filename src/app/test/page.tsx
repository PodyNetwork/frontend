"use client";
import React, { useState } from 'react';

const VideoGridApp = () => {
  const videoList = [
    { src: 'video1.mp4' },
    { src: 'video2.mp4' },
    { src: 'video3.mp4' },
    { src: 'video4.mp4' },
    { src: 'video5.mp4' },
    { src: 'video6.mp4' },
    { src: 'video7.mp4' },
    { src: 'video8.mp4' },
  ];

  const videosPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate total pages
  const totalPages = Math.ceil(videoList.length / videosPerPage);

  // Get videos for the current page
  const currentVideos = videoList.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  // Determine the grid layout based on the number of videos
  const getGridClasses = () => {
    if (currentVideos.length === 1) return 'grid-cols-1';
    if (currentVideos.length === 2) return 'grid-cols-2';
    if (currentVideos.length === 3) return 'grid-rows-2 grid-cols-2';
    return 'grid-cols-2'; // Default for 4 videos
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Responsive Video Grid</h1>

      {/* Video Grid */}
      <div className={`grid gap-4 mb-6 w-full ${getGridClasses()}`}>
        {currentVideos.map((video, index) => (
          <div
            key={index}
            className={`relative aspect-video bg-gray-300 ${
              currentVideos.length === 3 && index === 2
                ? 'col-span-2 mx-auto w-2/3'
                : ''
            }`}
          >
            {/* Video Player */}
            <video
              src={video.src}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoGridApp;
