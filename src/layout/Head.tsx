import React from 'react';
import { Helmet } from 'react-helmet';
import { DappMetaData } from 'types';

interface IProps {
  meta: DappMetaData;
}

export default ({ meta }: IProps) => {
  return (
    <>
      {meta.tokenName && (
        <Helmet>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={require(`assets/images/${meta.tokenName.toLowerCase()}/apple-icon-180x180.png`)}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href={require(`assets/images/${meta.tokenName.toLowerCase()}/android-icon-192x192.png`)}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={require(`assets/images/${meta.tokenName.toLowerCase()}/favicon-16x16.png`)}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={require(`assets/images/${meta.tokenName.toLowerCase()}/favicon-32x32.png`)}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href={require(`assets/images/${meta.tokenName.toLowerCase()}/favicon-96x96.png`)}
          />
          <link
            rel="icon"
            href={require(`assets/images/${meta.tokenName.toLowerCase()}/favicon.ico`)}
          />
          <link rel="icon" href={meta.favicon} />

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content={require(`assets/images/${meta.tokenName.toLowerCase()}/ms-icon-144x144.png`)}
          />

          <meta
            name="description"
            content={`Deposit $ETH and earn $${meta.tokenName} in this Lid Certified Presale.`}
          />

          <meta property="og:url" content={meta.siteUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${meta.tokenName} Presale`} />
          <meta
            property="og:description"
            content={`Deposit $ETH and earn $${meta.tokenName} in this Lid Certified Presale.`}
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${meta.tokenName} Presale`} />
          <meta
            name="twitter:description"
            content={`Deposit $ETH and earn $${meta.tokenName} in this Lid Certified Presale.`}
          />

          {/* <meta
            property="og:image"
            content={require(`assets/images/${meta.tokenName.toLowerCase()}/opengraph.jpg`)}
          />
          <meta
            itemProp="image"
            content={require(`assets/images/${meta.tokenName.toLowerCase()}/opengraph.jpg`)}
          />
          <meta
            name="twitter:image"
            content={require(`assets/images/${meta.tokenName.toLowerCase()}/opengraph.jpg`)}
          /> */}

          <title>{meta.tokenName} Presale</title>
        </Helmet>
      )}
    </>
  );
};
