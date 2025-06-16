import { getRecentPosts } from '@/lib/mdx/get-recent-posts'

export default async function Posts() {
  const files = await getRecentPosts()
  return (
    <div>
      {files.map((file) => (
        <a key={file.slug} href={`/posts/${file.slug}`}>
          {file.slug}
        </a>
      ))}
    </div>
  )
}
