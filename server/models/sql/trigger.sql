delimiter $$
create trigger createPayment
after insert on USER_PAYMENT
for each row
    BEGIN
        SET @pString = LEFT(CONCAT(NEW.code), 3);
        SET @p = CONVERT(@pString, unsigned); 
        INSERT INTO CODETABLE(code, title, parent) VALUES(NEW.code, NEW.title, @p); 
    END
$$