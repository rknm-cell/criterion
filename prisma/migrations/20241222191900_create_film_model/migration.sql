/*
  Warnings:

  - Added the required column `director` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Film" ADD COLUMN     "director" TEXT NOT NULL;
