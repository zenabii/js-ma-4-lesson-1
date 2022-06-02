import Head from "../../components/layout/Head";
import Layout from "../../components/layout/Layout";
import Image from "next/image"
import axios from "axios";
import { BASE_URL } from "../../constants/api";

export default function Game({ game }) {
    return (
        <Layout>
            <Head title={game.name} />
            <h1>{game.name}</h1>
            <Image src={game.image} width="200" height="200" alt="gaming" />
        </Layout>
    );
}

export async function getStaticPaths() {
        let paths = [];
    
    try {
        const response = await axios.get(BASE_URL);
        console.log(response.data);
        const games = response.data.results;

        paths = games.map((game) => ({
            params: { slug: game.slug},
        }));

        console.log(paths);

    } catch (error) {
        console.log(error);
    }
    return { paths: paths, fallback: false};
}

export async function getStaticProps({ params }) {
    const url = `${BASE_URL}/${params.slug}`;

    let game = null;

    try {
        const response = await axios.get(url);

        game = response.data;
    } catch (error) {
        console.log(error);
    }

    return {
        props: { game: game},
    };
}