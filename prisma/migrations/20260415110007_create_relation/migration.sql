/*
  Warnings:

  - A unique constraint covering the columns `[account_id]` on the table `Shelter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_id` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shelter" ADD COLUMN     "account_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "account_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shelter_account_id_key" ON "Shelter"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_account_id_key" ON "User"("account_id");

-- AddForeignKey
ALTER TABLE "Shelter" ADD CONSTRAINT "Shelter_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
