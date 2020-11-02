var webPush = require('web-push');

const vapidKeys = {
    "publicKey" : "BBfja2vkOliZWfqGxXc8cv31Lds9WrzKLAMR-CB0g5QDzLL1nR9S-836v5P20THli6M1v3bdZI2vXJz2rUAJUqI",
    "privateKey" : "dOyIZUxl-2pYoT2yXZ1SqJLEPHXZrwUCGgAVpnroXYk"
}

webPush.setGCMAPIKey('6114247510');
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cvpOqE6dKP4:APA91bFgXydGmB3OXCy0PKuNeac9e3xA4tMZKDwObRcinEttA0Fc4KChceqV6WZB3tzs82XVjBA8VfaAlPdMN8N1BzmbUljfW3TDTjCw43zTPdvrIGfUzjxSuobAOB3e8H9hMRoislFK",
    "keys": {
        "p256dh": "BG2f97ra94nXyixDyyi075WN2dOt+1IK0GJTgnS1WWvIkp9VRkdOkv04ssFG0Pauljs4NIcAZuJmzjiLQ8fL+lE=",
        "auth": "dVeOP+SXL7zcCOzzNWFVnA=="
    }
};
var payload = 'Berhasil dengan payload';
var options = {
    gcmAPIKey: '6114247510',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);