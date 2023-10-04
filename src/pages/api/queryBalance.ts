// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import CoreumJS from '../../config/coreum-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // Init the client and target the testnet network:
    const coreumClient = await CoreumJS("testnet");

    // Let's define the modules we are going to use:
    const { bank } = coreumClient.queryClients;

    const issuer  = coreumClient.address;

    const issuerBalance = await bank.allBalances(issuer);


    res.status(200).json({ balance: issuerBalance})
}
