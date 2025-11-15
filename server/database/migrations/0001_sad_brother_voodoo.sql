CREATE TABLE `albums` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`images` text DEFAULT (json_array()) NOT NULL,
	`date` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `albums_slug_unique` ON `albums` (`slug`);