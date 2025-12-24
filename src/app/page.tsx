"use client"

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { PostService } from "@/services/post.service";
import { supabase } from "@/supabase-client";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  urlImage: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  fullContent: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const supabasePosts = await PostService.getAllPosts();
        const formattedPosts = supabasePosts.map(PostService.formatPostForApp);
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Erro ao carregar posts: ", error);
        setPosts([]);
      } finally {
        setIsLoading(false); 
      }
    }

    loadPosts();
  }, []);
  
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-3">
              Tech Blog
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Insights and tutorials for modern web development
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-900 p-0"
              >
                <div className="md:flex h-full">
                  <div className="md:w-1/3 relative overflow-hidden">
                    <Image
                      src={post.urlImage}
                      alt={post.title}
                      width={400}
                      height={280}
                      className="w-full h-48 md:h-full min-h-[280px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardContent className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          <span>Dez 24, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>5 min read</span>
                        </div>
                      </div>

                      <CardTitle className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {post.title}
                      </CardTitle>

                      <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-base">
                        {post.content}
                      </CardDescription>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-900/50">
                        Development
                      </Badge>
                      <Link href={`/post/${post.id}`}>
                        <button className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors group">
                          Read more
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
