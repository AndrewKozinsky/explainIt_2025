-- CreateTable
CREATE TABLE "Sentence" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER,
    "start_offset" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "BookPrivate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
