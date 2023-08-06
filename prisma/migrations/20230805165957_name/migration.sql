/*
  Warnings:

  - Added the required column `kategori_id` to the `barang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barang` ADD COLUMN `kategori_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `kategori` (
    `id` VARCHAR(191) NOT NULL,
    `nama_kategori` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `barang` ADD CONSTRAINT `barang_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
