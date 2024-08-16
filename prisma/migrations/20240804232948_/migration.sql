/*
  Warnings:

  - You are about to drop the column `user_id` on the `Cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_user_id_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "quantity" SET DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
