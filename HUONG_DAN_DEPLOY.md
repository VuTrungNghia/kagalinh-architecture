# Deploy tự động với GitHub Actions

Mỗi lần bạn **push** hoặc **merge vào nhánh `main`**, workflow `.github/workflows/deploy.yml` sẽ:

1. Cài dependencies (`npm ci`)
2. Build (`npm run build`)
3. Deploy lên **GitHub Pages**

---

## Bước 1: Cài Git (nếu chưa có)

Tải: https://git-scm.com/download/win  
Sau khi cài, mở terminal mới và chạy `git --version`.

---

## Bước 2: Tạo repository trên GitHub

1. Đăng nhập https://github.com
2. **+** → **New repository**
3. Tên gợi ý: `kagalinh-architecture` (hoặc tên khác — workflow tự lấy tên repo)
4. Chọn **Public**
5. **Không** tick "Add a README" (để tránh conflict)
6. **Create repository**

---

## Bước 3: Bật GitHub Pages (Actions)

1. Vào repo → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. Lưu (không cần chọn branch thủ công)

---

## Bước 4: Đẩy code lên GitHub

Trong PowerShell:

```powershell
cd C:\Users\vutru\Projects\hero-gallery-app

git init
git add .
git commit -m "Initial commit: Kagalinh Architecture site"
git branch -M main
git remote add origin https://github.com/TEN-GITHUB-CUA-BAN/kagalinh-architecture.git
git push -u origin main
```

Thay `TEN-GITHUB-CUA-BAN` bằng username GitHub của bạn.

Lần đầu push có thể hỏi đăng nhập — dùng **Personal Access Token** thay mật khẩu nếu GitHub yêu cầu.

---

## Bước 5: Kiểm tra deploy

1. Repo → tab **Actions** → workflow **Build and Deploy to GitHub Pages**
2. Chờ dấu tick xanh (2–4 phút)
3. **Settings → Pages** xem URL, dạng:

   `https://TEN-GITHUB-CUA-BAN.github.io/kagalinh-architecture/`

---

## Cập nhật site sau này

```powershell
cd C:\Users\vutru\Projects\hero-gallery-app
git add .
git commit -m "Mô tả thay đổi"
git push origin main
```

Push lên `main` → tự build & deploy lại.

---

## Lỗi thường gặp

| Lỗi | Cách xử lý |
|-----|-----------|
| Actions không chạy | Kiểm tra đã push đúng nhánh `main` |
| Trang trắng / 404 khi refresh | Đã cấu hình `base` trong Vite + `BrowserRouter basename` |
| Build fail trên Actions | Xem log tab Actions; chạy `npm run build` trên máy trước |
| Ảnh/logo không hiện | File phải nằm trong `public/` |

---

## Domain riêng (tùy chọn)

**Settings → Pages → Custom domain** → thêm domain → cấu hình DNS theo hướng dẫn GitHub.
