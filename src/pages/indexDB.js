import Dexie from 'dexie';

var db = new Dexie("DappMetaV10");

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
    project: '',
    addresses: {
      access: '',
      presale: '',
      redeemer: '',
      timer: '',
      staking: '',
      token: ''
    }
}

async function addTokenData(DappMeta, ProjectName) {
    await db.DappMeta.add({
        project: ProjectName,
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

async function checkForToken(ProjectName) {
    const data = await db.DappMeta.where({
        project: ProjectName
    }).first();
    return (data);
}
  
export default async function DappMetaCache(DappMeta, ProjectName, adding) {  

        db.version(1).stores({ DappMeta: "++id,&project,tokenName,\
                                        tokenSymbol,tokenOwnerWebsite,\
                                        siteUrl,totalPresale,referralBP,\
                                        basisPoint,accountCap,favicon,presale,\
                                        redeemer,timer,token,access,staking" });
        db.open().catch(function (err) {
            console.error (err.stack || err);
        });

        tokenData = await checkForToken(ProjectName);

        if (tokenData == undefined && adding == false) {
                db.close();
                return(null);
        } else if (tokenData == undefined) {
                await addTokenData(DappMeta, ProjectName);
                db.close();
                return (null);
        }
        db.close();
        return (tokenData);
}