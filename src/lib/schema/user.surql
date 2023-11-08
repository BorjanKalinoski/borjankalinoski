DEFINE TABLE user SCHEMAFULL
    PERMISSIONS
        FOR create FULL
        FOR select FULL
        FOR update WHERE id = $auth.id
        FOR delete WHERE id = $auth.id;

DEFINE FIELD email
    ON user
    TYPE string
    VALUE string::lowercase($value);

DEFINE FIELD password
    ON user
    TYPE string
    PERMISSIONS
        FOR select NONE;

DEFINE FIELD createdAt
    ON user
    VALUE $before OR time::now()
    DEFAULT time::now();

DEFINE FIELD updatedAt
    ON user
    VALUE time::now()
    DEFAULT time::now();
