function ReviewList({ reviews, viewStatus }) {
  if (viewStatus === 'loading') {
    return <p>Dang tai danh gia...</p>;
  }

  if (viewStatus === 'error') {
    return <p role="alert">Khong the tai danh sach danh gia.</p>;
  }

  if (reviews.length === 0) {
    return <p>Chua co danh gia nao.</p>;
  }

  return (
    <section aria-label="Danh sach danh gia">
      <h2>Danh sach danh gia</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>{review.reviewerName}</strong>
            <span> - {review.rating}/5</span>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ReviewList;
