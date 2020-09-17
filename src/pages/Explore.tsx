import React from 'react';
import Hero from 'components/sections/Hero';
import { DappMetaData } from 'types';

interface IProps {
  address: string;
  onConnect: () => void;
  web3: any;
  meta: DappMetaData;
}
export default (props: IProps) => {
  return (
    <Hero
      title="LID Protocol Certified Presale"
      subtitle="Raising funds for your project can be a daunting task - with investor uncertainty a major factor, a solution was needed to change DEX presale landscape - that solution, is LID Certified Presales. LID Certified Presales take advantage of the presale process with the Initial Liquidty Offering (ILO) model. Offering a secure Initial Liquidity Offering (ILO) presale to your potential investors is the first major step you can take in improving your presale success"
    />
  );
};
