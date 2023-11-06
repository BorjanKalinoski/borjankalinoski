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
