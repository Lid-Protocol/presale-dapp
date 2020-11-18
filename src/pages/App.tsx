import React from 'react';
import MainApp from 'components/MainApp';
import VersionRedirect from './VersionRedirect';
import { DappMetaData } from 'types';

interface IProps {
  address: string;
  onConnect: () => void;
  web3: any;
  meta: DappMetaData;
}

const App: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      {props.meta.tokenName ? (
        props.meta.version == "1.0.0" ? (
          <VersionRedirect {...props} />
        ) : (
          <MainApp {...props} />
        )
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default App;
