/*
  Warnings:

  - You are about to drop the column `estimated_duration` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `lengthMiles` on the `courses` table. All the data in the column will be lost.
  - Added the required column `length_miles` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" RENAME COLUMN "estimated_duration" TO "estimated_duration_miles";
ALTER TABLE "courses" RENAME COLUMN "lengthMiles" to "length_miles";
