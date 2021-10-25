const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

module.exports = (db) => {

  //Get list of passwords dashboard
  router.get("/passwords", (req, res) => {
    const userCookieId = req.session.user_id;
    const orderByOption = req.body.sort_by ? req.body.sort_by : `password_name`

    if (!userCookieId) {
      res.redirect('/user/login');
      return;
    }

    db.query(`
    SELECT accounts.email AS email,
           passwords.name AS password_name,
           passwords.username AS password_username,
           passwords.url AS password_url,
           passwords.password AS password_password,
           categories.name AS password_category,
           accounts.organization_id AS organization_id
    FROM passwords
    JOIN categories ON passwords.category_id = categories.id
    JOIN accounts ON passwords.user_id = accounts.id
    WHERE passwords.user_id = $1
    AND passwords.org_id IS NULL
    ORDER BY $2;
    `, [userCookieId, orderByOption])

      .then(privateData => {
        const passwordData = { private: privateData.rows };
        const orgId = privateData.rows[0].organization_id

        db.query(`
        SELECT organizations.name,
                passwords.name AS password_name,
                passwords.username AS password_username,
                passwords.url AS password_url,
                passwords.password AS password_password,
                categories.name AS password_category
        FROM passwords
        JOIN categories ON passwords.category_id = categories.id
        JOIN organizations ON passwords.org_id = organizations.id
        JOIN accounts ON passwords.user_id = accounts.id
        WHERE organizations.id = $1
        ORDER BY $2;
        `, [orgId, orderByOption])

        .then(orgData => {
          const passwordOrg = { organization: orgData.rows }
          userPasswordsTemplateVars = {
            ...passwordData,
            ...passwordOrg
          }
          console.log(userPasswordsTemplateVars)
        res.render("index", userPasswordsTemplateVars);
        })
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      })
  });


  //Get create a new password form
  router.get("/passwords/new", (req, res) => {

  });

  //Create a new password
  router.post("/passwords", (req, res) => {

  });

  //Update a password
  router.post("passwords/:id", (req, res) => {

  });

  //Delete a password
  router.post("passwords/:id", (req, res) => {

  });

  return router;
};
