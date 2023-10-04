// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import CoreumJS from '../../config/coreum-js'
import { NFT } from 'coreum-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // Init the client and target the testnet network:
    const coreumClient = await CoreumJS("testnet");

    const issuer  = coreumClient.address;

    const newNFT = NFT.Mint({
        sender: issuer,
        classId: "eth3-testcore15gggfzklh5hpxq28zxxpreda85h059d70fsfm7",
        id: "eth3-1",
        uri: "uri",
        uriHash: "uri hash",
    })

    const result = await coreumClient.sendTx([newNFT]);

    res.status(200).json({ name: result })
}
