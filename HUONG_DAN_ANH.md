# Tối ưu ảnh dự án

## Phân tích thư mục `public/images`

| Chỉ số | Giá trị |
|--------|---------|
| Số dự án (folder) | **12** |
| Tổng ảnh JPG | **~62** |
| Dung lượng gốc | **~55 MB** |
| Trung bình / ảnh | **~0,9 MB** |
| Ảnh nặng nhất | ~2 MB (`2009/WC 1.jpg`) |

### Cấu trúc

```
public/images/
├── 2009/          (5 ảnh)
├── 2023/          (3)
├── 2207/          (8)
├── 5A QUANG TRUNG/
├── 67 TRICH SAI/20250426/  (12 ảnh — nhiều nhất)
├── BERRIVER/
├── CX2-55/
├── D 2512/
├── NGD/
├── NGUYEN DU/
├── PB/
├── PHUNG CK/
└── VTD2/
```

Mỗi **folder cấp 1** = 1 project trên website. Ảnh trong folder (kể cả subfolder) = slide slideshow.

---

## Giải pháp đã triển khai

### 1. Build script (`npm run optimize-images`)

- Đọc `public/images/`
- Tạo biến thể **480 / 960 / 1920 px** dạng **WebP + JPEG**
- Lưu tại `public/images-opt/` (không commit — tạo lúc build)
- Sinh `src/data/projects.generated.ts` (metadata + URL)
- **Blur placeholder** (LQIP) nhúng base64 — hiển thị mờ trước khi ảnh tải xong

### 2. React `<picture>` + `srcset`

Component `OptimizedPicture`:

- Trình duyệt chọn **đúng kích thước** (mobile không tải 1920px)
- Ưu tiên **WebP**, fallback JPEG
- `loading="lazy"` / `fetchpriority="high"` cho slide đang xem
- **Preload** slide kế tiếp trong slideshow

### 3. SEO

- `alt` mô tả từ tên dự án + tên file
- `Seo` component: title, description, Open Graph
- `ProjectJsonLd`: schema.org trên trang chi tiết
- `width` / `height` giảm layout shift (CLS)

### 4. Metadata tùy chỉnh

Sửa tiêu đề / mô tả từng dự án trong:

`src/data/projects.meta.json`

---

## Quy trình làm việc

```powershell
# Thêm ảnh mới vào public/images/TEN-DU-AN/
npm run optimize-images   # chỉ tối ưu + sinh lại data
npm run dev

# Build production (tự chạy optimize-images)
npm run build
```

**Lần đầu** sau khi thêm nhiều ảnh: `optimize-images` có thể mất 2–5 phút.

---

## Khuyến nghị thêm (tùy chọn)

1. **Không commit** ảnh gốc quá nặng lên Git — dùng Git LFS hoặc lưu gốc ngoài repo, chỉ deploy `images-opt` qua CI.
2. Ảnh gốc nên **≤ 4000px** cạnh dài; script đã resize xuống 1920px cho web.
3. Đặt tên file không dấu, không khoảng trắng (vd. `tang-4-01.jpg`) để URL sạch hơn.
4. Xóa `Thumbs.db` (Windows) — đã ignore trong `.gitignore`.
