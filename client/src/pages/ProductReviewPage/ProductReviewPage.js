import ProductReviewCard from '../../components/ProductReviewCard/ProductReviewCard';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import ReviewList from '../../components/ReviewList/ReviewList';
import ReviewTopNav from '../../components/ReviewTopNav/ReviewTopNav';
import { useProductReviews } from '../../hooks/useProductReviews';

const DEMO_PRODUCT_ID = 'demo-product-1';

function ProductReviewPage() {
  const {
    viewStatus,
    product,
    reviews,
    summary,
    formValues,
    formErrors,
    submitMessage,
    submitStatus,
    isSubmitting,
    loadReviewData,
    handleFieldChange,
    submitReview
  } = useProductReviews(DEMO_PRODUCT_ID);

  if (viewStatus === 'error') {
    return (
      <main>
        <p role="alert">Da xay ra loi khi tai du lieu danh gia.</p>
        <button type="button" onClick={loadReviewData}>
          Thu lai
        </button>
      </main>
    );
  }

  return (
    <main>
      <ReviewTopNav />

      <ProductReviewCard product={product} summary={summary} />

      <ReviewForm
        formValues={formValues}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        submitStatus={submitStatus}
        onFieldChange={handleFieldChange}
        onSubmit={submitReview}
      />

      <ReviewList reviews={reviews} viewStatus={viewStatus} />
    </main>
  );
}

export default ProductReviewPage;
