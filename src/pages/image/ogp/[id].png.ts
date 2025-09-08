import type { APIRoute } from 'astro'
import { generateOgpImage } from '../../../lib/ogp'
import { getCollection, getEntry } from 'astro:content'

export const GET: APIRoute = async ({ params }) => {
    const articleId = params.id

    if (!articleId) {
        return new Response(null, {
            status: 404,
            statusText: 'Not Found',
        })
    }

    const article = await getEntry("blog", articleId)
    const png = await generateOgpImage(article.data.title)

    return new Response(new Uint8Array(png).buffer, {
        headers: {
            'Content-Type': 'image/png',
        },
    })
}

export const getStaticPaths = async () => {
    const articles = await getCollection("blog")
    return articles.map((article) => ({
        params: {
            id: article.id,
        },
    }))
}
