import Link from "next/link"
import Head from "next/head"

// TODO: Review next js blog to add back relevant meta data
export const siteTitle = 'Waypoint'
export default function Landing({children}: any) {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Design a race course with waypoints for your next regada."
        />
        <meta name="og:title" content={siteTitle} />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet"/>
      </Head>
      <main>{children}</main>
    </div>
  )
}