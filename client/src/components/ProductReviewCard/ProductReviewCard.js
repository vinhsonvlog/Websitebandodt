function ProductReviewCard({ product, summary }) {
  if (!product) {
    return null;
  }

  return (
    <section aria-label="Thong tin san pham">
      <h1>Danh gia san pham</h1>
      <p>San pham: {product.name}</p>
      <p>
        Tong danh gia: {summary.totalReviews} | Diem trung binh: {summary.averageRating}
      </p>
    </section>
  );
}

export default ProductReviewCard;
