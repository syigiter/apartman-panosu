import { Header } from "@/components/Header";
import { InteractiveBoard } from "@/components/InteractiveBoard";
import { categories } from "@/lib/mock-data";
import { getPosts } from "@/lib/posts";
import { hasSupabaseEnv } from "@/lib/supabase";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen overflow-hidden">
      <Header />
      <InteractiveBoard posts={posts} categories={categories} missingEnv={!hasSupabaseEnv()} />
    </main>
  );
}
