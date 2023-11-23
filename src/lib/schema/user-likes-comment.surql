DEFINE TABLE user_likes_comment SCHEMAFULL
    PERMISSIONS
        FOR create WHERE $scope = 'user'
        FOR select FULL
        FOR delete WHERE in = $auth.id
        FOR update WHERE in = $auth.id;

DEFINE FIELD in
    ON user_likes_comment
    TYPE record<user>;

DEFINE FIELD out
    ON user_likes_comment
    TYPE record<user_comments_on_blog>;

DEFINE FIELD createdAt
    ON user_likes_comment
    VALUE $before OR time::now()
    DEFAULT time::now();

DEFINE FIELD updatedAt
    ON user_likes_comment
    VALUE time::now()
    DEFAULT time::now();

DEFINE INDEX user_likes_comment_index
    ON user_likes_comment
    FIELDS in, out
    UNIQUE;
