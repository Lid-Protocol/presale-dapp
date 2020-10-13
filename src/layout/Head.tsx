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
      <Helmet>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${formatAssetUrl(meta.project, 'apple-icon-180x180.png')}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={`${formatAssetUrl(meta.project, 'android-icon-192x192.png')}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${formatAssetUrl(meta.project, 'favicon-16x16.png')}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${formatAssetUrl(meta.project, 'favicon-32x32.png')}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href={`${formatAssetUrl(meta.project, 'favicon-96x96.png')}`}
        />
        {meta.favicon ? (
          <link rel="icon" href={`${meta.favicon}`} />
        ) : (
          <link
            rel="icon"
            href={`${formatAssetUrl(meta.project, 'favicon.ico')}`}
          />
        )}

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content={`${formatAssetUrl(
            meta.project,
            ''
          )}${meta.project.toLowerCase()}/ms-icon-144x144.png)`}
        />

        <meta
          name="description"
          content={
            meta.tokenName
              ? `Deposit $ETH and earn $${meta.tokenName} in this Lid Certified Presale.`
              : 'The Liquidity Dividends Protocol uses new technology that provides solutions for depositing Liquidity into Uniswap. Certified LID Presales now LIVE! $LID'
          }
        />

        <meta property="og:url" content={meta.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${meta.tokenName} Presale`} />
        <meta
          property="og:description"
          content={
            meta.tokenName
              ? `Deposit $ETH and earn $${meta.tokenName} in this Lid Certified Presale.`
              : 'The Liquidity Dividends Protocol uses new technology that provides solutions for depositing Liquidity into Uniswap. Certified LID Presales now LIVE! $LID'
          }
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            meta.tokenName
              ? `${meta.tokenName} Presale`
              : 'LID Presale protocol'
          }
        />
        <meta
          name="twitter:description"
          content={
            meta.tokenName
              ? `Deposit $ETH and earn $${meta.tokenName} in this Lid Certified Presale.`
              : 'The Liquidity Dividends Protocol uses new technology that provides solutions for depositing Liquidity into Uniswap. Certified LID Presales now LIVE! $LID'
          }
        />

        <meta
          property="og:image"
          content={`${formatAssetUrl(meta.project, 'opengraph.jpg')}`}
        />
        <meta
          itemProp="image"
          content={`${formatAssetUrl(meta.project, 'opengraph.jpg')}`}
        />
        <meta
          name="twitter:image"
          content={`${formatAssetUrl(meta.project, 'opengraph.jpg')}`}
        />

        <title>
          {meta.tokenSymbol
            ? `${meta.tokenSymbol} Presale`
            : 'LID Certified Presale Protocol'}
        </title>
      </Helmet>
    </>
  );
};
