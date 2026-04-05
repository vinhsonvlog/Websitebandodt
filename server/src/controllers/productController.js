// Giả lập mảng dữ liệu nếu bạn chưa kết nối Database thật
let products = [
    { id: 'SP001', name: 'iPhone 15 Pro Max', price: 29500000, quantity: 15 },
    { id: 'SP002', name: 'MacBook Air M2', price: 24990000, quantity: 0 }
];

exports.getAllProducts = (req, res) => {
    res.status(200).json(products);
};

exports.createProduct = (req, res) => {
    const newProduct = {
        id: `SP00${products.length + 1}`,
        ...req.body
    };
    products.push(newProduct); // Lưu vào mảng tạm
    
    console.log("Đã nhận sản phẩm mới từ Frontend:", newProduct);
    res.status(201).json({ message: "Thêm thành công!", data: newProduct });
};