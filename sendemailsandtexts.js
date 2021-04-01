(async () => {
    const DUCK_FACT = "QUACK!";

    const data = {
        "emails": {
            "dsfkj": "avishkank@gmail.com"
        },
        "phones": {
            "sdflkjk": "9717275442"
        }
    }

    /*

    const admin = require("firebase-admin");
    const serviceAccount = require("./serviceaccount.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://winkwonk-d0ead-default-rtdb.firebaseio.com"
    });

    const db = admin.database();
    const ref = db.ref("/");
    const data = await new Promise(res => {
        ref.once("value", snap => {
            res(snap.val());
        })
    });

    */

    require('dotenv').config()

    const AWS = require('aws-sdk');
    AWS.config.update({
        "accessKeyId": process.env.ACCESS_KEY_ID,
        "secretAccessKey": process.env.SECRET_ACCESS_KEY,
        "region": "us-east-2"
    });
    
    let sns = new AWS.SNS({
        apiVersion: "2010-03-31"
    });

    // Texts
    let phonePromises = [];
    for (let key in data["phones"]) {
        const params = {
            Message: DUCK_FACT,
            PhoneNumber: "+1" + data["phones"][key],
        };
    
        let p = sns.publish(params).promise();
        p.then(data => {
            console.log("MessageID is " + data.MessageId);
        }).catch(err => {
            console.error(err, err.stack);
        });

        phonePromises.push(p);
    }

    await Promise.all(phonePromises);

    // Emails
    let emailPromises = [];
    for (let key in data["emails"]) {
        let ses = new AWS.SES({apiVersion: '2010-12-01'});
        
        let p = new Promise((res, rej) => {
            ses.sendEmail({
                Destination: {
                    ToAddresses: [data["emails"][key]]
                },
                Message: {
                    Body: {
                        Html: {
                            Data: DUCK_FACT
                        },
                        Text: {
                            Data: DUCK_FACT
                        }
                    },
                    Subject: {
                        Data: "Duck Facts!"
                    }
                },
                Source: "duckfacts@quack.vandyhacks.dev"
            }, (err, data) => {
                if (err) rej(err);
                res(data);
            });
        });

        p.then(data => {
            console.log(data);
        }).catch(err => {
            console.error(err, err.stack);
        });

        emailPromises.push(p);
    }

    await Promise.all(emailPromises);
    console.log("Done.");
})();

