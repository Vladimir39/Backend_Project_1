/*
  Warnings:

  - Added the required column `home` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "entrance" TEXT,
ADD COLUMN     "flat" TEXT,
ADD COLUMN     "floor" TEXT,
ADD COLUMN     "home" TEXT NOT NULL;
