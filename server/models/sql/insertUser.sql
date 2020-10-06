ALTER TABLE account.USER DISABLE KEYS;
LOAD DATA local INFILE "/Users/byeol/membership/javascript-w5-accountbook/server/models/user.csv"
INTO TABLE account.USER FIELDS TERMINATED BY ",";
ALTER TABLE account.USER ENABLE KEYS;