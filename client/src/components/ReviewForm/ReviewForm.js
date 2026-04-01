function ReviewForm({
  formValues,
  formErrors,
  isSubmitting,
  submitMessage,
  submitStatus,
  onFieldChange,
  onSubmit
}) {
  return (
    <section aria-label="Tao danh gia moi">
      <h2>Gui danh gia cua ban</h2>
      <form onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="reviewerName">Ten nguoi danh gia</label>
          <input
            id="reviewerName"
            name="reviewerName"
            value={formValues.reviewerName}
            onChange={onFieldChange}
            disabled={isSubmitting}
          />
          {formErrors.reviewerName ? <p>{formErrors.reviewerName}</p> : null}
        </div>

        <div>
          <label htmlFor="rating">So sao</label>
          <select
            id="rating"
            name="rating"
            value={formValues.rating}
            onChange={onFieldChange}
            disabled={isSubmitting}
          >
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
          {formErrors.rating ? <p>{formErrors.rating}</p> : null}
        </div>

        <div>
          <label htmlFor="comment">Noi dung danh gia</label>
          <textarea
            id="comment"
            name="comment"
            value={formValues.comment}
            onChange={onFieldChange}
            rows={4}
            disabled={isSubmitting}
          />
          {formErrors.comment ? <p>{formErrors.comment}</p> : null}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Dang gui...' : 'Gui danh gia'}
        </button>

        {submitMessage ? (
          <p role={submitStatus === 'error' ? 'alert' : 'status'}>{submitMessage}</p>
        ) : null}
      </form>
    </section>
  );
}

export default ReviewForm;
