import Head from "next/head";
import Layout from "../components/layout/Layout";
import axios from "axios";
import {BASE_URL} from "../constants/api"

export default function Index(props) {
  console.log(props);

 return (
  <Layout>
    <Head title="Next Intro"/>

    {props.games.map((game) => {
      return (
        <a key={game.slug} href={`game/${game.slug}`}>
         {game.name}
        </a>
       );
    })}
  </Layout>
 );
}

export async function getStaticProps() {
  let games = [];

  try {
    const response = await axios.get(BASE_URL);
    console.log(response.data);
    games = response.data.results;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      games: games,
    },
  };
}