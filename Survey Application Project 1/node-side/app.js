const express = require("express");
var cors = require("cors");
const crypto = require("crypto");
// const algorithm = "aes-256-cbc"; 
// const initVector = crypto.randomBytes(16);
// const Securitykey = crypto.randomBytes(32);
// const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector)
// const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
var key = "abcdefghijklmnopqrstuvwx";
var encrypt = crypto.createCipheriv('des-ede3', key, "");
const bodyParser = require("body-parser");
var { Client } = require("pg");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const pool = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Nitin@2229",
  database: "Navneet",
});
pool.connect();
app.post("/signin", (req, res) => {
  const user = req.body;
  const password = user.password;
  // let encryptedData = cipher.update(password, "utf-8", "hex");
  // encryptedData += cipher.final("hex");
  var encrypt = crypto.createCipheriv('des-ede3', key, "");
  var theCipher = encrypt.update(password, 'utf8', 'base64');
  theCipher += encrypt.final('base64');
  console.log(theCipher);
  let selectQuery = `select count(email) from signup where email='${user.email}'`;
  try {
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        if (result.rows[0].count == 0) {
          let insertQuery = `insert into signup(firstname, lastname, email, password)
                              values('${user.fname}', '${user.lname}', '${user.email}', '${theCipher}') `;
          pool.query(insertQuery, (err, result1) => {
            if (!err) {
              res.send("Insertion was successful");
            } else {
              console.log(err.message);
            }
          });
        } else {
          console.log("inside else")
          res.send({
            exists: "True"
          })
        }
      } else {
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});
app.post("/login", (req, res) => {
  const user = req.body;
  const email = user.email;
  const password = user.password;
  try {
    let searchQuery = `Select count(email) from signup where email = '${email}'`;
    pool.query(searchQuery, (err, result) => {
      if (!err) {
        if (result.rows[0].count == 1) {
          let passQuery = `Select id,password, role from signup where email = '${email}'`;
          pool.query(passQuery, (err, result1) => {
            let passdb = result1.rows[0].password;
            // let decryptedData = decipher.update(passdb, "hex", "utf-8");
            // decryptedData += decipher.final("utf8");
            // console.log(decryptedData);
            var decrypt = crypto.createDecipheriv('des-ede3', key, "");
            var s = decrypt.update(passdb, 'base64', 'utf8');
            var decryptedData = s + decrypt.final('utf8');
            if (decryptedData == password) {
              let insertQuery = `insert into logins(id, email) values('${result1.rows[0].id}','${user.email}')`;
              pool.query(insertQuery, (err, result) => {
                if (!err) {
                  console.log("insertion successfull logins");
                } else {
                  console.log(err.message);
                }
              });
              res.send({
                sucess: "True",
                password: result1.rows[0].password,
                role: result1.rows[0].role,
              });
            } else {
              res.send({
                sucess: "False",
              });
            }
          });
        }
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error)
  }
});
app.get("/list", (req, res) => {
  try {
    let selectQuery = `select * from Survey where status = 'Created'`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error)
  }
});
app.get("/adminlist", (req, res) => {
  try {
    let selectQuery = `select * from Survey`;
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
  pool.end;
  } catch (error) {
    console.log(error)
  }
});
app.post("/response", (req, res) => {
  try {
    const user = req.body;
  let searchQuery = `SELECT email FROM logins ORDER BY logtime DESC LIMIT 1;`;
  pool.query(searchQuery, (err, result) => {
    if (!err) {
      const user_email = result.rows[0].email;
      let insertQuery = `insert into response(surveyName, users) values('${user.sname}', '${user_email}')`;
      pool.query(insertQuery, (err, result) => {
        if (!err) {
          console.log("insertion successfull");
        } else {
          console.log(err.message);
        }
      });
    } else {
      console.log(err.message);
    }
  });
  } catch (error) {
    console.log(error)
  }
});
app.get("/users", (req, res) => {
  try {
    let selectQuery = `Select firstname, email from signup where role='User'`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error)
  }
});
app.get("/question", (req, res) => {
  try {
    let selectQuery = `Select * from Questions`;
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
  pool.end;
  } catch (error) {
    console.log(error)
  }
});
app.post("/drafted", (req, res) => {
  const user = req.body;
  const questions = user.questions;
  const status = user.status;
  const n = questions.length;
  try {
    let insertSurvey = `Insert into Survey(surveyname, status) values('${user.surveyname}', '${status}')`;
  pool.query(insertSurvey, (err, result) => {
    if (!err) {
      console.log("insertion successfull");
    } else {
      console.log(err.message);
    }
  });
  let SelectQuery = `Select sid from Survey where surveyname='${user.surveyname}'`;
  pool.query(SelectQuery, (err, result) => {
    if (!err) {
      const surveyid = result.rows[0].sid;
      for (let i = 0; i < n; i++) {
        let matchInsert = `Insert Into survey_mapping(sid, qid) values('${surveyid}', '${questions[i]}')`;
        pool.query(matchInsert, (err, result) => {
          if (!err) {
            console.log("insertion successfull");
          } else {
            console.log("error at survey_mapping", err.message);
          }
        });
      }
    } else {
      console.log("error at sid", err.message);
    }
  });
  } catch (error) {
    console.log(error)
  }
});
app.post("/storeSurvey", (req, res) => {
  const user = req.body;
  const status = user.status;
  const questions = user.questions;
  const n = questions.length;
  var emails = [];
  try {
    let getUser = `SELECT email FROM logins ORDER BY logtime DESC LIMIT 1`;
  pool.query(getUser, (err, result1) => {
    if (!err) {
      console.log("id", result1.rows[0].email)
      var mail = result1.rows[0].email;
      emails.push(mail)
      let insertSurvey = `Insert into Survey(surveyname, status, createdby) values('${user.surveyname}', '${status}', '${emails[0]}')`;
      console.log("step2");
      pool.query(insertSurvey, (err, result) => {
        if (!err) {
          console.log("insertion successfull");
        } else {
          console.log(err.message);
        }
      });
      let SelectQuery = `Select sid from Survey where surveyname='${user.surveyname}'`;
      pool.query(SelectQuery, (err, result) => {
        if (!err) {
          const surveyid = result.rows[0].sid;
          for (let i = 0; i < n; i++) {
            let mapInsert = `Insert Into survey_mapping(sid, qid) values('${surveyid}', '${questions[i]}')`;
            pool.query(mapInsert, (err, result) => {
              if (!err) {
                console.log("insertion successfull");
              } else {
                console.log(err.message);
              }
            });
          }
        } else {
          console.log(err.message);
        }
      });
    } else {
      console.log(err.message);
    }
  });
  } catch (error) {
    console.log(error)
  }
});
app.post("/updateSurvey", (req, res) => {
  const user = req.body;
  const status = user.status;
  const questions = user.questions;
  const n = questions.length;
  try {
    let SelectQuery = `Select sid from Survey where surveyname='${user.old}'`;
    pool.query(SelectQuery, (err, result) => {
      if (!err) {
        const surveyid = result.rows[0].sid;
        var ids = [];
        let updateSurvey = `Update Survey set surveyname='${user.surveyname}', status='${status}' where sid='${surveyid}'`;
        pool.query(updateSurvey, (err, result) => {
          if (!err) {
            console.log("insertion successfull");
          } else {
            console.log("hello", err.message);
          }
        });
        let selectid = `Select id, sid from survey_mapping where sid='${surveyid}'`;
        pool.query(selectid, (err, result) => {
          if (!err) {
            var n1 = result.rows.length;
            for (let i = 0; i < n1; i++) {
              ids.push(result.rows[i].id)
            }
            for (let j = 0; j < n; j++) {
              let UpdateSurvey = `Update survey_mapping set qid = '${questions[j]}' where id = '${ids[j]}'`
              pool.query(UpdateSurvey, (err, result) => {
                if (!err) {
                  console.log("Updation Successfull");
                } else {
                  console.log(err.message);
                }
              })
            }
          } else {
            console.log(err.message);
          }
        });
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error)
  }
});
app.post("/mapping", (req, res) => {
  var Questions = [];
  const user = req.body;
  try {
    let selectquery = `Select sid from Survey where surveyname='${user.sname}'`;
  pool.query(selectquery, (err, result) => {
    if (!err) {
      // res.send(result.rows)
      const surveyid = result.rows[0].sid;
      let matchingSelect = `Select qid from survey_mapping where sid='${surveyid}'`;
      pool.query(matchingSelect, (err, result1) => {
        if (!err) {
          Questions = result1.rows;
          var qids = [];
          let n = Questions.length;
          for (let i = 0; i < n; i++) {
            qids.push(Questions[i].qid)
          }
          let selectQuestions = `Select question,answer,id from Questions where id in (${qids})`;
          pool.query(selectQuestions, (err, result2) => {
            if (!err) {
              res.send(result2.rows);
            } else {
              console.log(err.message);
            }
          });
          pool.end;
        } else {
          console.log(err.message);
        }
      });
    } else {
      console.log(err.message);
    }
  });
  } catch (error) {
    console.log(error)
  }
});
app.post("/sendResponse", (req, res) => {
  const answers = req.body.answer;
  const Surveyname = req.body.sname;
  var email = []
  try {
    let getUser = `SELECT email FROM logins ORDER BY logtime DESC LIMIT 1`;
    pool.query(getUser, (err, result) => {
      if (!err) {
        const mail = result.rows[0].email;
        email.push(mail)
      } else {
        console.log(err.message);
      }
    });
    let selectSurvey = `Select sid from Survey where surveyname= '${Surveyname}'`;
    pool.query(selectSurvey, (err, result) => {
      if (!err) {
        let sid = result.rows[0].sid;
        let selectQues = `Select qid from survey_mapping where sid='${sid}'`;
        pool.query(selectQues, (err, result1) => {
          if (!err) {
            var ques_list = result1.rows;
            var n = ques_list.length;
            for (let i = 0; i < n; i++) {
              var curr_id = ques_list[i].qid
              var curr_ans = answers[curr_id];
              let insertResponse = `insert into response(userid, surveyid, quesid, answer) values('${email[0]}', '${sid}', '${curr_id}', '${curr_ans}')`;
              pool.query(insertResponse, (err, result) => {
                if (!err) {
                  console.log("insertion successfull response");
                } else {
                  console.log(err.message);
                }
              });
            }
          } else {
            console.log(err.message);
          }
        })
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error)
  }
})
app.post("/getresponse", (req, res) => {
  const name = req.body.sname;
  try {
    let selectSurveyid = `select sid from Survey where surveyname='${name}'`;
    pool.query(selectSurveyid, (err, result) => {
      if (!err) {
        var surveyid = result.rows[0].sid;
        let selectResponse = `select * from response where surveyid = '${surveyid}'`;
        pool.query(selectResponse, (err, result1) => {
          if (!err) {
            res.send(result1.rows);
          } else {
            console.log(err.message)
          }
        });
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error)
  }
})
app.listen(9000, (req, res) => {
  console.log("Server is running on the port 9000");
});

