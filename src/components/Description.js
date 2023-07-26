import React from "react";

function Description({ input }) {
  const keyPoints = input
    .trim()
    .split("`")
    .map((point) => point.trim());

  return (
    <ul className="text-gray-700">
      {keyPoints.map((point, index) => (
        <li className="mt-2" key={index}>
          +{point}
        </li>
      ))}
    </ul>
  );
}

export default Description;
