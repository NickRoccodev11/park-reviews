/*
  Warnings:

  - Added the required column `image` to the `Park` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Park" ADD COLUMN     "image" TEXT NOT NULL;
