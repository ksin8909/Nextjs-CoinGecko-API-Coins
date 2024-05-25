import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string
}
 
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    //const file = await fs.readFile(process.cwd() + '/src/app/json/coins.json', 'utf8');
    const host = "http://localhost:3000/";
    //const host = "https://nextjs-coin-gecko-api-coins.vercel.app/";
    const file = await fetch('http://localhost:3000/json/coins.json');
    const data = await file.json();
    //const data = JSON.parse(file);

    let str = "";
    for (let i = 0; i < data.length; i++){
        str += data[i]['coingeckoid'] + "%2C";
    }

    // price
    let price_url = "https://api.coingecko.com/api/v3/simple/price?ids=" + str + "&vs_currencies=usd";
    //const request = require('request');
    //let options = {json: true};

    const ress = await fetch(price_url);
    const latestprice = await ress.json();

    return new Response(JSON.stringify(latestprice), {
        status: 200,
        headers: {
            "content-type": "application/json",
        },
    })
    //res.status(200).json(latestprice);
}

export const config = {
    runtime: "edge",
}

export default handler