// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getTweetsBasedOnCrieteria } from "@/lib/twitter";

export default async (req, res) => {

    const requestData = JSON.parse(req.body);

    const nextToken = requestData.nextToken;
    const location = requestData.location;
    const resource = requestData.resource;
    const preference = requestData.preference;
 
    const response = await getTweetsBasedOnCrieteria(location, resource, preference, nextToken);

    res.statusCode = 200
    res.json(response);
  }
  