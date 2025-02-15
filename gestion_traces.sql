-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 15 fév. 2025 à 21:07
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_traces`
--

-- --------------------------------------------------------

--
-- Structure de la table `logs`
--

CREATE TABLE `logs` (
  `logId` int(11) NOT NULL,
  `matricule` int(11) NOT NULL,
  `log` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `logs`
--

INSERT INTO `logs` (`logId`, `matricule`, `log`, `date`) VALUES
(114, 1234567, 'Utilisateur connecté', '2025-02-15 20:05:49'),
(115, 1234567, 'Telechargement de fichier Excel des traces ', '2025-02-15 20:06:03'),
(116, 1234567, ' Consultation des traces ', '2025-02-15 20:06:13'),
(117, 1234567, ' Telechargement du fichier text de la trace d\'id 50', '2025-02-15 20:06:19'),
(118, 1234567, 'Utilisateur déconnecté', '2025-02-15 20:06:22'),
(119, 12345678, 'Utilisateur connecté', '2025-02-15 20:06:57'),
(120, 12345678, 'suppression de l\'utilisateur d\'id 22', '2025-02-15 20:07:08'),
(121, 12345678, 'modification de l\'utilisateur d\'id 23', '2025-02-15 20:07:22');

-- --------------------------------------------------------

--
-- Structure de la table `tabletraces`
--

CREATE TABLE `tabletraces` (
  `id` int(11) NOT NULL,
  `numserie` varchar(255) NOT NULL,
  `operation` varchar(100) NOT NULL,
  `trace` varchar(400) NOT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tabletraces`
--

INSERT INTO `tabletraces` (`id`, `numserie`, `operation`, `trace`, `date_debut`, `date_fin`) VALUES
(50, '6150906309', 'TEST_COSMETIQUE', 'debut test \nconfiguration BDT\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagRetraitHdd\nconf_DEC_BFP_bFlagConfProvisionningCNL\nconf_DEC_BFP_bFlagSsdVerifFormatagedebut test \n\nFin Test', '2024-03-10 10:00:00', '2024-03-10 10:10:00'),
(51, '6150906309', 'TEST_VISION', 'debut test \nconfiguration BSY\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagSsdVerifFormatage\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nFin Test', '2024-03-11 10:00:00', '2024-03-11 10:10:00'),
(52, '6150906309', 'TEST_WIFI_CONDUIT', 'debut test \nconfiguration GAT\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagRetraitHdd\nconf_DEC_BFP_bFlagConfProvisionningCNL\nconf_DEC_BFP_bFlagSsdVerifFormatagedebut test \nFin Test', '2024-03-12 10:00:00', '2024-03-12 10:10:00'),
(53, '6.154001483E+10', 'TEST_POKA_YOKE', 'debut test \nconfiguration BDT\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagRetraitHdd\nconf_DEC_BFP_bFlagConfProvisionningCNL\nconf_DEC_BFP_bFlagSsdVerifFormatagedebut test \n\nFin Test', '2024-03-13 10:00:00', '2024-03-13 10:10:00'),
(54, '6.154001476E+10', 'TEST_BAV', 'debut test \nconfiguration GAT\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagRetraitHdd\nconf_DEC_BFP_bFlagConfProvisionningCNL\nconf_DEC_BFP_bFlagSsdVerifFormatagedebut test \nFin Test', '2024-03-14 10:00:00', '2024-03-14 10:10:00'),
(55, '6150906301', 'TEST_COSMETIQUE', 'debut test \nconfiguration BDT\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagRetraitHdd\nconf_DEC_BFP_bFlagConfProvisionningCNL\nconf_DEC_BFP_bFlagSsdVerifFormatagedebut test \n\nFin Test', '2024-03-10 10:00:00', '2024-03-10 10:10:00'),
(56, '6150906302', 'TEST_COSMETIQUE', 'debut test \nconfiguration BDT\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagRetraitHdd\nconf_DEC_BFP_bFlagConfProvisionningCNL\nconf_DEC_BFP_bFlagSsdVerifFormatagedebut test \n\nFin Test', '2024-03-10 10:00:00', '2024-03-10 10:10:00'),
(57, '6150906303', 'TEST_VISION', 'debut test \nconfiguration BSY\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagSsdVerifFormatage\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nFin Test', '2024-03-11 10:00:00', '2024-03-11 10:10:00'),
(58, '6150906304', 'TEST_VISION', 'debut test \nconfiguration BSY\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagSsdVerifFormatage\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nFin Test', '2024-03-11 10:00:00', '2024-03-11 10:10:00'),
(59, '6150906305', 'TEST_VISION', 'debut test \nconfiguration BSY\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagSsdVerifFormatage\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nFin Test', '2024-03-11 10:00:00', '2024-03-11 10:10:00'),
(60, '6150906306', 'TEST_VISION', 'debut test \nconfiguration BSY\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagSsdVerifFormatage\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nFin Test', '2024-03-11 10:00:00', '2024-03-11 10:10:00'),
(61, '6150906307', 'TEST_VISION', 'debut test \nconfiguration BSY\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagSsdVerifFormatage\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nFin Test', '2024-03-11 10:00:00', '2024-03-11 10:10:00'),
(62, '6150906308', 'TEST_VISION', 'debut test \nconfiguration BSY\nconf_DEC_BFP_bFlagPasVerifAbsenceSmrtCrd\nconf_DEC_BFP_bFlagSsdVerifFormatage\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nconf_DEC_BFP_bFlagPasVerifierLockFlash\nFin Test', '2024-03-11 10:00:00', '2024-03-11 10:10:00');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `matricule` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `matricule`, `password`, `role`, `type`) VALUES
(21, 'exemple1', 'exemple1@gmail.com', 12345678, 'exemple1', 'Deveingénieur développement web', 'admin'),
(23, 'exemple2', 'exemple22@gmail.com', 1234567, 'exemple2', 'ingénieur développement web', 'testeur');

-- --------------------------------------------------------

--
-- Structure de la table `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`logId`);

--
-- Index pour la table `tabletraces`
--
ALTER TABLE `tabletraces`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD UNIQUE KEY `unique_mat` (`matricule`);

--
-- Index pour la table `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `logs`
--
ALTER TABLE `logs`
  MODIFY `logId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT pour la table `tabletraces`
--
ALTER TABLE `tabletraces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
