// /src/frontend/components/admin/blog/BlogArticleForm.tsx

'use client';

import React, { useState } from 'react';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/ui/ImageUpload';
import { createSlug } from '@/lib/utils/string-utils';

interface BlogArticleFormProps {
  onSubmit: (articleData: any) => void;
}

const BlogArticleForm: React.FC<BlogArticleFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (title.length < 10 || title.length > 80) {
      alert('El título debe tener entre 10 y 80 caracteres');
      return;
    }

    if (excerpt.length < 50 || excerpt.length > 200) {
      alert('El extracto debe tener entre 50 y 200 caracteres');
      return;
    }

    const articleData = {
      title,
      slug: createSlug(title),
      excerpt,
      content,
      image
    };

    onSubmit(articleData);
  };

  const handleImageUpload = (imageUrl: string) => {
    setImage(imageUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... */}

      <ImageUpload onImageUpload={handleImageUpload} />

      <Button type="submit" variant="primary">
        Crear Artículo
      </Button>
    </form>
  );
};

export default BlogArticleForm;