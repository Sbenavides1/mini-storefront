'use client';

export default function PriceFilter({ minValue, maxValue, onMinChange, onMaxChange }) {
  return (
    <div className="border rounded-xl p-4">
      <label className="block text-sm font-medium mb-2">Price Range</label>
      <div className="flex gap-2">
        <input type="number" placeholder="Min" value={minValue}
               onChange={e => { console.log('[FILTER] min ->', e.target.value); onMinChange(e.target.value); }}
               className="w-full rounded-lg border px-3 py-2" />
        <input type="number" placeholder="Max" value={maxValue}
               onChange={e => { console.log('[FILTER] max ->', e.target.value); onMaxChange(e.target.value); }}
               className="w-full rounded-lg border px-3 py-2" />
      </div>
    </div>
  );
}
