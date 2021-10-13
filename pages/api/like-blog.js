import db from "../../Firebase/Firebase-admin";
const requestIp = require("request-ip");
const bcrypt = require("bcryptjs");

export default async (req, res) => {
  if (req.method == "POST") {
    const clientIp = requestIp.getClientIp(req);
    const pid = req.body.id;

    const likeRef = db.collection("posts").doc(pid).collection("likes");

    const snapshot = await likeRef.get();
    let isFound = false;
    let docId;
    snapshot.forEach((doc) => {
      if (bcrypt.compareSync(clientIp, doc.data().userIp)) {
        isFound = true;
        docId = doc.id;
      }
    });

    if (!isFound) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(clientIp, salt);
      likeRef.add({ userIp: hash });
    } else {
      const res = await likeRef.doc(docId).delete();
    }
    res.status(200).json({ message: "Successful" });
  } else {
    res.status(304).json({ message: "Invalid Request" });
  }
};
