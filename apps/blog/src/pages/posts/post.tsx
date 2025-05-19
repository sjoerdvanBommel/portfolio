import { useParams } from 'react-router';
import { MdxComponent } from '../../posts/mdx-component';

export default function Post() {
  const { slug } = useParams();

  if (!slug) {
    return null;
  }

  return <MdxComponent slug={slug} />;
}
