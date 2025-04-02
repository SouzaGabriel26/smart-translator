-- CreateTable
CREATE TABLE "plans_wait_list" (
    "email" TEXT NOT NULL,
    "plan_id" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "plans_wait_list_email_key" ON "plans_wait_list"("email");

-- CreateIndex
CREATE UNIQUE INDEX "plans_wait_list_email_plan_id_key" ON "plans_wait_list"("email", "plan_id");

-- AddForeignKey
ALTER TABLE "plans_wait_list" ADD CONSTRAINT "plans_wait_list_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
