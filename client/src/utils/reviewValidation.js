const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 40;
const COMMENT_MIN_LENGTH = 10;
const COMMENT_MAX_LENGTH = 500;

export function validateReviewInput(reviewInput) {
  const errors = {};

  if (!reviewInput.reviewerName || !reviewInput.reviewerName.trim()) {
    errors.reviewerName = 'Vui long nhap ten nguoi danh gia.';
  } else {
    const trimmedNameLength = reviewInput.reviewerName.trim().length;
    if (trimmedNameLength < NAME_MIN_LENGTH || trimmedNameLength > NAME_MAX_LENGTH) {
      errors.reviewerName = 'Ten nguoi danh gia phai tu 2 den 40 ky tu.';
    }
  }

  const ratingNumber = Number(reviewInput.rating);
  if (!Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
    errors.rating = 'So sao danh gia phai trong khoang 1-5.';
  }

  if (!reviewInput.comment || !reviewInput.comment.trim()) {
    errors.comment = 'Vui long nhap noi dung danh gia.';
  } else {
    const trimmedCommentLength = reviewInput.comment.trim().length;
    if (
      trimmedCommentLength < COMMENT_MIN_LENGTH ||
      trimmedCommentLength > COMMENT_MAX_LENGTH
    ) {
      errors.comment = 'Noi dung danh gia phai tu 10 den 500 ky tu.';
    }
  }

  return errors;
}
