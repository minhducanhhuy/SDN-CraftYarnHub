# CLEAN CODE & CODE QUALITY RULES

Quy tắc viết code sạch, dễ đọc và dễ bảo vệ trước giảng viên:

1. **Đặt tên tường minh:**
   - Biến/Hàm bằng tiếng Anh rõ nghĩa (`getPatterns`, `createComment`, `isSubmitting`).
   - Tránh viết tắt tối nghĩa.

2. **Cấu trúc module rõ ràng:**
   - Backend: Tách biệt rõ `models/`, `lib/db.ts`, `app/api/...`.
   - Frontend: Tách biệt `components/`, `pages/`, `services/`, `types/`.

3. **Xử lý lỗi đầy đủ:**
   - Các thao tác gọi database / API luôn có `try...catch`.
   - Trả về status code và thông báo lỗi tiếng Việt hoặc tiếng Anh rõ ràng.
