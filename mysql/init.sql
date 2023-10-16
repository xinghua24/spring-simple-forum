CREATE TABLE `post` (
    `id` varchar(36) NOT NULL,
    `title` varchar(255),
    `content` TEXT,
    `created` DATETIME,
    `updated` DATETIME,
    PRIMARY KEY (`id`)
);
