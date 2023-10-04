// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import CoreumJS from '../../config/coreum-js'
import { FT } from 'coreum-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // Init the client and target the testnet network:
    const coreumClient = await CoreumJS("testnet");

    const issuer = coreumClient.address;

    //denom (usually 10^-6)
    const subunit = "umyft"
    const symbol =  "MYFT"

    const issueFtMsg = FT.Issue({
        issuer: issuer,
        symbol: symbol,
        subunit: subunit,
        precision: 6,
        initialAmount: "100000000",
        description: "My first FT token",
        // minting = 0,
        // burning = 1,
        // freezing = 2,
        // whitelisting = 3,
        // ibc = 4
        features: [0,1,2,3,4],
    })

    // exemple to mint new tokens
    // const mintFtMsg = FT.Mint({
    //     sender: issuer,
    //     coin: {
    //         denom: ftDenom,
    //         amount: "1",
    //     }
    // })

    console.log(issueFtMsg);

    const newCollection = await coreumClient.sendTx([issueFtMsg]);

    res.status(200).json({ name: newCollection })
}
