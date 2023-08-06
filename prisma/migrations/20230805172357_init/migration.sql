/*
  Warnings:

  - You are about to alter the column `kategori_id` on the `barang` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `kategori` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `kategori` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `barang` DROP FOREIGN KEY `barang_kategori_id_fkey`;

-- AlterTable
ALTER TABLE `barang` MODIFY `kategori_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `kategori` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `barang` ADD CONSTRAINT `barang_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
