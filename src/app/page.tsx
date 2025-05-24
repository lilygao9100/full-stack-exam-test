import React from "react";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold">Welcome to the Teach Team Web System</h1>
      <p className="mt-4 text-base p-2">
        This system helps tutors and lecturers manage their teaching and learning tasks effectively.
      </p>

      <Image
        src="/Images/about-page-1.jpg"
        alt="RMIT Uni picture"
        width={800}
        height={500}
        className="p-4 flex-auto relative h-[500px]"
      />
    </div>
  );
}

export default HomePage;

