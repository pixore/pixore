import { NextApiRequest, NextApiResponse } from 'next';

export class RequestError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

type RequestHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<unknown>;

const getStatusCode = (error: Error) => {
  if (error instanceof RequestError) {
    return error.statusCode;
  }

  return 500;
};

const handler = (requestHandler: RequestHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    await requestHandler(req, res);
  } catch (error) {
    console.log('request error', error.stack);

    res.status(getStatusCode(error)).end(error.message);
  }
};

export { handler };
