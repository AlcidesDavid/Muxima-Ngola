/*
  Warnings:

  - Added the required column `add_by` to the `Kid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kid" ADD COLUMN     "add_by" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Kid" ADD CONSTRAINT "Kid_add_by_fkey" FOREIGN KEY ("add_by") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
