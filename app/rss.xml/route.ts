import { getAllPosts } from '@/lib/posts'

export async function GET() {
  const posts = getAllPosts()
  const baseUrl = 'https://blog-buluktaev.vercel.app'

  const items = posts
    .map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.pubDatetime).toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${post.slug}</guid>
    </item>`)
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Sanan</title>
    <link>${baseUrl}</link>
    <description>Блог о дизайне и AI-инструментах</description>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
