/**
 * Página de gestión de artículos del blog (/admin/blog)
 *
 * Lista todos los artículos existentes con opciones para eliminar o crear nuevos.
 * Muestra tarjetas visuales (BlogArticleCard) y maneja estados de carga y vacío.
 * El diseño y metadatos SEO son gestionados por /app/admin/layout.tsx.
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogArticleCard from "@/components/admin/ui/blog/BlogArticleCard";
import Button from "@/components/ui/Button";
import { getArticles, deleteArticleBySlug } from "@/lib/blogService";
import { Article } from "@/types";

const BlogAdminPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticles({ limit: 999 });
        setArticles(response.articles);
      } catch (err) {
        console.error("Error cargando artículos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (slug: string) => {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este artículo?");
    if (!confirmDelete) return;

    try {
      await deleteArticleBySlug(slug);
      setArticles((prev) => prev.filter((article) => article.slug !== slug));
    } catch (err) {
      console.error("Error eliminando artículo:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#1A1341]">Gestión de Blog</h1>

        <div className="flex flex-wrap gap-4">
          <Link href="/admin">
            <Button variant="outline" size="md">
              ← Volver al panel
            </Button>
          </Link>

          <Link href="/admin/blog/new-article">
            <Button variant="primary" size="md">
              Crear Nuevo Artículo
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-[#1A1341]">Cargando artículos...</p>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 bg-[#F1FFEF] rounded-lg border border-[#6290C3]">
          <p className="text-[#1A1341] text-xl mb-4">Aún no has creado ningún artículo</p>
          <Link href="/admin/blog/new-article">
            <Button variant="primary">Crear Primer Artículo</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <BlogArticleCard
              key={article.slug}
              title={article.title}
              slug={article.slug}
              image={article.image}
              excerpt={article.excerpt}
              created_at={article.date}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogAdminPage;
