# RULE - CLIENT & SERVER

## 1) Mục tiêu chung
- Code phải `dễ đọc > khôn vặt`.
- Ưu tiên `tái sử dụng` thay vì copy/paste.
- Mỗi thay đổi phải có `lý do kỹ thuật rõ ràng` (bug fix, maintainability, performance, security).
- Không merge nếu còn warning/lỗi lint hoặc logic không rõ ràng.

## 2) Quy tắc kiến trúc
- Tách lớp rõ ràng:
  - `Client`: `pages` (UI theo màn hình), `components` (UI tái sử dụng), `services` (API), `utils` (hàm thuần), `hooks` (logic dùng lại).
  - `Server`: `routes` -> `controllers` -> `services` -> `data/store`.
- `Controller` không chứa business logic phức tạp.
- `Service` không phụ thuộc Express `req/res`.
- Mỗi module chỉ chịu `một trách nhiệm chính` (Single Responsibility).

## 3) Quy tắc clean code
- Đặt tên rõ nghĩa:
  - Biến/hàm: `camelCase`
  - Component React: `PascalCase`
  - File utility/service: nhất quán theo chức năng (`authService.js`, `userStore.js`).
- Hàm ngắn, mục tiêu một việc; nếu > 30-40 dòng cần xem xét tách hàm.
- Tránh magic number/string, đưa thành `const`.
- Dùng early return để giảm lồng `if`.
- Comment chỉ khi cần giải thích `why`, không comment thứ code đã thể hiện rõ.
- Không để code chết (unused import/variable/function).

## 4) Quy tắc tái sử dụng
- Logic dùng từ 2 nơi trở lên phải tách thành `shared util/hook/service`.
- Không duplicate validation; gom vào validator chung.
- API call tập trung ở `client/src/services`, không gọi `fetch` trực tiếp trong nhiều component.
- Response format thống nhất giữa các endpoint:
  - Success: `{ success: true, data, message? }`
  - Error: `{ success: false, message, code? }`

## 5) Quy tắc Client (React)
- Component presentational không chứa logic gọi API.
- State chỉ đặt ở level cần thiết, tránh prop drilling sâu; khi cần, tách custom hook.
- Form phải có:
  - Validate đầu vào trước khi submit.
  - Disable nút submit khi đang gửi request.
  - Hiển thị error message rõ ràng cho user.
- Không hard-code URL API trong component; dùng `env`/config.
- CSS:
  - Tên class theo ngữ nghĩa.
  - Tránh lặp style; tách lớp dùng lại.
  - Không viết CSS ảnh hưởng global ngoài phạm vi cần thiết.

## 6) Quy tắc Server (Express)
- Route chỉ định nghĩa endpoint + middleware, không xử lý nghiệp vụ.
- Controller:
  - Parse input, gọi service, trả response.
  - Không thao tác trực tiếp file/data layer nếu đã có service.
- Service:
  - Chứa nghiệp vụ và validation chính.
  - Trả lỗi có kiểm soát (throw Error có message/code rõ).
- Middleware:
  - Auth middleware kiểm tra token và gắn user vào request.
  - Error handler tập trung, không `try/catch` lặp ở mọi nơi nếu không cần.
- Bảo mật cơ bản:
  - Hash password trước khi lưu.
  - Không log thông tin nhạy cảm (password, token).
  - JWT secret chỉ lấy từ `.env`.

## 7) Quy tắc tối ưu
- Tránh đọc/ghi file hoặc thao tác I/O lặp nhiều lần không cần thiết.
- Giảm re-render ở client:
  - Tách component nhỏ theo trách nhiệm.
  - Dùng memoization (`useMemo`, `useCallback`) khi có vấn đề hiệu năng thực tế.
- Chỉ tối ưu khi có dấu hiệu nghẽn rõ ràng (đo đạc được), tránh tối ưu sớm.
- Với dữ liệu lớn, cân nhắc phân trang/lazy loading.

