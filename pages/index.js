import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Algo Visualizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* 
      <Visualizer /> */}

      <AlgoColumn>
        <Link href="/sorting">
          <div className="algo-block">
            <h1>Sorting Algorithms</h1>

            <Image
              src={"/images/sorting.png"}
              height={10}
              width={10}
              layout="responsive"
              alt="bubble-sort-image"
            />

            <span>
              Visualizes 7 sorting algorithms with expandable variability in how
              many bars are rendered, and the speed of the visualization
            </span>
          </div>
        </Link>

        <Link href="/fibonacci">
          <div className="algo-block">
            <h1>Fibonacci Sequence</h1>

            <Image
              src={"/images/fibonacci.png"}
              height={10}
              width={10}
              layout="responsive"
              alt="bubble-sort-image"
            />

            <span>
              Visualizes the fibonacci sequence starting from zero, and
              expanding upon user selection. Each value = the bar's pixel length
            </span>
          </div>
        </Link>
      </AlgoColumn>
    </div>
  );
}

const AlgoColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3rem 0;
  gap: 2rem;

  .algo-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    max-width: 30rem;
    margin: auto;
    border: 2px solid black;
    border-radius: 12px;
    padding: 1rem;
    gap: 0.5rem;
    color: black;
    box-shadow: 2px 4px 8px lightgray;

    :hover {
      color: blue;
    }
  }
`;
