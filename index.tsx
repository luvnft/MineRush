import Head from 'next/head';
import GameBoard from '../components/GameBoard';

export default function Home() {
  return (
    <div>
      <Head>
        <title>MineRush - Online Mines Game</title>
        <meta name="description" content="Play the popular online Mines game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <GameBoard />
      </main>
    </div>
  );
}