## 8) Error handling & logging
- Mọi lỗi trả về phải có message có thể hiểu được.
- Không trả stack trace cho client ở môi trường production.
- Log server theo mức độ: `info`, `warn`, `error`.
- Log cần đủ context để debug: endpoint, userId (nếu có), thời điểm.

## 9) Testing & quality gate
- Mỗi bug fix phải có ít nhất 1 case test hoặc kịch bản tái hiện rõ ràng.
- Trước khi merge:
  - Client build chạy được.
  - Server start chạy được.
  - Luồng chính (register/login/verify token) test thủ công pass.
- Không merge code “tạm”, TODO chưa có ticket theo dõi.

## 10) Git & review
- Mỗi PR nên nhỏ, tập trung 1 mục tiêu.
- Commit message rõ nghĩa:
  - `feat: ...`
  - `fix: ...`
  - `refactor: ...`
  - `chore: ...`
- Review tập trung vào:
  - Đúng nghiệp vụ.
  - Rủi ro bảo mật.
  - Khả năng tái sử dụng.
  - Ảnh hưởng hiệu năng.

## 11) Definition of Done
- Code đúng yêu cầu + qua checklist mục 9.
- Không tạo regression ở luồng cũ.
- Cấu trúc code vẫn rõ ràng sau khi thêm tính năng.

## 12) Quy tắc UI/UX
- Nhất quán:
  - Dùng chung màu, typography, spacing, border-radius theo design token.
  - Cùng một hành vi UI phải có cùng cách hiển thị ở mọi màn hình.
- Phân cấp thị giác:
  - Mỗi màn hình phải có `1 primary action` rõ ràng.
  - Tiêu đề, mô tả, nội dung, CTA có cấp độ rõ (không để nhiều điểm nhấn cạnh tranh nhau).
- Khoảng cách & bố cục:
  - Dùng hệ spacing 4/8px, tránh đặt giá trị ngẫu nhiên.
  - Ưu tiên grid/flex rõ ràng, không canh chỉnh bằng margin “chữa cháy”.
- Form UX:
  - Label luôn hiển thị, không thay hoàn toàn bằng placeholder.
  - Validate realtime hợp lý (onBlur/onSubmit), thông báo lỗi cụ thể và gần field lỗi.
  - Sau submit lỗi, focus vào field lỗi đầu tiên.
- Trạng thái bắt buộc:
  - Mọi view có đủ trạng thái: `loading`, `empty`, `error`, `success`.
  - Nút/action khi loading phải disable và có chỉ báo đang xử lý.
- Feedback người dùng:
  - Thao tác thành công/thất bại cần phản hồi tức thời (toast/inline message).
  - Hành động nguy hiểm (xóa, ghi đè) cần confirm rõ ràng.
- Accessibility (A11y):
  - Tất cả control phải dùng được bằng bàn phím (Tab, Enter, Esc).
  - Có focus state rõ ràng, không tắt outline mặc định nếu không thay thế tương đương.
  - Độ tương phản màu đạt tối thiểu WCAG AA cho text chính.
  - Ảnh/icon mang ý nghĩa phải có `alt`/`aria-label` phù hợp.
- Responsive:
  - Thiết kế mobile-first; hỗ trợ tối thiểu: mobile (>=360px), tablet (>=768px), desktop (>=1024px).
  - Không để vỡ layout, tràn chữ, hoặc nút quá nhỏ trên mobile.
- Nội dung & ngôn ngữ:
  - Microcopy ngắn, rõ, theo đúng ngữ cảnh hành động.
  - Thống nhất thuật ngữ (ví dụ: luôn dùng cùng một từ cho cùng một chức năng).
- Hiệu năng cảm nhận:
  - Ưu tiên hiển thị nội dung quan trọng trước (progressive rendering).
  - Tránh animation nặng; animation phải phục vụ ngữ cảnh, thời lượng hợp lý (thường 150-300ms).
- Không triển khai UI khi thiếu:
  - Empty state
  - Error state
  - Hover/focus/disabled state
  - Responsive check ở mobile và desktop
