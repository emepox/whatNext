// To do
// async function emailNotTaken(req, res, next) {
//     try {
//       const { username } = req.body;
  
//       const results = await db(`SELECT * FROM users WHERE email = '${email}';`);
  
//       if (results.data.length) {
//         return res.status(400).send({ message: "Email already taken, please use another one or log in!" });
//       }
//       next();
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   }
  
//   module.exports = emailNotTaken;