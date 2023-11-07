DEFINE TABLE blogTag SCHEMAFULL
    PERMISSIONS
        FOR create WHERE $scope = 'user'
        FOR select FULL
        FOR update WHERE userId = $auth.id
        FOR delete WHERE userId = $auth.id;

DEFINE FIELD userId ON blogTag TYPE record<user> DEFAULT $auth.id;
DEFINE FIELD tagId ON blogTag TYPE record<tag>;
DEFINE FIELD blogId on blogTag TYPE record<blog>;

DEFINE FIELD createdAt ON blogTag VALUE $before OR time::now() DEFAULT time::now();
DEFINE FIELD updatedAt ON blogTag VALUE time::now() DEFAULT time::now();



DEFINE INDEX blogTagIndex ON blogTag FIELDS blogId, tagId UNIQUE;
