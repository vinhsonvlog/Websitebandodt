FROM node:20-alpine
WORKDIR /app
# Copy file quản lý thư viện
COPY package*.json ./
# Cài đặt thư viện (chỉ cài những cái cần để chạy - production)
RUN npm install --production
# Copy toàn bộ code backend
COPY . .
# Mở port (thay 5000 bằng port mà Express của bạn đang chạy)
EXPOSE 5000
# Chạy file bootstrap có app.listen để giữ tiến trình container hoạt động
CMD ["node", "src/index.js"]