'use client';

import { useEffect, useState, useMemo } from 'react';
import StatusMessage from './StatusMessage';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import CartSummary from './CartSummary';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = (id) => console.log('[CATALOG] addToCart', id);

  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [cart, setCart] = useState({});
  const decrementFromCart = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id]--;
      else delete updated[id];
      return updated;
    });
  };
  const resetCart = () => setCart({});

  const categories = ['All', ...new Set(products.map((p) => p.category))];

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
    const out = products.filter((p) => {
      const byCat = category === 'All' || p.category === category;
      const byMin = minPrice === '' || p.price >= Number(minPrice);
      const byMax = maxPrice === '' || p.price <= Number(maxPrice);
      return byCat && byMin && byMax;
    });
    console.log('[FILTER] result count:', out.length, { category, minPrice, maxPrice });
    return out;
  }, [products, category, minPrice, maxPrice]);

  console.log('[CATALOG] render summary', { count: products.length, loading, error });

  const ControlsPreview = (
    <div className="grid gap-4 sm:grid-cols-3">
      <CategoryFilter categories={categories} value={category} onChange={setCategory} />
      <PriceFilter
        minValue={minPrice}
        maxValue={maxPrice}
        onMinChange={setMinPrice}
        onMaxChange={setMaxPrice}
      />
      <div className="border rounded-xl p-4 text-sm">
        <div>Picked: {category}</div>
        <div>Min: {minPrice || '—'} | Max: {maxPrice || '—'}</div>
      </div>
    </div>
  );

  const ExtraCartSummary = (
    <CartSummary
      cart={cart}
      products={products}
      onReset={() => setCart({})}
      onDecrement={(id) => {
        setCart((prev) => {
          const updated = { ...prev };
          if (updated[id] > 1) updated[id]--;
          else delete updated[id];
          return updated;
        });
      }}
    />
  );

  return (
    <section className="mt-6 space-y-6">
      <StatusMessage
        loading={loading}
        error={error}
        isEmpty={!loading && !error && filtered.length === 0}
      />

      {!loading && !error && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <CategoryFilter
              categories={categories}
              value={category}
              onChange={setCategory}
            />
            <PriceFilter
              minValue={minPrice}
              maxValue={maxPrice}
              onMinChange={setMinPrice}
              onMaxChange={setMaxPrice}
            />
            <CartSummary
              cart={cart}
              products={products}
              onDecrement={decrementFromCart}
              onReset={resetCart}
            />
          </div>

          <ProductList products={filtered} onAdd={addToCart} />

          {ControlsPreview}
          {ExtraCartSummary}
        </>
      )}
    </section>
  );
}
