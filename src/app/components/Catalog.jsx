'use client';

import { useEffect, useState } from 'react';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const products = await fetch('/api/products'); 
    const data = await products.json();
    setProducts(data);
    setLoading(false);
  }, []); 

  return (
    <section className="mt-6 space-y-3">
      <StatusMessage loading={loading} error={error} isEmpty={!loading && !error && products.length===0} />
      {!loading && !error && (
        <p className="text-sm">Fetched {products.length} products ✅</p>
      )}
    </section>
  );
}
