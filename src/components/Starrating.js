function StarRating({ rating }) {
  const filledStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(5 - rating);

  return (
    <div className="text-yellow-500 text-lg">
      {filledStars}
      {emptyStars}
    </div>
  );
}
export default StarRating;
