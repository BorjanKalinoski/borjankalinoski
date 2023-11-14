DEFINE TABLE blogTag SCHEMAFULL
    PERMISSIONS
        FOR create WHERE $scope = 'user'
        FOR select FULL
        FOR update WHERE in.creator = $auth.id
        FOR delete WHERE in.creator = $auth.id;

DEFINE FIELD in
    ON blogTag
    TYPE record<blog>;

DEFINE FIELD out
    ON blogTag
    TYPE record<tag>;

DEFINE FIELD createdAt
    ON blogTag
    VALUE $before OR time::now()
    DEFAULT time::now();

DEFINE FIELD updatedAt
    ON blogTag
    VALUE time::now()
    DEFAULT time::now();

DEFINE INDEX blogTagIndex
    ON blogTag
    FIELDS in, out
    UNIQUE;
