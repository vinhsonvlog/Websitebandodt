import ProductReviewCard from '../../components/ProductReviewCard/ProductReviewCard';
import ReviewList from '../../components/ReviewList/ReviewList';
import ReviewTopNav from '../../components/ReviewTopNav/ReviewTopNav';
import { useProductReviews } from '../../hooks/useProductReviews';
import './ProductReviewPage.css';

const DEMO_PRODUCT_ID = 'demo-product-1';

function ProductReviewPage() {
  const {
    viewStatus,
    reviews,
    summary,
    loadReviewData
  } = useProductReviews(DEMO_PRODUCT_ID);

  if (viewStatus === 'error') {
    return (
      <main className="product-review-page">
        <p role="alert">Đã xảy ra lỗi khi tải dữ liệu đánh giá.</p>
        <button type="button" onClick={loadReviewData}>
          Thử lại
        </button>
      </main>
    );
  }

  return (
    <div className="product-review-page">
      <div className="product-review-page__container">
        {/* Cột trái: Tóm tắt */}
        <aside className="product-review-page__sidebar-left">
          <ProductReviewCard summary={summary} />
        </aside>
        
        {/* Cột phải: Danh sách bình luận */}
        <main className="product-review-page__content-right">
          <ReviewTopNav />
          <ReviewList reviews={reviews} viewStatus={viewStatus} />
        </main>
      </div>
    </div>
  );
}

export default ProductReviewPage;



