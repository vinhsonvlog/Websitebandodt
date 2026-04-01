import { validateReviewInput } from '../utils/reviewValidation';

const MOCK_REVIEW_STORE = {
  'demo-product-1': {
    product: {
      id: 'demo-product-1',
      name: 'San pham demo'
    },
    reviews: []
  }
};

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const calculateSummary = (reviews) => {
  if (reviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return {
    totalReviews: reviews.length,
    averageRating: Number((totalRating / reviews.length).toFixed(1))
  };
};

const getStoreByProductId = (productId) => {
  return MOCK_REVIEW_STORE[productId] || null;
};

export async function getProductReviewData(productId) {
  await delay(300);

  const productStore = getStoreByProductId(productId);
  if (!productStore) {
    return {
      success: true,
      data: null,
      message: 'Khong tim thay san pham.'
    };
  }

  const summary = calculateSummary(productStore.reviews);

  return {
    success: true,
    data: {
      product: productStore.product,
      reviews: productStore.reviews,
      summary
    }
  };
}

export async function submitProductReview(reviewPayload) {
  await delay(450);

  const productStore = getStoreByProductId(reviewPayload.productId);
  if (!productStore) {
    return {
      success: false,
      message: 'San pham khong ton tai.',
      code: 'PRODUCT_NOT_FOUND'
    };
  }

  const validationErrors = validateReviewInput(reviewPayload);
  if (Object.keys(validationErrors).length > 0) {
    return {
      success: false,
      message: 'Du lieu danh gia khong hop le.',
      code: 'INVALID_REVIEW_INPUT',
      data: {
        errors: validationErrors
      }
    };
  }

  const nextReview = {
    id: `${Date.now()}`,
    reviewerName: reviewPayload.reviewerName.trim(),
    rating: Number(reviewPayload.rating),
    comment: reviewPayload.comment.trim(),
    createdAt: new Date().toISOString()
  };

  productStore.reviews = [nextReview, ...productStore.reviews];

  return {
    success: true,
    data: {
      review: nextReview,
      summary: calculateSummary(productStore.reviews)
    },
    message: 'Gui danh gia thanh cong.'
  };
}
