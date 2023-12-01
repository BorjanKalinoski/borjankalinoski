DEFINE TABLE user SCHEMAFULL
    PERMISSIONS
        FOR create FULL
        FOR select FULL
        FOR update WHERE id = $auth.id
        FOR delete WHERE id = $auth.id;

DEFINE FIELD email
    ON user
    TYPE string
    VALUE string::lowercase(string::trim($value))
    ASSERT string::is::email($value);

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

DEFINE FIELD role
    ON user
    TYPE record<user_role>
    DEFAULT ((SELECT id FROM ONLY user_role WHERE role_type = "user").id);

DEFINE INDEX user_email_index
    ON user
    FIELDS email
    UNIQUE;
