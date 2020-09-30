ALTER TABLE account.CODE DISABLE KEYS;
LOAD DATA local INFILE "/Users/byeol/membership/javascript-w5-accountbook/server/models/code.csv"
INTO TABLE account.CODE FIELDS TERMINATED BY ",";
ALTER TABLE account.CODE ENABLE KEYS;