/*
  Warnings:

  - You are about to drop the column `email` on the `Schedules` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_Schedules" ("date", "id", "name", "phone") SELECT "date", "id", "name", "phone" FROM "Schedules";
DROP TABLE "Schedules";
ALTER TABLE "new_Schedules" RENAME TO "Schedules";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
