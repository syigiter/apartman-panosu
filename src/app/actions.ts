"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categories, type PostType } from "@/lib/mock-data";
import { createSupabaseServerClient } from "@/lib/supabase";

function getRequiredText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createPost(formData: FormData) {
  const type = getRequiredText(formData, "type") as PostType;
  const category = getRequiredText(formData, "category");
  const title = getRequiredText(formData, "title");
  const body = getRequiredText(formData, "body");

  if (!["ilan", "duvar-yazisi"].includes(type) || !categories.includes(category) || title.length < 3 || body.length < 10) redirect("/ilan-ver?error=invalid");

  const supabase = createSupabaseServerClient();
  if (!supabase) redirect("/ilan-ver?error=missing-env");

  const { data, error } = await supabase.from("posts").insert({ type, category, title, body, status: "published" }).select("id").single();
  if (error || !data) {
    console.error("post create failed", error);
    redirect("/ilan-ver?error=create-failed");
  }

  revalidatePath("/");
  redirect("/ilan/" + data.id);
}

export async function createReply(formData: FormData) {
  const postId = getRequiredText(formData, "post_id");
  const body = getRequiredText(formData, "body");
  if (!postId || body.length < 3) redirect("/ilan/" + postId + "?error=invalid-reply");

  const supabase = createSupabaseServerClient();
  if (!supabase) redirect("/ilan/" + postId + "?error=missing-env");

  const { error } = await supabase.from("replies").insert({ post_id: postId, body, visibility: "public" });
  if (error) {
    console.error("reply create failed", error);
    redirect("/ilan/" + postId + "?error=reply-failed");
  }

  revalidatePath("/");
  revalidatePath("/ilan/" + postId);
  redirect("/ilan/" + postId);
}
