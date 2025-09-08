import { glob } from "astro/loaders"
import { defineCollection } from "astro:content"
import { z } from "astro:schema"

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/contents/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.string(),
        updatedDate: z.string().optional()
    })
})

export const collections = { blog }
