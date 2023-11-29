DEFINE TABLE blog SCHEMAFULL
    PERMISSIONS
        FOR create WHERE $scope = 'user'
        FOR select FULL
        FOR update WHERE creator = $auth.id
        FOR delete WHERE creator = $auth.id;

DEFINE FIELD title
    ON blog
    TYPE string
    ASSERT string::len($value) > 0;


DEFINE FIELD content
    ON blog
    TYPE string
    ASSERT string::len($value) > 0;

DEFINE FIELD thumbnailImageDownloadUrl
    ON blog
    TYPE string
    ASSERT string::len($value) > 0;

DEFINE FIELD creator
    ON blog
    TYPE record<user>
    DEFAULT $auth.id;

DEFINE FIELD wordCount
    ON blog
    TYPE number
    DEFAULT 0;

DEFINE FIELD createdAt
    ON blog
    VALUE $before OR time::now()
    DEFAULT time::now();

DEFINE FIELD updatedAt
    ON blog
    VALUE time::now()
    DEFAULT time::now();
