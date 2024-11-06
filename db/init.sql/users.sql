DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `githublink` varchar(250) DEFAULT NULL,
  `apikey` varchar(40) NOT NULL,
  `roles` json DEFAULT NULL,
  `activated` tinyint(1) NOT NULL DEFAULT '0',
  `otp_enable` boolean DEFAULT false,
  `otp_secret` varchar(40) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `users` ( `username`, `email`, `password`, `githublink`, `apikey`, `roles`, `activated`, `otp_secret`	) VALUES
('Admin', 'admin@devsocialnetwork.com', '$2b$10$SOm3kYv4SPbR0YWVUdy48rL6zG7u9FY5fdnDf8JWSfH/75IJjT95O', '', 'ZQLY3AI-YHTE2QI-QZ6IBUA-VGR2NYA', '[\"ADMIN\"]','1', 'IFGHG3Q4GVBDU5Z6');
COMMIT;
