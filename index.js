const AWS = require('aws-sdk');

/**
* Demonstrates a simple HTTP endpoint using API Gateway. You have full
* access to the request and response payload, including headers and
* status code.
*
* To scan a DynamoDB table, make a GET request with the TableName as a
* query string parameter. To put, update, or delete an item, make a POST,
* PUT, or DELETE request respectively, passing in the payload to the
* DynamoDB API as a JSON body.
*/
exports.handler = async (event, context) => {
   AWS.config.update({ region: 'us-west-2' });
   
   const pgClient = require('pg')
   const pgc = new pgClient.Client()
   await pgc.connect()

   let body;
   let statusCode = '200';
   const headers = {
       'Content-Type': 'application/json',
       "Access-Control-Allow-Headers" : "Content-Type",
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
   };

   console.log(event);

   try {
       switch (event.httpMethod) {
           case 'DELETE':
               throw new Error(`Unsupported method 1"${event.httpMethod}"`);
           case 'GET':
               body = await pgc.query(
                  `select * from testTable`
                  );
               await pgc.end()
               console.log(body.rows)
               break;
           case 'POST':
               const alarm = event.body['alarm']
               const data_version = event.body['data_version']
               const hweui = event.body['hweui']
               const real_humidity = event.body['real_humidity']
               const temp = event.body['temp']
               const vdd = event.body['vdd']

               body = await pgc.query('INSERT INTO testTable (alarm, dataVersion, hwid, real_humidity, temp, vdd) ' +
               'VALUES(' + alarm + ',' + data_version + ',\'' + hweui + '\',' + real_humidity + ',' + temp + ',' + vdd + ')')
               console.log(body)
               break;
           case 'PUT':
               throw new Error(`Unsupported method 2"${event.httpMethod}"`);
           default:
               throw new Error(`Unsupported method 3"${event.httpMethod}"`);
       }
   } catch (err) {
       console.log(err);
       statusCode = '400';
       body = err.message;
   } finally {
       body = JSON.stringify(body);
   }
   return {
       statusCode,
       body,
       headers,
   };
};