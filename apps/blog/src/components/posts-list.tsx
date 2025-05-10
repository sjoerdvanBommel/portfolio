import { components } from '../posts/components';
import MyMarkdown from '../posts/how-i-built-this-site.mdx';

export const PostsList = () => {
  return <MyMarkdown components={components} />;
};
