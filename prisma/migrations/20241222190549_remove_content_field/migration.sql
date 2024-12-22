/*
  Warnings:

  - You are about to drop the column `content` on the `Film` table. All the data in the column will be lost.
  - Added the required column `description` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Film" DROP COLUMN "content",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
