DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `nom` varchar(64) NOT NULL,
  `prenom` varchar(64) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(64) NOT NULL,
   PRIMARY KEY `unique_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
DROP TABLE IF EXISTS `objet`;
CREATE TABLE IF NOT EXISTS `objet` (
  `IdObjet` int NOT NULL AUTO_INCREMENT,
  `Price` int NOT NULL,
  `Description` int NOT NULL,
  PRIMARY KEY (`IdObjet`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
-- --------------------------------------------------------