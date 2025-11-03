'use client';

import { useEffect, useState } from 'react';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    useEffect(() => {
    console.log('[DEBUG] starting fetch...');

    try {
      const products = await fetch('/api/products');
      console.log('[DEBUG] fetched response:', products);

      const data = await products.json();
      console.log('[DEBUG] parsed JSON:', data);

      setProducts(data);
      setLoading(false);
    } catch (e) {
      console.log('[DEBUG] error during fetch:', e);
      setError(e.message);
      setLoading(false);
    }

    console.log('[DEBUG] end of useEffect reached');
  }, []);

  return (
    <section className="mt-6 space-y-3">
      <StatusMessage
        loading={loading}
        error={error}
        isEmpty={!loading && !error && products.length === 0}
      />
      {!loading && !error && (
        <p className="text-sm">Fetched {products.length} products ✅</p>
      )}
    </section>
  );
}
}

