import Link from "next/link"
import Head from "next/head"

// TODO: Review next js blog to add back relevant meta data
export const siteTitle = 'Waypoint'
export default function Landing({children, home}: any) {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Design a race course with waypoints for your next regada."
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <main>{children}</main>
    </div>
  )
}