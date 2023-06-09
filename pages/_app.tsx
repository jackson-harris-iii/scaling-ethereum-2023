import React from 'react';
import Head from 'next/head';
import '../assets/css/global.css';
import '../assets/css/countdown.css';
import '../assets/css/flip-countdown.scss';
import '../assets/css/slide-countdown.scss';
import { Web3Modal } from '@web3modal/react';
import {
  EthereumClient,
  w3mProvider,
  w3mConnectors,
} from '@web3modal/ethereum';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  polygonZkEvmTestnet,
  optimismGoerli,
  optimism,
  scrollTestnet,
} from 'wagmi/chains'; //scrollTestnet was not found???
import { PolygonZkevmTestnet } from '@thirdweb-dev/chains';
import { ThirdwebProvider } from '@thirdweb-dev/react';

function MyApp({ Component, pageProps }) {
  const chains = [
    mainnet,
    polygon,
    polygonZkEvmTestnet,
    optimismGoerli,
    optimism,
    scrollTestnet,
  ];

  // Wagmi client
  const { provider } = configureChains(chains, [
    w3mProvider({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      version: 1,
      chains,
    }),
    provider,
  });
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          content="Hope – Health &amp; Medical React JS Template"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
          integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script
          defer
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"
          integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="
        ></script>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossOrigin="anonymous"
        ></script>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <ThirdwebProvider
        activeChain={{
          name: 'Polygon zkEVM Testnet',
          //@ts-ignore
          title: 'Polygon zkEVM Testnet',
          chain: 'Polygon',
          rpc: [
            'https://polygon-zkevm-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}',
            'https://rpc.public.zkevm-test.net',
          ],
          faucets: [],
          nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          infoURL: 'https://polygon.technology/solutions/polygon-zkevm/',
          shortName: 'testnet-zkEVM-mango',
          chainId: 1442,
          networkId: 1442,
          explorers: [
            {
              name: 'Polygon zkEVM explorer',
              url: 'https://explorer.public.zkevm-test.net',
              standard: 'EIP3091',
            },
          ],
          testnet: true,
          slug: 'polygon-zkevm-testnet',
        }}
      >
        <WagmiConfig client={wagmiClient}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ThirdwebProvider>
      <Web3Modal
        projectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default MyApp;
