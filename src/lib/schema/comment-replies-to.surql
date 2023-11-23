DEFINE TABLE comment_replies_to
    PERMISSIONS
        FOR create WHERE $scope = 'user'
        FOR select FULL
        FOR delete WHERE $auth.id = in.in
        FOR update WHERE $auth.id = in.in;

DEFINE FIELD in
    ON comment_replies_to
    TYPE record<user_comments_on_blog>;

DEFINE FIELD out
    ON comment_replies_to
    TYPE record<user_comments_on_blog>;
