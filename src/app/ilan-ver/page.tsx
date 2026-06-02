import { CreatePostWorkshop } from "@/components/CreatePostWorkshop";
import { categories } from "@/lib/mock-data";
import type { PostType } from "@/lib/mock-data";
import { getPaperOption } from "@/lib/paper-options";
import { hasSupabaseEnv } from "@/lib/supabase";

type CreatePostSearchParams = {
  category?: string;
  error?: string;
  paper?: string;
  type?: string;
};

export default async function CreatePostPage({ searchParams }: { searchParams: Promise<CreatePostSearchParams> }) {
  const params = await searchParams;
  const selectedType: PostType = params.type === "duvar-yazisi" ? "duvar-yazisi" : "ilan";
  const selectedCategory = params.category && categories.includes(params.category) ? params.category : categories[0];
  const selectedPaper = getPaperOption(params.paper);

  return (
    <CreatePostWorkshop
      categories={categories}
      error={params.error}
      initialCategory={selectedCategory}
      initialPaper={selectedPaper.id}
      initialType={selectedType}
      missingEnv={!hasSupabaseEnv()}
    />
  );
}
