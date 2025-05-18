import { Link, StarRating } from '@sjoerdvanbommel-packages/react-components';
import { Brain, Code, Eye, FileType, Layers, Palette, Server } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'TSConfig: What is this file?',
    slug: 'tsconfig-what-is-this-file',
    description:
      'You have probably used Typescript before and are familiar with the tsconfig.json file. But do you really understand how it works and what impact all its options have?',
    views: 2,
    category: 'TypeScript',
    rating: 4.5,
  },
] as const;

type Category = 'TypeScript' | 'Development' | 'AI' | 'Design' | 'Backend' | 'CSS';

function getCategoryColor(category: Category): string {
  const colorMap: Record<Category, string> = {
    Development: '#3b82f6', // blue-500
    AI: '#a855f7', // purple-500
    Design: '#ec4899', // pink-500
    TypeScript: '#2563eb', // blue-600
    Backend: '#16a34a', // green-600
    CSS: '#f97316', // orange-500
  };

  return colorMap[category] || 'bg-gray-500';
}

function CategoryIcon({ category }: { category: Category }) {
  const iconProps = { className: 'h-5 w-5 mr-2', color: getCategoryColor(category) };

  switch (category) {
    case 'Development':
      return <Code {...iconProps} />;
    case 'AI':
      return <Brain {...iconProps} />;
    case 'Design':
      return <Palette {...iconProps} />;
    case 'TypeScript':
      return <FileType {...iconProps} />;
    case 'Backend':
      return <Server {...iconProps} />;
    case 'CSS':
      return <Layers {...iconProps} />;
    default:
      return <Code {...iconProps} />;
  }
}

export const PostsList = () => {
  return (
    <div className="space-y-10 max-w-2xl">
      {blogPosts.map((post, index) => (
        <section
          key={post.id}
          className={`py-6 relative ${
            index !== blogPosts.length - 1 ? 'border-b border-gray-800' : ''
          } hover:opacity-90 transition-opacity`}
        >
          {/* Rating positioned at top right */}
          <div className="absolute top-6 right-0">
            <StarRating rating={post.rating} />
          </div>

          <div className="mb-3">
            <div className="flex items-center">
              <Link className="flex items-center" href={`/blog/posts/${post.slug}`}>
                <CategoryIcon category={post.category} />

                <h2 className="text-xl font-semibold text-white mr-3">{post.title}</h2>
              </Link>

              <div className="flex items-center text-sm text-gray-500">
                <Eye className="h-4 w-4 mr-1" />
                {post.views.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 mb-4">{post.description}</p>

          {/* Read more button */}
          <Link href={`/blog/posts/${post.slug}`} className="text-gray-400 hover:text-white transition-colors">
            Read more
          </Link>
        </section>
      ))}
    </div>
  );
};
