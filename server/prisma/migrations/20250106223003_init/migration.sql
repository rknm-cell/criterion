/*
  Warnings:

  - You are about to drop the column `name` on the `Film` table. All the data in the column will be lost.
  - Added the required column `description` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Film" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
