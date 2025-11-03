// Creating products and items
export async function GET() {
    const products = [
        { id: 'product1', name: 'Laptop', price: 1200, category: 'Electronics', stock: 5 },
        { id: 'product2', name: 'Smartphone', price: 800, category: 'Electronics', stock: 10 },
        { id: 'product3', name: 'Desk Chair', price: 150, category: 'Furniture', stock: 15 },
        { id: 'product4', name: 'Bookcase', price: 200, category: 'Furniture', stock: 7 },
        { id: 'product5', name: 'Running Shoes', price: 100, category: 'Apparel', stock: 20 },
        { id: 'product6', name: 'Jeans', price: 60, category: 'Apparel', stock: 25 },
        { id: 'product7', name: 'Blender', price: 90, category: 'Home Appliances', stock: 8 },
        { id: 'product8', name: 'Microwave', price: 150, category: 'Home Appliances', stock: 6 },
        { id: 'product9', name: 'Wristwatch', price: 250, category: 'Accessories', stock: 12 },
        { id: 'product10', name: 'Sunglasses', price: 120, category: 'Accessories', stock: 18 },
        { id: 'product11', name: 'Tablet', price: 400, category: 'Electronics', stock: 9 },
        { id: 'product12', name: 'Office Desk', price: 300, category: 'Furniture', stock: 4 },
    ];
   return Response.json(products);
}
