// Importaciones necesarias
import { Metadata } from 'next';
import Link from 'next/link';
import BlogArticleCard from '@/components/admin/ui/blog/BlogArticleCard';
import Button from '@/components/ui/Button';
import AdminLayout from '@/components/admin/layout/AdminLayout';

// Metadata para SEO
export const metadata: Metadata = {
 title: "Gestión de Blog | Boost a Project",
 description: "Panel de administración para gestionar artículos del blog. Crea, edita y administra tu contenido.",
 robots: "noindex, nofollow", // Para páginas de admin
 openGraph: {
   title: "Gestión de Blog | Boost a Project",
   description: "Panel de administración para gestionar artículos del blog",
   type: "website"
 }
};

// Datos mockeados mientras implementamos (los reemplazaremos con datos reales)
const mockArticles = [
 {
   id: 1,
   title: "•	IA en el sector inmobiliario: Cómo está revolucionando las inversiones en 2025",
   excerpt: "Descubre las tendencias clave para el marketing digital en 2025...",
   slug: "marketing-digital-2025",
   image: "https://res.cloudinary.com/dfqaatcdy/image/upload/v1744023669/in_uvqwmi.webp",
   date: "2024-04-07"
 }
];

export default function BlogAdminPage() {
 return (
   <AdminLayout>
     <div className="container mx-auto px-4">
       <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-[#1A1341]">Gestión de Blog</h1>
         <Link href="/admin/blog/new-article">
           <Button variant="primary">
             Crear Nuevo Artículo
           </Button>
         </Link>
       </div>

       {mockArticles.length === 0 ? (
         <div className="text-center py-16 bg-[#F1FFEZ] rounded-lg">
           <p className="text-[#1A1341] text-xl mb-4">
             Aún no has creado ningún artículo
           </p>
           <Link href="/admin/blog/new-article">
             <Button variant="primary">
               Crear Primer Artículo
             </Button>
           </Link>
         </div>
       ) : (
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {mockArticles.map(article => (
             <BlogArticleCard 
               key={article.id}
               {...article}
             />
           ))}
         </div>
       )}
     </div>
   </AdminLayout>
 );
}