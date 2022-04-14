const db = require("../config/database");

// exports.login = async (req, res) => {
//     const { email_id, password } = req.body;
//     const { rows } = await db.query(
//       "SELECT * FROM registration WHERE email_id = $1 AND password = $2",
//       [email_id, password]
//     );
//     console.log(rows);
//     if(rows.length > 0) {
//         res.status(200).send({
//             message: "User details verified!",
//         });
//     } else {
//         res.status(200).send({
//             message: "User not found",
//         });
//     }
    
//   };

getStudents = async (course_id) => {
    console.log(course_id)
    const { rows } = await db.query(
        // "SELECT * FROM student WHERE $1=ANY(list_of_courses)",
        "SELECT * FROM student WHERE student_id=$1",
        [course_id]
    )
    console.log("students1" + rows)
    return rows
}

getAssignments = async (student) => {
    const { result } = await db.query(
        "INSERT INTO submissions (assignment_id, student_id, status, files, grade) VALUES ($1, $2, $3, $4, $5)",
        [rows[0].assignment_id, student.student_id, "OPEN", null, null]
    );
    return result;
}

// exports.createAssignment = async (req, res) => {
//   const { course_id, assignment_name, assignment_description } = req.body;
//   const { rows } = await db.query(
//     "INSERT INTO assignment (course_id, assignment_name, assignment_description) VALUES ($1, $2, $3) RETURNING *",
//     [course_id, assignment_name, assignment_description]
//   )
//   console.log(rows);
//   if(rows.length > 0) {
//     //   const { students } = db.query(
//     //       "SELECT * FROM students WHERE course_id=ANY(list_of_courses) RETURNING *"
//     //   );
//     const students = await getStudents(course_id);
//     console.log("students" + students);
//       if(!!students && students.length > 0) {
//           console.log("hereeeeeeeee");
//           students.array.forEach(student => {
//               getAssignments(student);
//             // const { result } = db.query(
//             //     "INSERT INTO submissions (assignment_id, student_id, status, files, grade) VALUES ($1, $2, $3, $4, $5)",
//             //     [rows[0].assignment_id, student.student_id, "OPEN", null, null]
//             // );
//           });
//           res.status(201).send({
//             message: "Assignment created successfully!",
//             body: {
//               details: { course_id, assignment_name, assignment_description }
//             },
//           });
//       }
//       res.status(400).send({
//         message: "error occurred"
//       });

//   }
//   res.status(201).send({
//     message: "Assignment created successfully!",
//     body: {
//       details: { course_id, assignment_name, assignment_description }
//     },
//   });
// };

// exports.login = async (req, res) => {
//     const { email_id, password } = req.body;
//     const { rows } = await db.query(
//       "SELECT * FROM registration WHERE email_id = $1 AND password = $2",
//       [email_id, password]
//     );
//     console.log(rows);
//     if(rows.length > 0) {
//         res.status(200).send({
//             message: "User details verified!",
//         });
//     } else {
//         res.status(200).send({
//             message: "User not found",
//         });
//     }
    
//   };


exports.createAssignment = async (req, res) => {
    const { course_id, assignment_name, assignment_description } = req.body;
    let { rows } = await db.query(
      "INSERT INTO assignment (course_id, assignment_name, assignment_description) VALUES ($1, $2, $3) RETURNING *",
      [course_id, assignment_name, assignment_description]
    )
    console.log(rows);
    let {row} = await db.query(
        "SELECT * FROM student WHERE student_id=$1",
        [course_id]
    );
    //   const students = await getStudents(course_id);
      console.log("students" + row);
        // if(!!students && students.length > 0) {
        //     console.log("hereeeeeeeee");
        //     students.array.forEach(student => {
        //         getAssignments(student);
        //       // const { result } = db.query(
        //       //     "INSERT INTO submissions (assignment_id, student_id, status, files, grade) VALUES ($1, $2, $3, $4, $5)",
        //       //     [rows[0].assignment_id, student.student_id, "OPEN", null, null]
        //       // );
        //     });
            
        
        res.status(201).send({
            message: "Assignment created successfully!",
            body: {
              details: { course_id, assignment_name, assignment_description }
            },
          });
  
    }