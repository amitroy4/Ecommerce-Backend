function passwordValidation(password) {
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/

    return pattern.test(password)
}

module.exports = passwordValidation;