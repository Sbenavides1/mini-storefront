'use client';

import { useEffect, useState } from 'react';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

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

}
