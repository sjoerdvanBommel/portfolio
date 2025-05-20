import { useEffect, useState } from 'react';
import { components } from '../components/mdx/components';

interface MDXModule {
  default: React.ComponentType<{ components: typeof components }>;
}

export const MdxComponent = ({ slug }: { slug: string }) => {
  const [Post, setPost] = useState<React.ComponentType<{ components: typeof components }> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    import(`./${slug}/blog.mdx`)
      .then((module: MDXModule) => {
        setPost(() => module.default);
      })
      .catch((err) => {
        console.error('Failed to load MDX:', err);
        setError('Failed to load content');
      });
  }, [slug]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Post) {
    return <div>Loading...</div>;
  }

  return <Post components={components} />;
};
