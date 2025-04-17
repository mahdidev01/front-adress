import { notFound } from 'next/navigation';
import { allArticles } from '../../data/articles';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { PageProps } from 'next';
interface Props {
    params: {
      id: string;
    };
  }

  export function generateStaticParams() {
    return allArticles.map((a) => ({ id: a.id }));
  }
  

export default function ArticlePage({ params }: Props) {
  const article = allArticles.find((a) => a.id === params.id);

  if (!article) return notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Image Hero Full Width */}
      <div className="relative w-screen h-[600px] overflow-hidden">
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0  bg-gradient-to-b from-black/40 via-black/30 to-transparent flex items-end px-8 pb-6">
          <div className="text-white max-w-5xl mx-auto w-full">
            <h1 className="text-4xl md:text-5xl font-bold">{article.title}</h1>
            <p className="text-sm text-white/80 mt-2">
            Publié le {format(new Date(article.published_at), "dd MMMM yyyy", { locale: fr })}
            </p>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-5xl mx-auto px- py-12">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg">{article.summary}</p>
          <hr className="my-6" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod, magna ut porta placerat,
            risus sapien ultrices tellus, sed bibendum neque sapien ut metus.
          </p>
          <p>
            Vivamus et dapibus lacus. Cras commodo eros at sapien tincidunt, in congue leo viverra.
          </p>
          <p>
            Suspendisse potenti. Aenean finibus tortor et justo sagittis, sed viverra purus malesuada.
          </p>
        </article>
      </div>
    </div>
  );
}
