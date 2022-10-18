-- CreateEnum
CREATE TYPE "Rounding" AS ENUM ('starboard', 'port');

-- CreateEnum
CREATE TYPE "MarkType" AS ENUM ('offset', 'buoy');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vessels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "vessels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "estimated_duration" DOUBLE PRECISION,
    "is_public" BOOLEAN NOT NULL,
    "created_by_id" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waypoints" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "rounding" "Rounding" NOT NULL,
    "markType" "MarkType" NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "waypoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "racers" (
    "id" TEXT NOT NULL,
    "race_id" TEXT NOT NULL,
    "racer_id" TEXT NOT NULL,

    CONSTRAINT "racers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "races" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "races_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "vessels" ADD CONSTRAINT "vessels_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "waypoints" ADD CONSTRAINT "waypoints_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "racers" ADD CONSTRAINT "racers_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "races"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "racers" ADD CONSTRAINT "racers_racer_id_fkey" FOREIGN KEY ("racer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "races" ADD CONSTRAINT "races_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
