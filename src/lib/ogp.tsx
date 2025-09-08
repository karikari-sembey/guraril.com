
import fs from 'fs'
import path from 'path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import type { FC } from 'react'

type ArticleOGPProps = {
    title: string
}
const iconBase64 = fs.readFileSync(path.resolve(process.cwd(), 'public/site_icon.png')).toString('base64')
const ArticleOGP: FC<ArticleOGPProps> = ({ title }) => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(to bottom, #EDA216, #99DD99)",
                padding: '20px',
            }}>
            <div
                style={{
                    margin: 'auto',
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#ddd",
                    color: 'black',
                    borderRadius: '25px',
                }}
            >
                <h1 style={{ fontSize: '5rem' }}>{title}</h1>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img src={"data:image/png;base64," + iconBase64} width={48} height={48} />
                    <p style={{ fontSize: '2rem' }}>@ぐらりぃるのもちもち処</p>
                </div>
            </div>
        </div>
    )
}

const fontData = await fetch("https://github.com/notofonts/noto-cjk/raw/refs/heads/main/Sans/OTF/Japanese/NotoSansCJKjp-Bold.otf").then(async (a) => { return (await a.bytes()).buffer })

export const generateOgpImage = async (title: string) => {
    const svg = await satori(
        // <ArticleOGP title={title} iconBase64={iconBase64} />,
        <ArticleOGP title={title} />,
        {
            width: 1200,
            height: 630,
            fonts: [{
                name: 'Noto Sans JP',
                data: fontData,
                style: 'normal',
                weight: 700,
            }],
        }
    )

    const resvg = new Resvg(svg, {
        fitTo: {
            mode: 'width',
            value: 1200,
        },
    })
    const image = resvg.render()

    return image.asPng()
}
