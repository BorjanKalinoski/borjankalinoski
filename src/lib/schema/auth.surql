DEFINE SCOPE user SESSION 7d
    SIGNIN {
        LET $user = (SELECT * FROM user WHERE email = string::lowercase(string::trim($email)) AND crypto::argon2::compare(password, $password));

        IF !$user {
            THROW "Invalid credentials provided."
        };

        RETURN $user;
    }
    SIGNUP {
        LET $user = (SELECT * FROM user WHERE email = $email);

        IF $user {
             THROW "The email " + <string> $email + " is taken.";
        };

        RETURN CREATE user CONTENT {
            email: string::lowercase(string::trim($email)),
            password: crypto::argon2::generate($password)
        };
    };
