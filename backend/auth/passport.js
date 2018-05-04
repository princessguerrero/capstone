const passport = require('passport')
const pgp = require('pg-promise')({})
const db = pgp(process.env.postgresql-convex-44205);

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser((username, done) => {
        db.one('SELECT id, username FROM users WHERE username=$1', [username])
            .then((user) => {
                return done(null, user)
            })
            .catch((err) => {
                return done(err, null)
            })
    })
}