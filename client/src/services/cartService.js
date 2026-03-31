const MOCK_CART = {
  items: [
    {
      id: 'item-1',
      name: 'Ten san pham',
      category: 'Danh muc',
      price: 0,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/78x78?text=SP'
    },
    {
      id: 'item-2',
      name: 'Ten san pham',
      category: 'Danh muc',
      price: 0,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/78x78?text=SP'
    }
  ],
  shippingFee: 0,
  additionalFee: 0
};

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export async function getCart() {
  await delay(450);
  return {
    success: true,
    data: MOCK_CART
  };
}
