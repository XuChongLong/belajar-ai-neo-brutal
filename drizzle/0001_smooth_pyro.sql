CREATE TABLE `publicPetProfiles` (
	`userId` int NOT NULL,
	`isPublic` int NOT NULL DEFAULT 0,
	`petId` varchar(16) NOT NULL,
	`xp` int NOT NULL DEFAULT 0,
	`stage` varchar(16) NOT NULL,
	`equippedAccessory` varchar(64),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `publicPetProfiles_userId` PRIMARY KEY(`userId`)
);
--> statement-breakpoint
ALTER TABLE `publicPetProfiles` ADD CONSTRAINT `publicPetProfiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `publicPetProfiles_public_xp_idx` ON `publicPetProfiles` (`isPublic`,`xp`);