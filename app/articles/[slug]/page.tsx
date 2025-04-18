import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Article {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  content?: string;
}

// ✅ Correction ici : plus d'interface Props, typage inline
export async function generateStaticParams() {
  const res = await fetch('https://booking.youradress.com/module/apirooms/articlesapi');
  const articles: Article[] = await res.json();

  return articles.map((a) => ({
    slug: `${a.id}-${a.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`,
  }));
}

// ✅ Correction ici : typage inline pour éviter erreur PageProps
export default async function ArticlePage({ params }: any) {
  const res = await fetch('https://booking.youradress.com/module/apirooms/articlesapi', {
    cache: 'no-store',});
  const articles: Article[] = await res.json();

  const id = params.slug.split('-')[0];
  const article = articles.find((a) => a.id === id);

  if (!article) return notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative w-screen h-[600px] overflow-hidden">
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent flex items-end px-8 pb-6">
          <div className="text-white max-w-5xl mx-auto w-full">
            <h1 className="text-4xl md:text-5xl font-bold">{article.title}</h1>
            <p className="text-sm text-white/80 mt-2">
              Publié le {format(new Date(), 'dd MMMM yyyy', { locale: fr })}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg">{article.summary}</p>
          <hr className="my-6" />
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <p>
              Contenu non disponible ici. Cliquez{' '}
              <a href={article.url} className="text-blue-500 underline">
                ici
              </a>{' '}
              pour voir l’article complet sur le site.
            </p>
          )}
        </article>
      </div>
    </div>
  );
}
