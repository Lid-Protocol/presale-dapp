export interface DappMetaData {
  tokenName: string;
  tokenSymbol: string;
  tokenOwnerWebsite?: string;
  siteUrl?: string;
  totalPresale: string;
  basisPoint: string;
  accountCap: string;
  favicon: string;
  project: string;
  version: string;
  addresses: {
    presale: string;
    redeemer: string;
    timer: string;
    token: string;
    access: string;
    staking: string;
  };
}
