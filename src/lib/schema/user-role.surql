DEFINE TABLE user_role SCHEMAFULL
    PERMISSIONS
        FOR create NONE
        FOR select FULL
        FOR update NONE
        FOR delete NONE;

DEFINE FIELD role_type
    ON user_role
    TYPE string;

DEFINE INDEX role_type_index
    ON user_role
    FIELDS role_type
    UNIQUE;

CREATE user_role CONTENT {
    role_type: 'admin'
};

CREATE user_role CONTENT {
    role_type: 'content-creator'
};

CREATE user_role CONTENT {
    role_type: 'user'
};

CREATE user CONTENT {
    email: string::lowercase(string::trim("test@test.com")),
    password: crypto::argon2::generate("100100Borjan!"),
    role: ((SELECT id FROM only user_role WHERE role_type = 'admin').id )
};
