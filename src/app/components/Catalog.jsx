'use client';

import { useEffect, useState } from 'react';
import StatusMessage from './StatusMessage';
import ProductList from './ProductList';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const addToCart = (id) => console.log('[CATALOG] addToCart', id);



 useEffect(() => {
    console.log('[DEBUG] starting fetch...');
    (async () => {
      try {
        const res = await fetch('/api/products');
        console.log('[DEBUG] fetched response:', res);

        const data = await res.json();
        console.log('[DEBUG] parsed JSON:', data);

        setProducts(data);
      } catch (e) {
        console.error('[DEBUG] error during fetch:', e);
        setError(e?.message ?? String(e));
      } finally {
        setLoading(false);
      }
    })(); 
  }, []); 

  console.log('[CATALOG] render summary', { count: products.length, loading, error });

  return (
    <section className="mt-6 space-y-3">
      <StatusMessage
        loading={loading}
        error={error}
        isEmpty={!loading && !error && products.length === 0}
      />
      {!loading && !error && (
        <>
          <p className="text-sm">Step 4: fetched {products.length} products</p>
          <ProductList products={products} onAdd={addToCart} />
        </>
      )}
    </section>
  );
}
