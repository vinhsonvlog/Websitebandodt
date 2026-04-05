import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Cột 1 */}
        <div className="footer-col">
          <h4>Tổng đài hỗ trợ miễn phí</h4>
          <ul>
            <li>
              Mua hàng - bảo hành 1234.5678 <br />
              (7h30 - 22h00)
            </li>
            <li>
              Khiếu nại <a href="tel:12345678">1234.5678</a> <br />
              (8h00 - 21h30)
            </li>
          </ul>
          <h4 className="mt-4">Phương thức thanh toán</h4>
          <div className="payment-methods">
            <div className="pay-tag">Apple Pay</div>
            <div className="pay-tag text-blue">VNPAY</div>
            <div className="pay-tag text-pink">MoMo</div>
            <div className="pay-tag text-blue-light">OnePay</div>
            <div className="pay-tag text-green">ZaloPay</div>
            <div className="pay-tag text-yellow">AlePay</div>
            <div className="pay-tag text-orange">Kredivo</div>
            <div className="pay-tag text-red">mPOS</div>
          </div>
        </div>

        {/* Cột 2 */}
        <div className="footer-col">
          <h4>Thông tin về chính sách</h4>
          <ul>
            <li>
              <a href="/">Mua hàng và thanh toán Online</a>
            </li>
            <li>
              <a href="/">Mua hàng trả góp Online</a>
            </li>
            <li>
              <a href="/">Mua hàng trả góp bằng thẻ tín dụng</a>
            </li>
            <li>
              <a href="/">Chính sách giao hàng</a>
            </li>
            <li>
              <a href="/">Chính sách đổi trả</a>
            </li>
            <li>
              <a href="/">Tra thông tin bảo hành</a>
            </li>
            <li>
              <a href="/">Tra cứu hoá đơn điện tử</a>
            </li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div className="footer-col">
          <h4>Về chúng tôi</h4>
          <ul>
            <li>
              <a href="/">Giới thiệu về công ty</a>
            </li>
            <li>
              <a href="/">Quy chế hoạt động</a>
            </li>
            <li>
              <a href="/">Dự án Doanh nghiệp</a>
            </li>
            <li>
              <a href="/">Tin tức khuyến mại</a>
            </li>
            <li>
              <a href="/">Giới thiệu máy đổi trả</a>
            </li>
            <li>
              <a href="/">Đại lý uỷ quyền của Apple</a>
            </li>
            <li>
              <a href="/">Câu hỏi thường gặp</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 TechStore. All rights reserved.</p>
      </div>
    </footer>
  );
}
