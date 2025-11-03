import Catalog from './components/Catalog';

export default function Page() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mini-Storefront</h1>
      <catalog />
    </main>
  );
}