DEFINE TABLE tag SCHEMAFULL
    PERMISSIONS
        FOR create WHERE $scope = 'user'
        FOR select WHERE $scope = 'user'
        FOR update NONE
        FOR delete NONE;


DEFINE FIELD name ON tag TYPE string ASSERT string::len($value) > 0;
DEFINE FIELD createdAt ON tag VALUE $before OR time::now() DEFAULT time::now();
DEFINE FIELD updatedAt ON tag VALUE time::now() DEFAULT time::now();
// add on delete cascade
