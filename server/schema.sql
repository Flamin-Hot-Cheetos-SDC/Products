DROP DATABASE products;
CREATE DATABASE products;

USE products;

CREATE TABLE productInfo (
    id INT NOT NULL,
    slogan varchar(200),
    description varchar(200),
    category varchar(20),
    default_price int,
    PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE features (
    id INT,
    feature varchar(15),
    value varchar(15),
    parent_id INT,
    INDEX par_ind (parent_id),
    FOREIGN KEY (parent_id)
        REFERENCES productInfo(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE relatedProducts (
    id INT,
    parent_id INT,
    related TEXT,
    INDEX par_ind (parent_id),
    FOREIGN KEY (parent_id)
        REFERENCES productInfo(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE styles (
    id INT,
    parent_id INT,
    styleId INT,
    name TEXT,
    price INT,
    sale_price INT,
    defaultName BOOLEAN,
    INDEX par_ind (parent_id),
    FOREIGN KEY (parent_id)
        REFERENCES productInfo(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE skus (
    styleId INT,
    skuNumber INT,
    quanity INT,
    size INT
) ENGINE=INNODB;

CREATE TABLE photos (
    styleId INT,
    thumbnailUrl VARCHAR(30),
    url VARCHAR(30)
) ENGINE=INNODB;


/* Execute this file from the command line by typing: mysql -u root < server/schema.sql mysql -u root
*/

