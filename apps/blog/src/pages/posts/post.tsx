import { useParams } from 'react-router';
import { MdxComponent } from '../../posts/mdx-component';

export default function Post() {
  const { slug } = useParams();

  if (!slug) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto font-display">
      <MdxComponent slug={slug} />
    </div>
  );
}
