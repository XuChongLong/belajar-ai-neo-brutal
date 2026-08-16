CREATE TABLE `learningProgress` (
	`userId` int NOT NULL,
	`snapshot` json NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learningProgress_userId` PRIMARY KEY(`userId`)
);
--> statement-breakpoint
ALTER TABLE `learningProgress` ADD CONSTRAINT `learningProgress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `learningProgress_updated_idx` ON `learningProgress` (`updatedAt`);