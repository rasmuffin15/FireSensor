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

   console.log(event.body);

   try {
       switch (event.httpMethod) {
           case 'DELETE':
               throw new Error(`Unsupported method 1"${event.httpMethod}"`);
           case 'GET':
               body = await pgc.query(
                  `select * from sensorJSON`
                  );
               await pgc.end()
               //console.log(body.rows)
               break;
           case 'POST':

                const data = JSON.parse(event.body)

                const id = data.app_id
                const dev_id = data.dev_id
                const h_serial = data.hardware_serial
                const port = data.port
                const counter = data.counter
                const payload_raw = data.payload_raw
                const payload_fields = data.payload_fields
                const metadata = data.metadata
                const url = data.downlink_url

                sqlAll = 'INSERT INTO allSensorData (hweui, vdd, temp, humidity, aq, time) ' +
                'VALUES(\'' + payload_fields.hweui + '\',\'' + payload_fields.vdd + '\',\'' +
                payload_fields.temp + '\',\'' + payload_fields.real_humidity + '\',\' N/A ,\'' +
                metadata.gateways.time + '\')'

                sqlUnique = 'UPDATE '

                console.log('INSERT INTO sensorJSON (id, dev_id, h_serial, port, counter, payload_raw, metadata, url, payload_fields) ' + 
                'VALUES(\'' + id + '\',\'' + dev_id + '\',\'' + h_serial + '\',' + port + ',' + counter + ',\'' + payload_raw + '\',\'' + JSON.stringify(metadata) + '\',\'' + url + 
                '\',\'' + JSON.stringify(payload_fields) + '\')')

                body = await pgc.query('INSERT INTO sensorJSON (id, dev_id, h_serial, port, counter, payload_raw, metadata, url, payload_fields) ' + 
                'VALUES(\'' + id + '\',\'' + dev_id + '\',\'' + h_serial + '\',' + port + ',' + counter + ',\'' + payload_raw + '\',\'' + JSON.stringify(metadata) + '\',\'' + url + 
                '\',\'' + JSON.stringify(payload_fields) + '\')') 
                
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