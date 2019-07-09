use gql_hospital;

DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;

CREATE TABLE `gql_hospital`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  INDEX `value` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE users (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL DEFAULT '',
    `surname` VARCHAR(50) NOT NULL DEFAULT '',
    `password` VARCHAR(100) NOT NULL DEFAULT '',
    `role` INT NOT NULL,
    `token` VARCHAR(200) NOT NULL DEFAULT '',
    `lastLoginAt` DATETIME,
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `enabled` BOOLEAN NOT NULL DEFAULT 1
    CONSTRAINT users_PK PRIMARY KEY (id),
    CONSTRAINT role_FK FOREIGN KEY (`role`) REFERENCES roles(`value`) ON UPDATE CASCADE
)
ENGINE=INNODB;
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE `gql_hospital`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `surname` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` INT NOT NULL,
  `token` VARCHAR(200) NOT NULL,
  `lastLoginAt` DATETIME NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_role_idx` (`role` ASC),
  CONSTRAINT `fk_role`
    FOREIGN KEY (`role`)
    REFERENCES `gql_hospital`.`roles` (`value`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);


INSERT INTO roles (`name`, `value`) VALUES ("sysadmin", 39);
INSERT INTO roles (`name`, `value`) VALUES ("doctor", 29);
INSERT INTO roles (`name`, `value`) VALUES ("nurse", 19);
INSERT INTO roles (`name`, `value`) VALUES ("patient", 9);

INSERT INTO users (
    `name`,
    `surname`,
    `username`,
    `password`,
    `role`
) VALUES (
    "Dailos",
    "Díaz",
    "ddialar",
    "$2a$04$up0a0W22m1HBjECz33PVZekXM9lGsWu1/jmyhePkF04wFsaVD5QmS",
    29
);

