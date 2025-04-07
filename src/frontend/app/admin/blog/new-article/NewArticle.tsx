'use client';

import BlogArticleForm from '@/components/admin/blog/BlogArticleForm';

const NewArticle = () => {
  const handleSubmit = async (articleData: any) => {
    try {
      const response = await fetch('/api/articles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(articleData)
      });

      if (response.ok) {
        alert('Artículo creado correctamente');
      } else {
        const errorData = await response.json();
        alert(`Error al crear el artículo: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Error al crear el artículo. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Crear Nuevo Artículo</h1>
      <BlogArticleForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewArticle;
