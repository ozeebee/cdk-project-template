import { Handler } from 'aws-lambda'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// SDK V3: install your clients for each service used
//   example: `npm install @aws-sdk/client-sfn`<% if (features.includes('lambdaLayer')) { %>
//   and don't forget to add it to the layer as well<% } %> 
import * as sfn from '@aws-sdk/client-sfn'


const varEnv = process.env['MYENV_VAR']
if (! varEnv) throw new Error(`Cannot find env variable 'MYENV_VAR'`)

const sfnClient = new sfn.SFNClient({ region: 'eu-west-1' })

export const handler: APIGatewayProxyHandler = async (event, context) => {
  console.log(`event `, JSON.stringify(event, null, 2))
  // console.log(`context `, JSON.stringify(context, null, 2))
  const eventBody = JSON.parse(event.body!)

  // do something with some AWS services
  //await sfnClient.send(new sfn.StartExecutionCommand({...}))

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, World! Your request was received at <%='$'%>{event.requestContext.requestTime}.`,
  }
}
