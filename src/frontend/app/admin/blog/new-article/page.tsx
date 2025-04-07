import { Metadata } from 'next';
import NewArticle from './NewArticle';

export const metadata: Metadata = {
  title: 'Nuevo Artículo | Mi Blog',
  description: 'Crea un nuevo artículo para el blog'
};

export default function Page() {
  return <NewArticle />;
}
