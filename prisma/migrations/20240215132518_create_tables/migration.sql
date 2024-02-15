/*
  Warnings:

  - Added the required column `user_id` to the `Schedules` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedules" ("date", "id", "name", "phone") SELECT "date", "id", "name", "phone" FROM "Schedules";
DROP TABLE "Schedules";
ALTER TABLE "new_Schedules" RENAME TO "Schedules";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
