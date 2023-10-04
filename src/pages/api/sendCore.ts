// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import CoreumJS from '../../config/coreum-js'
import { Bank } from "coreum-js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // Init the client and target the testnet network:
    const coreumClient = await CoreumJS("testnet");

    const issuer  = coreumClient.address;
    
      // Let's initiate the bank send transaction:
      const bankSendMsg = Bank.Send({
        fromAddress: issuer,
        toAddress: "testcore1wudvzlcj07q5ln3ngjfhxz2c2x6d0h8llragp8",
        amount: [
            {
                denom: "utestcore",
                // amount is defined in subunits, taking the precision into an account we are sending 1 CORE
                amount: "1000000",
            },
        ],
    });
    console.log("bankSendMsg: ", bankSendMsg);

    const bankSendBroadcastResponse = await coreumClient.sendTx([bankSendMsg]);
    console.log("bankSendBroadcastResponse: ", bankSendBroadcastResponse);


    res.status(200).json({ bank: bankSendBroadcastResponse})
}
