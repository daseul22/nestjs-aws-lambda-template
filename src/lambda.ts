import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { bootstrap } from './main';

let server: Handler;

const serverlessBootstrap = async () => {
  const nestApp = await bootstrap();
  await nestApp.init();

  const expressApp = nestApp.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
};

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await serverlessBootstrap());

  return server(event, context, callback);
};
