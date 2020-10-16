import Dexie from 'dexie';

var db = new Dexie("LidDappMeta");

//Added Like This Due To TypeScrtip Interface
var tokenData = { 
    tokenName: '',
    tokenSymbol: '',
    tokenOwnerWebsite: '',
    siteUrl: '',
    totalPresale: '0',
    referralBP: '0',
    basisPoint: '0',
    accountCap: '0',
    favicon: '',
    addresses: {
        access: '',
        presale: '',
        redeemer: '',
        timer: '',
        staking: '',
        token: ''
    }
}

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
        addresses: {
            presale: DappMeta.addresses.presale,
            redeemer: DappMeta.addresses.redeemer,
            timer: DappMeta.addresses.timer,
            token: DappMeta.addresses.token,
            access: DappMeta.addresses.access,
            staking: DappMeta.addresses.staking
        }
    })
}

async function checkForToken(target_name) {
    const data = await db.friends.where({
        tokenSymbol: target_name
    }).first();
    return (data);
}
  
export default async function DappMetaCache(DappMeta) {  
        db.version(1).stores({ friends: "++id,tokenName,\
                                        &tokenSymbol,tokenOwnerWebsite,\
                                        siteUrl,totalPresale,referralBP,\
                                        basisPoint,accountCap,favicon,presale,\
                                        redeemer,timer,token,access,staking" });
        db.open();

        //if DappMeta.tokenSymbol is undefined then check for data, if undefinded return null
        //if data was retrvied, return token data.
        if (DappMeta.tokenSymbol == undefined) {
            tokenData = await checkForToken(DappMeta);
            if (tokenData == undefined) {
                db.close();
                return(null);
            } else {
                db.close();
                return(tokenData);
            }
        } else {
                await addTokenData(DappMeta);
        }

        db.close();
        return (null);
}