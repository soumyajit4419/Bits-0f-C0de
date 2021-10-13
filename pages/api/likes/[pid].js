import db from "../../../Firebase/Firebase-admin";
const requestIp = require("request-ip");
const bcrypt = require("bcryptjs");

export default async (req, res) => {
  const { pid } = req.query;

  let hasUserLiked = false,
    totalLikes = 0;
  const clientIp = requestIp.getClientIp(req);
  const likeRef = db.collection("posts").doc(pid).collection("likes");

  const snapshot = await likeRef.get();
  snapshot.forEach((doc) => {
    if (bcrypt.compareSync(clientIp, doc.data().userIp)) {
      hasUserLiked = true;
    }
    totalLikes++;
  });

  res.status(200).json({ hasUserLiked: hasUserLiked, totalLikes: totalLikes });
};
