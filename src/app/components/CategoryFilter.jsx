'use client';

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <div className="border rounded-xl p-4">
      <label className="block text-sm font-medium mb-2">Category</label>
      <select
        value={value}
        onChange={(e) => { console.log('[FILTER] category ->', e.target.value); onChange(e.target.value); }}
        className="w-full rounded-lg border px-3 py-2"
      >
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}
