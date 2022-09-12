import Head from "next/head";
import Layout from "../components/template/Layout";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Template Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Página Inicial" subtitle="Estamos construindo um template admin!">
        <h3>Conteúdo!!!</h3>
      </Layout>
    </div>
  )
};
