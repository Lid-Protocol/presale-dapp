import Dexie from 'dexie';

var db = new Dexie("BrandNewDappMeta");
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

        console.log("DappMeta: " +  DappMeta);

        tokenData = await checkForToken(DappMeta);

        //If there is not an entry, and no data aviable to be added return null
        if (!tokenData && !DappMeta.tokenSymbol) {   
            db.close();
            return (tokenData)
        } else if (!tokenData) {
        //Else add the token data to cache, and then read in data and set variable to return  
            await addTokenData(DappMeta);
            tokenData = await checkForToken(DappMeta.tokenName)
        }
        db.close();
        return (tokenData);
}