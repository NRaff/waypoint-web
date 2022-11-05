/*
  Warnings:

  - A unique constraint covering the columns `[authentication_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authentication_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- TRUNCATE "vessels";
-- TRUNCATE "waypoints";
-- TRUNCATE "courses";
TRUNCATE "users" CASCADE;
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "authentication_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_authentication_id_key" ON "users"("authentication_id");
