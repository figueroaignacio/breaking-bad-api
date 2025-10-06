'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [form, setForm] = useState({
    slug: '',
    regionId: '',
    translations: [
      { languageCode: 'es', name: '', description: '' },
      { languageCode: 'en', name: '', description: '' },
    ],
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/regions`)
      .then((res) => res.json())
      .then(setRegions)
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center py-16 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-neutral-900 rounded-2xl shadow-lg p-8 space-y-6 border border-neutral-800"
      >
        <h1 className="text-2xl font-semibold text-center mb-8">Agregar nueva leyenda</h1>

        <div>
          <label className="block text-sm mb-2 text-neutral-400">Slug</label>
          <input
            placeholder="la-llorona"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full rounded-lg bg-neutral-800 px-4 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Región */}
        <div>
          <label className="block text-sm mb-2 text-neutral-400">Región</label>
          <select
            value={form.regionId}
            onChange={(e) => setForm({ ...form, regionId: e.target.value })}
            className="w-full rounded-lg bg-neutral-800 px-4 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Seleccioná una región
            </option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Traducciones */}
        <div className="space-y-8">
          {form.translations.map((t, i) => (
            <div
              key={i}
              className="border border-neutral-800 rounded-xl p-6 bg-neutral-900/70 space-y-4"
            >
              <h4 className="font-medium text-lg text-indigo-400 uppercase">{t.languageCode}</h4>

              <div>
                <label className="block text-sm mb-2 text-neutral-400">Nombre</label>
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
                <label className="block text-sm mb-2 text-neutral-400">Descripción</label>
                <textarea
                  placeholder="Descripción de la leyenda"
                  value={t.description}
                  onChange={(e) => {
                    const copy = [...form.translations];
                    copy[i].description = e.target.value;
                    setForm({ ...form, translations: copy });
                  }}
                  className="w-full min-h-[100px] rounded-lg bg-neutral-800 px-4 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-all duration-150"
        >
          Guardar leyenda
        </button>
      </form>
    </div>
  );
}
