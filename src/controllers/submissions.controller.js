const db = require("../config/database");

exports.updateStatus = async (req, res) => {
    const submission_id = parseInt(req.params.id);
    const { status } = req.body;

    const response = await db.query(
        "UPDATE submissions SET status = $1 WHERE submission_id = $2",
        [status, submission_id]
    );

    res.status(200).send({ message: "Status Updated Successfully!" });
};

exports.submitFile = async (req, res) => {
    const submission_id = parseInt(req.params.id);
    console.log("File" + req.file)
    const { file } = req.files.file;
    console.log(file)

    const response = await db.query(
        "UPDATE submissions SET files = $1 WHERE submission_id = $2",
        [file, submission_id]
    );

    res.status(200).send({ message: "File submitted Successfully!" });
};