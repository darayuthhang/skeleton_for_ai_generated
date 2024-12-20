-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('FIRST_DAY_PASS', 'SECOND_DAY_PASS', 'THIRSTY_DAY_PASS', 'ONE_YEAR_DAY_PASS', 'NO_PASS');

-- AlterTable
ALTER TABLE "OneTimePayment" ADD COLUMN     "payment_type" "PaymentType" DEFAULT 'NO_PASS';
