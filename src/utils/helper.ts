import Web3 from 'web3';
import { infuraIds } from '../config';

export const toBN = Web3.utils.toBN;
export const toWei = Web3.utils.toWei;
export const fromWei = Web3.utils.fromWei;
export const isAddress = Web3.utils.isAddress;

export const getRandomInfuraId = () => {
  return infuraIds[Math.floor(Math.random() * 1000) % infuraIds.length];
};

export function removeDecimal(decimalString: string) {
  if (!decimalString.includes('.')) {
    return decimalString;
  }
  return decimalString.substring(0, decimalString.indexOf('.'));
}

export function shortEther(wei: string) {
  if (wei === '') {
    return '';
  }

  const etherString = removeDecimal(fromWei(wei));

  if (toBN(etherString).lt(toBN('1'))) {
    return Number(Number(fromWei(wei)).toPrecision(4)).toString();
  }

  if (toBN(etherString).lt(toBN('1000'))) {
    return Number(fromWei(wei)).toPrecision(4).toString();
  }

  const etherBN = toBN(etherString);
  let resultInteger = '';
  let resultSuffix = '';
  let resultDecimal = 0;
  let resultDecimalStr = '';

  if (etherBN.div(toBN('1000000')).gt(toBN('0'))) {
    resultSuffix = 'M';
    resultInteger = etherBN.div(toBN('1000000')).toString();
    if (resultInteger.length < 3) {
      resultDecimal =
        etherBN.sub(toBN(resultInteger).mul(toBN('1000000'))).toNumber() /
        1000000;
    }
  } else if (etherBN.div(toBN('1000')).gt(toBN('0'))) {
    resultSuffix = 'K';
    resultInteger = etherBN.div(toBN('1000')).toString();
    if (resultInteger.length < 3) {
      resultDecimal =
        etherBN.sub(toBN(resultInteger).mul(toBN('1000'))).toNumber() / 1000;
    }
  } else {
    resultInteger = etherString;
  }

  if (resultDecimal === 0) {
    if (resultInteger.length === 1) {
      resultDecimalStr = '.00';
    } else if (resultInteger.length === 2) {
      resultDecimalStr = '.0';
    }
  } else if (resultDecimal) {
    if (resultInteger.length === 1) {
      resultDecimalStr = resultDecimal.toPrecision(2).substr(1);
    } else {
      resultDecimalStr = resultDecimal.toPrecision(1).substr(1);
    }
  }

  return resultInteger + resultDecimalStr + resultSuffix;
}

export const importAll = (r: __WebpackModuleApi.RequireContext) => {
  let images: any = {};
  r.keys().map((item) => (images[item.replace('./', '')] = r(item)));
  return images;
};

export const formatAssetUrl = (project: string, link: string) => {
  if (project) {
    return `${
      process.env.REACT_APP_FLEEK_BUCKET
    }${project.toLowerCase()}/${link}`;
  } else {
    return `lid/${link}`;
  }
};
