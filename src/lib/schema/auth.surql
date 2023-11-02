DEFINE SCOPE user SESSION 7d
    SIGNIN (
        SELECT * FROM user
        WHERE
                email = string::lowercase($email) AND
                crypto::argon2::compare(password, $password)
    )
    SIGNUP (
        CREATE user CONTENT {
            email: $email,
            password: crypto::argon2::generate($password)
        }
    );
