import React from 'react';
import MainApp from 'components/MainApp';
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
        <>
          <MainApp {...props} />
        </>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default App;
