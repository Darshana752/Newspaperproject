-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2026 at 05:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `serendibproject2`
--

-- --------------------------------------------------------

--
-- Table structure for table `editor`
--

CREATE TABLE `editor` (
  `editor_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `editor`
--

INSERT INTO `editor` (`editor_id`, `name`, `nic`, `email`, `password`) VALUES
(1, 'Malith', '20025730215', 'malithbotheju9@gmail.com', '$2a$10$LV0bc0lNlTsZxxQp6qJi1.vh.yOhEjawj9m6WerLWuignt8T40yty'),
(3, 'Malith Darshana', '200012345678', 'malithdarshana2000@gmail.com', '$2a$10$r8YmM0MlmtDLT.YoAdyMMuLeJvMO4VPSMXJIS5OuSZ9.ZfECogd7m');

-- --------------------------------------------------------

--
-- Table structure for table `foreign_news`
--

CREATE TABLE `foreign_news` (
  `foreign_id` bigint(20) NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `news_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `local_news`
--

CREATE TABLE `local_news` (
  `local_id` bigint(20) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `news_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `local_news`
--

INSERT INTO `local_news` (`local_id`, `category`, `news_id`) VALUES
(12, 'POLITICS', 15);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `news_id` bigint(20) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `description` mediumtext DEFAULT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `news_type` enum('LOCAL','FOREIGN','SPORTS') NOT NULL,
  `editor_id` bigint(20) DEFAULT NULL,
  `writer_id` bigint(20) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `status` enum('APPROVED','PENDING','REJECTED') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`news_id`, `topic`, `description`, `date`, `time`, `news_type`, `editor_id`, `writer_id`, `file_name`, `file_type`, `file_path`, `status`) VALUES
(15, 'GMOA STRIKE UPDATE', 'The Government Medical Officers’ Association (GMOA) has officially ended its strike action, restoring normal operations across public hospitals. Patients can now access regular medical services as discussions between authorities and medical professionals reach a resolution.', '2026-04-11', '18:36:38', 'LOCAL', NULL, 2, 'Untitled-1.png', 'image/png', 'uploads\\591baf0a-d420-4d7f-92c8-e19f16ba0212_Untitled-1.png', 'APPROVED');

-- --------------------------------------------------------

--
-- Table structure for table `reader`
--

CREATE TABLE `reader` (
  `reader_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reader`
--

INSERT INTO `reader` (`reader_id`, `name`, `email`, `password`) VALUES
(1, 'John Doe', 'john@gmail.com', '$2a$10$uNNKeLn60r2LeeyjUDBaree6G3iFUE95hXQGQ1wltnAiGvyHDMTCy'),
(2, 'Malith', 'malithbotheju9@gmail.com', '$2a$10$g1hkon3MuuvT3jM3/XNBPerlFQUtcerjfWBwwQAMqwoP3O5ckn/6G'),
(3, 'sarath', 'malithdffff@gmail.com', '$2a$10$tXzkzqOagbfQmXOsQR.NOudm5bBJbcmP6e0oFZdYZziaTVU7l.jha'),
(4, 'sadaru', 'sada@gmail.com', '$2a$10$yBFwosdLxYHRa10HVPVEGO0hPQ6cI.zrzbcEHIhwIXcAH7CScef9y');

-- --------------------------------------------------------

--
-- Table structure for table `reader_comment`
--

CREATE TABLE `reader_comment` (
  `id` bigint(20) NOT NULL,
  `reader_id` bigint(20) NOT NULL,
  `news_id` bigint(20) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `commented_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reader_comment`
--

INSERT INTO `reader_comment` (`id`, `reader_id`, `news_id`, `comment`, `commented_at`) VALUES
(2, 4, 15, 'good news', '2026-04-11 13:09:17');

-- --------------------------------------------------------

--
-- Table structure for table `sports_news`
--

CREATE TABLE `sports_news` (
  `sports_id` bigint(20) NOT NULL,
  `sport` varchar(255) DEFAULT NULL,
  `news_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `writer`
--

CREATE TABLE `writer` (
  `writer_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `writer`
--

INSERT INTO `writer` (`writer_id`, `name`, `nic`, `email`, `password`) VALUES
(1, 'Darshana', '200256945', 'malith@gmail.com', '$2a$10$8S.hQJdXLC1k3iLMW716humiNfVOtUWJWc7mL1u1Mi.3Uzm2cgjvS'),
(2, 'Malith bothe', '2022568965', 'malith9@gmail.com', '$2a$10$bUA9fJO2/mjVEo/SLzZoAetf.Gmk0hCcYdNMKbsHjBxES.YBxPIn2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `editor`
--
ALTER TABLE `editor`
  ADD PRIMARY KEY (`editor_id`),
  ADD UNIQUE KEY `nic` (`nic`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `foreign_news`
--
ALTER TABLE `foreign_news`
  ADD PRIMARY KEY (`foreign_id`),
  ADD UNIQUE KEY `news_id` (`news_id`);

--
-- Indexes for table `local_news`
--
ALTER TABLE `local_news`
  ADD PRIMARY KEY (`local_id`),
  ADD UNIQUE KEY `news_id` (`news_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`),
  ADD KEY `editor_id` (`editor_id`),
  ADD KEY `writer_id` (`writer_id`);

--
-- Indexes for table `reader`
--
ALTER TABLE `reader`
  ADD PRIMARY KEY (`reader_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `reader_comment`
--
ALTER TABLE `reader_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reader_id` (`reader_id`),
  ADD KEY `news_id` (`news_id`);

--
-- Indexes for table `sports_news`
--
ALTER TABLE `sports_news`
  ADD PRIMARY KEY (`sports_id`),
  ADD UNIQUE KEY `news_id` (`news_id`);

--
-- Indexes for table `writer`
--
ALTER TABLE `writer`
  ADD PRIMARY KEY (`writer_id`),
  ADD UNIQUE KEY `nic` (`nic`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `editor`
--
ALTER TABLE `editor`
  MODIFY `editor_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `foreign_news`
--
ALTER TABLE `foreign_news`
  MODIFY `foreign_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `local_news`
--
ALTER TABLE `local_news`
  MODIFY `local_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `news_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `reader`
--
ALTER TABLE `reader`
  MODIFY `reader_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reader_comment`
--
ALTER TABLE `reader_comment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sports_news`
--
ALTER TABLE `sports_news`
  MODIFY `sports_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `writer`
--
ALTER TABLE `writer`
  MODIFY `writer_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `foreign_news`
--
ALTER TABLE `foreign_news`
  ADD CONSTRAINT `foreign_news_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`news_id`) ON DELETE CASCADE;

--
-- Constraints for table `local_news`
--
ALTER TABLE `local_news`
  ADD CONSTRAINT `local_news_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`news_id`) ON DELETE CASCADE;

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`editor_id`) REFERENCES `editor` (`editor_id`),
  ADD CONSTRAINT `news_ibfk_2` FOREIGN KEY (`writer_id`) REFERENCES `writer` (`writer_id`);

--
-- Constraints for table `reader_comment`
--
ALTER TABLE `reader_comment`
  ADD CONSTRAINT `reader_comment_ibfk_1` FOREIGN KEY (`reader_id`) REFERENCES `reader` (`reader_id`),
  ADD CONSTRAINT `reader_comment_ibfk_2` FOREIGN KEY (`news_id`) REFERENCES `news` (`news_id`);

--
-- Constraints for table `sports_news`
--
ALTER TABLE `sports_news`
  ADD CONSTRAINT `sports_news_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`news_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
