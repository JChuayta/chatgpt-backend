import * as admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_JSON!);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export default admin;
