-- DropForeignKey
ALTER TABLE "Kid" DROP CONSTRAINT "Kid_id_shelter_fkey";

-- AlterTable
ALTER TABLE "Kid" ALTER COLUMN "id_shelter" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Kid" ADD CONSTRAINT "Kid_id_shelter_fkey" FOREIGN KEY ("id_shelter") REFERENCES "Shelter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
