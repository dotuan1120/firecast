import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const pushNotification = functions.database
.ref('/test1/{date}/{time}')
.onWrite((snapshot, context) => {
  console.log('Push notification event triggered');
  const date = context.params.date
  const time = context.params.time
  console.log(`New detection at ${time} on ${date}`)
  //  Get the current value of what was written to the Realtime Database.
  const messageData = snapshot.after.val()

  // Create a notification
  const payload = {
    notification: {
      title: "Warning!!!!",
      body: "Detect people",
      sound: "default",
      image: messageData.image
    } 
  };
  //Create an options object that contains the time to live for the notification and the priority
  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

  return admin.messaging().sendToTopic("pushNotifications", payload, options);
});

/**export const onMessageUpdate = functions.database
.ref('/test1/{date}/{time}')
.onUpdate((change, context) => {
  const after = change.after.val()
  console.log('Video upload');
  const payload = {
    data: {
      vid: after.video,
    }
  };
  //Create an options object that contains the time to live for the notification and the priority
  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  return admin.messaging().sendToTopic("pushNotifications", payload, options);
})**/
