const User = require("../models/User");

function achievementUnlocked(userId, challenge) {
    User.findById(userId, function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            if (user[challenge] == true) {
                console.log(`${challenge} achievement already unlocked by ${user.email}`);
            }
            else {
                User.findByIdAndUpdate(userId, { [challenge]: true },
                    function (err, docs) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log(`User ${user.email} unlocked achievement ${challenge}`);
                        }
                    });
            }
        }
    })
};

module.exports = { achievementUnlocked };