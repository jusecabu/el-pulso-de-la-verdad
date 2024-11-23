import { useState, useEffect } from 'react';
import ArticleForm from './ArticleForm';
import ArticleList from './ArticleList';

export default function NewsApp() {
  const [articles, setArticles] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('articles');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);

  const handleSubmit = (articleData: { title: string; content: string; author: string }) => {
    const newArticle = {
      id: crypto.randomUUID(),
      ...articleData,
      likes: 0,
      dislikes: 0,
      timestamp: Date.now(),
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const handleVote = (id: string, voteType: 'like' | 'dislike') => {
    setArticles(prev => prev.map(article => {
      if (article.id === id) {
        return {
          ...article,
          [voteType === 'like' ? 'likes' : 'dislikes']: article[voteType === 'like' ? 'likes' : 'dislikes'] + 1
        };
      }
      return article;
    }));
  };

  return (
    <div>
      <ArticleForm onSubmit={handleSubmit} />
      <ArticleList articles={articles} onVote={handleVote} />
    </div>
  );
}