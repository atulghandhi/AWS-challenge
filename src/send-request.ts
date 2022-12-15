let AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const randomstring = require('randomstring');

// Create publish parameters
let params = {
    Message: 'NEW MESSAGE FROM ATUL', /* required */
    TopicArn: 'arn:aws:sns:us-east-1:323210817193:sms-topic',
};

// Create promise and SNS service object
let publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
    function(data) {
        console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
    }).catch(
    function(err) {
        console.error(err, err.stack);
    });

//-------------------------send SMS----------------------------------------
// COMMENTED OUT CODE DOES NOT WORK AS INTENDED
// exports.lambdaHandler = async (event, context) => {
//     const json = JSON.parse(event.body);
//
//     const { telephoneNumber } = json;
//
//     const confirmationCode = randomstring.generate({
//         length: 4,
//         charset: 'numeric'
//     });
//
//     const params = {
//         Message: `Your hello-world confirmation code is : ${confirmationCode}`,
//         PhoneNumber : telephoneNumber
//     }
//
//     const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
//     await publishTextPromise.then(data => {
//         console.log('LAMBDA STUFF HAPPENING');
//         context.succeed({
//             statusCode: 200,
//             confirmationCode
//         })
//     }).catch(error => {
//         console.log('LAMBDA ERROR STUFF HAPPENING');
//         context.fail({
//             statusCode: 500,
//             error
//         })
//     })
// }