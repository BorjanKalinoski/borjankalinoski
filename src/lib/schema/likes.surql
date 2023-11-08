DEFINE TABLE likes SCHEMAFULL
    PERMISSIONS
        FOR create WHERE $scope = 'user'
        FOR select FULL
        FOR delete WHERE in = $auth.id
        FOR update NONE;

DEFINE FIELD in
    ON likes
    TYPE record<user>;

DEFINE FIELD out
    ON likes
    TYPE record<blog>;

DEFINE FIELD createdAt
    ON likes
    VALUE $before OR time::now()
    DEFAULT time::now();

DEFINE INDEX userBlogLikesIndex
    ON likes
    FIELDS in, out
    UNIQUE;
