import React from 'react';
import { Helmet } from 'react-helmet';
import { DappMetaData } from 'types';
import { formatAssetUrl } from 'utils';

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
            href={`${formatAssetUrl(meta.tokenName, 'apple-icon-180x180.png')}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href={`${formatAssetUrl(
              meta.tokenName,
              'android-icon-192x192.png'
            )}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${formatAssetUrl(meta.tokenName, 'favicon-16x16.png')}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${formatAssetUrl(meta.tokenName, 'favicon-32x32.png')}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href={`${formatAssetUrl(meta.tokenName, 'favicon-96x96.png')}`}
          />
          <link
            rel="icon"
            href={`${formatAssetUrl(meta.tokenName, 'favicon.ico')}`}
          />

          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content={`${formatAssetUrl(
              meta.tokenName,
              ''
            )}${meta.tokenName.toLowerCase()}/ms-icon-144x144.png)`}
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
            content={`${
              formatAssetUrl(meta.tokenName, 'opengraph.jpg')
            }`}
          />
          <meta
            itemProp="image"
            content={`${
              formatAssetUrl(meta.tokenName, 'opengraph.jpg')
            }`}
          />
          <meta
            name="twitter:image"
            content={`${
              formatAssetUrl(meta.tokenName, 'opengraph.jpg')
            }`}
          /> */}

          <title>{meta.tokenName} Presale</title>
        </Helmet>
      )}
    </>
  );
};
