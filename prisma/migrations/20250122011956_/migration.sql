/*
  Warnings:

  - You are about to drop the column `home` on the `Order` table. All the data in the column will be lost.
  - Added the required column `code` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "home",
ADD COLUMN     "code" TEXT NOT NULL;
