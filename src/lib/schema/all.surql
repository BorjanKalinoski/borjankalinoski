DEFINE TABLE user SCHEMAFULL
    PERMISSIONS
        FOR create FULL
        FOR select FULL
        FOR update WHERE id=$auth.id
        FOR delete WHERE id=$auth.id;

DEFINE FIELD email ON user TYPE string VALUE string::lowercase($value);
DEFINE FIELD password ON user TYPE string PERMISSIONS FOR select NONE;

DEFINE FIELD createdAt ON user VALUE $before OR time::now() DEFAULT time::now();
DEFINE FIELD updatedAt ON user VALUE time::now() DEFAULT time::now();


DEFINE TABLE blog SCHEMAFULL
    PERMISSIONS
        FOR create WHERE $scope = 'user'
        FOR select FULL
        FOR update WHERE userId=$auth.id
        FOR delete WHERE userId=$auth.id;

DEFINE FIELD title ON blog TYPE string ASSERT string::len($value) > 0;
DEFINE FIELD content ON blog TYPE string ASSERT string::len($value) > 0;
DEFINE FIELD thumbnailImageDownloadUrl ON blog TYPE string ASSERT string::len($value) > 0;

DEFINE FIELD userId ON blog TYPE record<user> DEFAULT $auth.id;

DEFINE FIELD createdAt ON blog VALUE $before OR time::now() DEFAULT time::now();
DEFINE FIELD updatedAt ON blog VALUE time::now() DEFAULT time::now();

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


DEFINE TABLE likes SCHEMAFULL
 PERMISSIONS
    FOR create FULL
    FOR select FULL
    FOR delete WHERE userId=$auth.id
    FOR update NONE;

DEFINE FIELD userId ON likes TYPE record<user> DEFAULT $auth.id;
DEFINE FIELD blogId on likes TYPE record<blog>;

DEFINE INDEX likesBlogIdIndex ON likes FIELDS blogId;
DEFINE INDEX likesUserIdBlogIdIndex ON likes FIELDS blogId, userId UNIQUE;

