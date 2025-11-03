'use client';

export default function CartSummary({ cart, products, onReset, onDecrement }) {
  const items = Object.entries(cart);
  const count = items.reduce((sum, [, qty]) => sum + qty, 0);

  const total = items.reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === id);
    return product ? sum + product.price * qty : sum;
  }, 0);

  console.log('[CART SUMMARY] render', { count, total });

  if (count === 0)
    return (
      <div className="border rounded-xl p-4 text-sm text-gray-400">
        🛒 Your cart is empty.
      </div>
    );

  return (
    <div className="border rounded-xl p-4 space-y-2 bg-gray-900/40">
      <h2 className="font-semibold text-lg">Cart Summary</h2>
      <ul className="text-sm space-y-1">
        {items.map(([id, qty]) => {
          const product = products.find(p => p.id === id);
          return (
            <li key={id} className="flex justify-between">
              <span>{product?.name}</span>
              <span>
                {qty} × ${product?.price.toFixed(2)}{' '}
                <button
                  onClick={() => onDecrement(id)}
                  className="ml-2 text-xs text-red-400 hover:underline"
                >
                  – remove
                </button>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="font-medium text-right">
        Total: <span className="text-green-400">${total.toFixed(2)}</span>
      </p>
      <button
        onClick={onReset}
        className="w-full border border-gray-500 rounded-lg py-1 mt-2 hover:bg-gray-700 transition"
      >
        Reset Cart
      </button>
    </div>
  );
}
  // Please have mercy on my horriible/ non existent css style beacuse my brain capacity to make this look cute was exhausted maybe 3 hours ago...

