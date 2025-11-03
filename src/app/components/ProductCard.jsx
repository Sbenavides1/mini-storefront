'use client';

export default function ProductCard({ product, onAdd }) {
  const disabled = product.stock === 0;
  console.log('[CARD] render', product.id, product.name, { stock: product.stock });

  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="font-bold mt-1">${product.price.toFixed(2)}</p>
      <p className={`text-sm mt-1 ${disabled ? 'text-red-600' : 'text-gray-600'}`}>
        {disabled ? 'Out of stock' : `In stock: ${product.stock}`}
      </p>
      <button
        onClick={() => { console.log('[CARD] add click', product.id); onAdd(); }}
        disabled={disabled}
        className="mt-3 w-full rounded-lg border px-3 py-2 disabled:opacity-40"
      >
        Add to Cart
      </button>
    </div>
  );
}
