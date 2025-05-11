-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "addressHome" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "flat" TEXT NOT NULL,
    "entrance" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "cartId" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
