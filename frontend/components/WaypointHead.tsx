import Head from "next/head";

export default function WaypointHead({siteTitle}: any) {
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta
        name="description"
        content="Design a race course with waypoints for your next regada."
      />
      <meta name="og:title" content={siteTitle} />
    </Head>
  )
}