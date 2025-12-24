import { supabase } from "@/supabase-client";
import { Post } from "@/types/types";

export class PostService{
    static async getAllPosts(): Promise<Post[]>{
        const { data, error } = await supabase
        .from("posts")
        .select("*, usuarios:author (name)")
        .order("created_at", { ascending: false });

        if(error){
            console.error("Erro ao buscar posts:", error.message);
            throw error;
        }
        
        return data || []
    }

    static formatPostForApp(post: any) {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      urlImage: post.url_image,
      author: post.usuarios?.name || 'Autor desconhecido',
      publishedAt: new Date(post.published_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }),
      readTime: post.read_time,
      tags: post.tags,
      fullContent: post.full_content,
    };
  }
}
