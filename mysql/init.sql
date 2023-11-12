DROP DATABASE IF EXISTS springforumsimple;
CREATE DATABASE IF NOT EXISTS springforumsimple;
use springforumsimple;

CREATE TABLE IF NOT EXISTS `post` (
    `id` varchar(36) NOT NULL,
    `title` varchar(255),
    `content` TEXT,
    `created` DATETIME,
    `updated` DATETIME,
    PRIMARY KEY (`id`)
);


INSERT INTO post(`id`, `title`, `content`, `created`, `updated`) values
  ( '12345678', 'test', 'test content', NOW(), NOW());
