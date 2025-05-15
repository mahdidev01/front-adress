'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Article {
  id: string;
  title: string;
  summary: string;
  image_url: string;
  url: string;
}

export default function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('https://booking.youradress.com/module/apirooms/articlesapi')
      .then(res => res.json())
      .then(data => {
        const latest = data.slice(0, 3);
        setArticles(latest);
        console.log(articles);
      });
  }, []);

  return (
    <section className="bg-muted/40 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Trouvez l'inspiration pour votre prochain voyage
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map(article => (
            <div key={article.id} className="relative h-[300px] rounded-xl overflow-hidden group shadow-lg">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover group-hover:brightness-75 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end text-white">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-xs mt-1 line-clamp-2">{article.summary}</p>
                <Button asChild variant="secondary" className="mt-3 w-fit text-white/100 hover:bg-[#e1c287] bg-white/20 border border-white/30 backdrop-blur-sm">
                  <Link href={`/articles/${article.id}-${article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}>Lire l’article</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
