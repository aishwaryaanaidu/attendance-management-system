const db = require("../config/database");

// ==> Método responsável por criar um novo 'Product':

exports.createUser = async (req, res) => {
  const { fname, lname, email_id, password, student } = req.body;
  const { rows } = await db.query(
    "INSERT INTO registration (fname, lname, email_id, password, student) VALUES ($1, $2, $3, $4, $5)",
    [fname, lname, email_id, password, student]
  );

  res.status(201).send({
    message: "User added successfully!",
    body: {
      user: { fname, lname, email_id, password, student }
    },
  });
};

exports.login = async (req, res) => {
    const { email_id, password } = req.body;
    const { rows } = await db.query(
      "SELECT * FROM registration WHERE email_id = $1 AND password = $2",
      [email_id, password]
    );
    console.log(rows);
    if(rows.length > 0) {
        res.status(200).send({
            message: "User details verified!",
        });
    } else {
        res.status(200).send({
            message: "User not found",
        });
    }
    
  };