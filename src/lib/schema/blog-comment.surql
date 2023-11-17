DEFINE TABLE blogComment SCHEMAFULL
    PERMISSIONS
        FOR create WHERE $scope = 'user'
        FOR select FULL
        FOR delete WHERE in = $auth.id
        FOR update WHERE in = $auth.id;

DEFINE FIELD in
    ON blogComment
    TYPE record<user>;

DEFINE FIELD out
    ON blogComment
    TYPE record<blog>;

DEFINE FIELD createdAt
    ON blogComment
    VALUE $before OR time::now()
    DEFAULT time::now();

DEFINE FIELD updatedAt
    ON blogComment
    VALUE time::now()
    DEFAULT time::now();

DEFINE FIELD replies
    ON blogComment
    TYPE array
    DEFAULT [];

DEFINE FIELD replies.*
    ON blogComment
    TYPE record<blogComment>;

DEFINE FIELD comment
    ON blogComment
    TYPE string
    ASSERT string::len($value) > 0;
