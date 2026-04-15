/*
  Warnings:

  - A unique constraint covering the columns `[id_location]` on the table `Shelter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_location` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storage` to the `Shelter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('REPORTED', 'REVIEWING', 'SHELTERED', 'REUNITED');

-- AlterTable
ALTER TABLE "Shelter" ADD COLUMN     "id_location" TEXT NOT NULL,
ADD COLUMN     "license" TEXT NOT NULL,
ADD COLUMN     "storage" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "province" TEXT NOT NULL DEFAULT 'Luanda',
    "municipality" TEXT NOT NULL DEFAULT 'Kilamba Kiaxi',
    "neighboor" TEXT NOT NULL DEFAULT 'Palanca',
    "reference" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kid" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "nickname" TEXT NOT NULL,
    "birth_day" TIMESTAMP(3),
    "photo" TEXT,
    "note" TEXT,
    "id_shelter" TEXT NOT NULL,
    "last_location" TEXT NOT NULL,
    "gender" "Gender",
    "is_alone" BOOLEAN,
    "status" "CaseStatus" NOT NULL DEFAULT 'REPORTED',
    "aproximate_age" INTEGER,
    "rescued_day" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "id_account" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shelter_id_location_key" ON "Shelter"("id_location");

-- AddForeignKey
ALTER TABLE "Shelter" ADD CONSTRAINT "Shelter_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kid" ADD CONSTRAINT "Kid_id_shelter_fkey" FOREIGN KEY ("id_shelter") REFERENCES "Shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kid" ADD CONSTRAINT "Kid_last_location_fkey" FOREIGN KEY ("last_location") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
