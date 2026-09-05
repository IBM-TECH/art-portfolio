import { supabase } from "@/lib/supabase";

export default async function TestDatabase() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    return (
      <main className="min-h-screen p-10">
        <h1 className="text-2xl font-bold">
          Supabase connection failed
        </h1>

        <pre className="mt-4 whitespace-pre-wrap text-sm text-red-600">
          {error.message}
        </pre>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] p-10 text-[#171717]">
      <h1 className="text-3xl font-bold">
        Supabase connected
      </h1>

      <p className="mt-3 text-white/50">
        Categories returned from the database:
      </p>

      <div className="mt-8 space-y-2">
        {data?.map((category) => (
          <div
            key={category.id}
            className="rounded-xl border border-white/[0.06] bg-white px-4 py-3"
          >
            {category.name}
          </div>
        ))}
      </div>
    </main>
  );
}
