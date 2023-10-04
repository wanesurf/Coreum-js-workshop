// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import CoreumJS from '../../config/coreum-js'
import { NFT } from 'coreum-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // Init the client and target the testnet network:
    const coreumClient = await CoreumJS("testnet");

    const issuer  = coreumClient.address;


    const whitelistedNFT = NFT.Send({

          /** class_id defines the unique identifier of the nft classification, similar to the contract address of ERC721 */
          classId: "NFT CLASS ID",
          /** id defines the unique identification of nft */
          id: "NFT TO SEND",
          /** sender is the address of the owner of nft */
          sender: issuer,
          /** receiver is the receiver address of nft */
          receiver: "testcore1wudvzlcj07q5ln3ngjfhxz2c2x6d0h8llragp8",

    });

    const result = await coreumClient.sendTx([whitelistedNFT]);

    res.status(200).json({ whitelistedNFT: result })
}
