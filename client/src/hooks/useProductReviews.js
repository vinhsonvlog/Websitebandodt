import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getProductReviewData,
  submitProductReview
} from '../services/reviewService';
import { validateReviewInput } from '../utils/reviewValidation';

const INITIAL_FORM_VALUES = {
  reviewerName: '',
  rating: 5,
  comment: ''
};

export function useProductReviews(productId) {
  const [viewStatus, setViewStatus] = useState('loading');
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ totalReviews: 0, averageRating: 0 });
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const loadReviewData = useCallback(async () => {
    setViewStatus('loading');

    try {
      const response = await getProductReviewData(productId);

      if (!response.success || !response.data) {
        setViewStatus('empty');
        setProduct(null);
        setReviews([]);
        setSummary({ totalReviews: 0, averageRating: 0 });
        return;
      }

      setProduct(response.data.product);
      setReviews(response.data.reviews);
      setSummary(response.data.summary);
      setViewStatus(response.data.reviews.length === 0 ? 'empty' : 'success');
    } catch (error) {
      setViewStatus('error');
    }
  }, [productId]);

  useEffect(() => {
    loadReviewData();
  }, [loadReviewData]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }));

    setFormErrors((prev) => {
      if (!prev[name]) {
        return prev;
      }

      const nextErrors = { ...prev };
      delete nextErrors[name];
      return nextErrors;
    });

    if (submitMessage) {
      setSubmitMessage('');
    }
  };

  const submitReview = async (event) => {
    event.preventDefault();

    const payload = {
      productId,
      ...formValues
    };

    const clientErrors = validateReviewInput(payload);
    if (Object.keys(clientErrors).length > 0) {
      setFormErrors(clientErrors);
      return;
    }

    setSubmitStatus('submitting');
    setSubmitMessage('');

    try {
      const response = await submitProductReview(payload);

      if (!response.success) {
        setSubmitStatus('error');
        setSubmitMessage(response.message || 'Khong the gui danh gia.');

        if (response.data?.errors) {
          setFormErrors(response.data.errors);
        }

        return;
      }

      setSubmitStatus('success');
      setSubmitMessage(response.message || 'Gui danh gia thanh cong.');
      setReviews((prev) => [response.data.review, ...prev]);
      setSummary(response.data.summary);
      setFormValues(INITIAL_FORM_VALUES);
      setFormErrors({});
      setViewStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Khong the gui danh gia.');
    }
  };

  const isSubmitting = submitStatus === 'submitting';

  const sortedReviews = useMemo(() => {
    return [...reviews].sort(
      (left, right) => new Date(right.createdAt) - new Date(left.createdAt)
    );
  }, [reviews]);

  return {
    viewStatus,
    product,
    reviews: sortedReviews,
    summary,
    formValues,
    formErrors,
    submitMessage,
    submitStatus,
    isSubmitting,
    loadReviewData,
    handleFieldChange,
    submitReview
  };
}
