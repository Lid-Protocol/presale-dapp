import React from 'react';
import { Helmet } from 'react-helmet';

import ThemeWrapper from 'containers/ThemeWrapper';
import Web3Wrapper from 'containers/Web3Wrapper';
import MainApp from 'components/MainApp';

import { tokenName, siteUrl } from './config';

const App: React.FC = () => {
  const importAll = (r: __WebpackModuleApi.RequireContext) => {
    let images: any = {};
    r.keys().map((item) => (images[item.replace('./', '')] = r(item)));
    return images;
  };

  const images = importAll(
    require.context('./assets/images/cxn', false, /\.(png|jpe?g|svg|ico)$/)
  );

  console.log(images);
  console.log(tokenName);

  return (
    <>
      <Helmet>
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={require(`assets/images/${tokenName.toLocaleLowerCase()}/apple-icon-180x180.png`)}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={require(`assets/images/${tokenName.toLocaleLowerCase()}/android-icon-192x192.png`)}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={require(`assets/images/${tokenName.toLocaleLowerCase()}/favicon-16x16.png`)}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={require(`assets/images/${tokenName.toLocaleLowerCase()}/favicon-32x32.png`)}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href={require(`assets/images/${tokenName.toLocaleLowerCase()}/favicon-96x96.png`)}
        /> */}
        {/* <link
          rel="icon"
          href={require(`assets/images/${tokenName.toLocaleLowerCase()}/favicon.ico`)}
        /> */}
        <link rel="icon" href={images['favicon.ico']} />

        <meta name="msapplication-TileColor" content="#ffffff" />
        {/* <meta
          name="msapplication-TileImage"
          content={require(`assets/images/${tokenName.toLocaleLowerCase()}/ms-icon-144x144.png`)}
        /> */}

        <meta
          name="description"
          content={`Deposit $ETH and earn $${tokenName} in this Lid Certified Presale.`}
        />
        {/* <meta
          itemProp="image"
          content={require(`assets/images/${tokenName.toLocaleLowerCase()}/opengraph.jpg`)}
        /> */}

        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${tokenName} Presale`} />
        <meta
          property="og:description"
          content={`Deposit $ETH and earn $${tokenName} in this Lid Certified Presale.`}
        />
        {/* <meta
          property="og:image"
          content={require(`assets/images/${tokenName.toLocaleLowerCase()}/opengraph.jpg`)}
        /> */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${tokenName} Presale`} />
        <meta
          name="twitter:description"
          content={`Deposit $ETH and earn $${tokenName} in this Lid Certified Presale.`}
        />
        {/* <meta
          name="twitter:image"
          content={require(`assets/images/${tokenName.toLocaleLowerCase()}/opengraph.jpg`)}
        /> */}

        <title>{tokenName} Presale</title>
      </Helmet>
      <ThemeWrapper>
        <Web3Wrapper>
          {(address, web3, onConnect) => (
            <MainApp address={address} web3={web3} onConnect={onConnect} />
          )}
        </Web3Wrapper>
      </ThemeWrapper>
    </>
  );
};

export default App;
