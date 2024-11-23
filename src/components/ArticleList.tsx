import { useState, useEffect } from "react";

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  dislikes: number;
  timestamp: number;
}

interface ArticleListProps {
  articles: Article[];
  onVote: (id: string, voteType: "like" | "dislike") => void;
}

export default function ArticleList({ articles, onVote }: ArticleListProps) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto mt-8">
      {articles.map((article) => (
        <article key={article.id} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
          <p className="text-gray-600 mb-4">{article.content}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Por {article.author}</span>
            <span>{new Date(article.timestamp).toLocaleDateString()}</span>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => onVote(article.id, "like")}
              className="flex items-center gap-2 px-3 py-1 rounded-md bg-green-100 text-green-800 hover:bg-green-200"
            >
              👍 {article.likes}
            </button>
            <button
              onClick={() => onVote(article.id, "dislike")}
              className="flex items-center gap-2 px-3 py-1 rounded-md bg-red-100 text-red-800 hover:bg-red-200"
            >
              👎 {article.dislikes}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
