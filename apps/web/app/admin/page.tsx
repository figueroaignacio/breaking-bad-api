'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [regions, setRegions] = useState<
    {
      id: number;
      slug: string;
      translations: { languageCode: string; name: string }[];
    }[]
  >([]);
  const [categories, setCategories] = useState<
    {
      id: number;
      slug: string;
      translations: { languageCode: string; name: string }[];
    }[]
  >([]);
  const [form, setForm] = useState({
    slug: '',
    regionId: '',
    categorySlug: '',
    translations: [
      { languageCode: 'es', name: '', description: '' },
      { languageCode: 'en', name: '', description: '' },
    ],
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/regions?lang=es`)
      .then((res) => res.json())
      .then(setRegions)
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories?lang=es`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/legends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.NEXT_PUBLIC_ADMIN_TOKEN!,
      },
      body: JSON.stringify(form),
    });

    alert('Leyenda creada correctamente ✅');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-16 text-neutral-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-lg"
      >
        <h1 className="mb-8 text-center text-2xl font-semibold">Agregar nueva leyenda</h1>

        <div>
          <label className="mb-2 block text-sm text-neutral-400">Slug</label>
          <input
            placeholder="la-llorona"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full rounded-lg bg-neutral-800 px-4 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-400">Región</label>
          <select
            value={form.regionId}
            onChange={(e) => setForm({ ...form, regionId: e.target.value })}
            className="w-full rounded-lg bg-neutral-800 px-4 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Seleccioná una región
            </option>
            {regions.map((r) => (
              <option key={r.id} value={r.slug}>
                {r.translations[0]?.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-400">Categoría</label>
          <select
            value={form.categorySlug}
            onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
            className="w-full rounded-lg bg-neutral-800 px-4 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Seleccioná una categoría
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.translations[0]?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-8">
          {form.translations.map((t, i) => (
            <div
              key={i}
              className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900/70 p-6"
            >
              <h4 className="text-lg font-medium uppercase text-indigo-400">{t.languageCode}</h4>

              <div>
                <label className="mb-2 block text-sm text-neutral-400">Nombre</label>
                <input
                  placeholder="Nombre de la leyenda"
                  value={t.name}
                  onChange={(e) => {
                    const copy = [...form.translations];
                    copy[i].name = e.target.value;
                    setForm({ ...form, translations: copy });
                  }}
                  className="w-full rounded-lg bg-neutral-800 px-4 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-neutral-400">Descripción</label>
                <textarea
                  placeholder="Descripción de la leyenda"
                  value={t.description}
                  onChange={(e) => {
                    const copy = [...form.translations];
                    copy[i].description = e.target.value;
                    setForm({ ...form, translations: copy });
                  }}
                  className="min-h-[100px] w-full resize-none rounded-lg bg-neutral-800 px-4 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-all duration-150 hover:bg-indigo-500"
        >
          Guardar leyenda
        </button>
      </form>
    </div>
  );
}
