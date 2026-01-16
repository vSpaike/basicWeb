-- MySQL initialization SQL for db_auth

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `nom` VARCHAR(64) NOT NULL,
  `prenom` VARCHAR(64) NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `objets`;
CREATE TABLE IF NOT EXISTS `objets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `objet` VARCHAR(255) NOT NULL,
  `prix` DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Example data
INSERT INTO `objets` (`objet`, `prix`) VALUES ('apple', 10.00);
