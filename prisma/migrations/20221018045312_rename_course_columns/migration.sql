/*
  Warnings:

  - You are about to drop the column `length` on the `courses` table. All the data in the column will be lost.
  - Added the required column `lengthMiles` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" RENAME COLUMN "length" to "lengthMiles";
