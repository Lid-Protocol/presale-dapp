import React, {useState, useEffect} from 'react';
import Dexie from 'dexie';

var db = new Dexie("DappMetas");
var tokenData = "";

async function addTokenData(DappMeta) {
    await db.friends.add({
        tokenName: DappMeta.tokenName, 
        tokenSymbol: DappMeta.tokenSymbol,
        tokenOwnerWebsite: DappMeta.tokenOwnerWebsite,
        siteUrl: DappMeta.siteUrl,
        totalPresale: DappMeta.totalPresale,
        referralBP: DappMeta.referralBP,
        basisPoint: DappMeta.basisPoint,
        accountCap: DappMeta.accountCap,
        favicon: '',
        presale: DappMeta.addresses.presale,
        redeemer: DappMeta.addresses.redeemer,
        timer: DappMeta.addresses.timer,
        token: DappMeta.addresses.token,
        access: DappMeta.addresses.access,
        staking: DappMeta.addresses.staking
    })
}

async function checkForToken(target_name) {
    const data = await db.friends.where({
        tokenName: target_name
    }).first();
    return (data);
}
  
export default async function DappMetaCache(DappMeta) {   
        db.version(1).stores({ friends: "++id,&tokenName,\
                                        tokenSymbol,tokenOwnerWebsite,\
                                        siteUrl,totalPresale,referralBP,\
                                        basisPoint,accountCap,favicon,presale,\
                                        redeemer,timer,token,access,staking" });
        db.open();

        tokenData = await checkForToken(DappMeta.tokenName);

        if (!tokenData) {         
            await addTokenData(DappMeta);
        }
        return (tokenData);
}