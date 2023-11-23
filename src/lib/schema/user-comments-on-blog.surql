DEFINE TABLE user_comments_on_blog SCHEMAFULL
    PERMISSIONS
        FOR create WHERE $scope = 'user'
        FOR select FULL
        FOR delete WHERE in = $auth.id
        FOR update WHERE in = $auth.id;

DEFINE FIELD in
    ON user_comments_on_blog
    TYPE record<user>;

DEFINE FIELD out
    ON user_comments_on_blog
    TYPE record<blog>;

DEFINE FIELD createdAt
    ON user_comments_on_blog
    VALUE $before OR time::now()
    DEFAULT time::now();

DEFINE FIELD updatedAt
    ON user_comments_on_blog
    VALUE time::now()
    DEFAULT time::now();

DEFINE FIELD content
    ON user_comments_on_blog
    TYPE string
    ASSERT string::len($value) > 0;
