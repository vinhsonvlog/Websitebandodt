# --- GIAI ĐOẠN 1: BUILD ---
FROM node:20-alpine AS builder
WORKDIR /app
# Copy file quản lý thư viện trước để tối ưu cache
COPY package*.json ./
RUN npm install
# Copy toàn bộ source code
COPY . .
# Build ra thư mục dist (nếu dùng Vite) hoặc build (nếu dùng CRA)
RUN npm run build

# --- GIAI ĐOẠN 2: RUN (Dùng Nginx) ---
FROM nginx:stable-alpine
# Copy code đã build từ giai đoạn 1 sang Nginx
COPY --from=builder /app/build /usr/share/nginx/html
# Mở port 80 cho FE
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]