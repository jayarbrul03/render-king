CREATE TABLE `client_emails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`email` varchar(320) NOT NULL,
	`company` varchar(128),
	`active` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `client_emails_id` PRIMARY KEY(`id`),
	CONSTRAINT `client_emails_email_unique` UNIQUE(`email`)
);
