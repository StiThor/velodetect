export default function NyAnnonse() {
  const categories = [
    { name: "Landevei", link: "/ny-annonse/landevei" },
    { name: "Gravel", link: "#" },
    { name: "Triatlon", link: "#" },
    { name: "MTB", link: "#" },
    { name: "Deler", link: "#" },
    { name: "Utleie", link: "#" },
  ];

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Velg kategori for annonsen din</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={cat.link}
            className="rounded-lg border shadow hover:shadow-lg text-center py-10 text-xl font-semibold transition hover:bg-gray-50"
          >
            {cat.name}
          </a>
        ))}
      </div>
    </main>
  );
}
