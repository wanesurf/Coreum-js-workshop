// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import CoreumJS from '../../config/coreum-js'
import { NFT } from 'coreum-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // Init the client and target the testnet network:
    const coreumClient = await CoreumJS("testnet");

    const issuer = coreumClient.address;

    const newNFTCollection = NFT.IssueClass({
        issuer: issuer,
        //Unique for each user collection
        symbol: "NEW2",
        name: "My testing collectiion",
        description: "a new collection of NFTs",
        uri: "http://test.com/",
        uriHash: "somehash",
        royaltyRate: "0",
        // burning = 0, freezing = 1,  whitelisting = 2,disable_sending = 3
        features: [0, 1, 2, 3]
    });

    console.log(newNFTCollection);

    const newCollection = await coreumClient.sendTx([newNFTCollection]);

    res.status(200).json({ name: newCollection })
}
