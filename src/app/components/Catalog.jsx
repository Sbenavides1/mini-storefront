'use client';

import { useEffect, useState, useMemo } from 'react';
import StatusMessage from './StatusMessage';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const addToCart = (id) => console.log('[CATALOG] addToCart', id);
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

const categories = ['All', ...new Set(products.map(p => p.category))];

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

  const filtered = useMemo(() => {
  const out = products.filter(p => {
    const byCat = category === 'All' || p.category === category;
    const byMin = minPrice === '' || p.price >= Number(minPrice);
    const byMax = maxPrice === '' || p.price <= Number(maxPrice);
    return byCat && byMin && byMax;
  });
  console.log('[FILTER] result count:', out.length, { category, minPrice, maxPrice });
  return out;
}, [products, category, minPrice, maxPrice]);

  console.log('[CATALOG] render summary', { count: products.length, loading, error });

  <div className="grid gap-4 sm:grid-cols-3">
  <CategoryFilter categories={categories} value={category} onChange={setCategory} />
  <PriceFilter minValue={minPrice} maxValue={maxPrice} onMinChange={setMinPrice} onMaxChange={setMaxPrice} />
  <div className="border rounded-xl p-4 text-sm">
    <div>Picked: {category}</div>
    <div>Min: {minPrice || '—'} | Max: {maxPrice || '—'}</div>
  </div>
</div>

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

