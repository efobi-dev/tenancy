/*
  Warnings:

  - You are about to drop the column `accountName` on the `Landlord` table. All the data in the column will be lost.
  - You are about to drop the column `accountNumber` on the `Landlord` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `Landlord` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Landlord" DROP COLUMN "accountName",
DROP COLUMN "accountNumber",
DROP COLUMN "bankName";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "picture",
ADD COLUMN     "accountName" TEXT,
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "bankName" TEXT;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "propertyId" TEXT,
    "unitId" TEXT,
    "leaseId" TEXT,
    "maintenanceJobId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Image_propertyId_idx" ON "Image"("propertyId");

-- CreateIndex
CREATE INDEX "Image_unitId_idx" ON "Image"("unitId");

-- CreateIndex
CREATE INDEX "Image_leaseId_idx" ON "Image"("leaseId");

-- CreateIndex
CREATE INDEX "Image_maintenanceJobId_idx" ON "Image"("maintenanceJobId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "Lease"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_maintenanceJobId_fkey" FOREIGN KEY ("maintenanceJobId") REFERENCES "MaintenanceJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;
