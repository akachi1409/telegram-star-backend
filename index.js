import express from "express";
import { Bot } from "grammy";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
console.log(process.env.TELEGRAM_BOT_TOKEN)
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN); // Your bot token

app.get("/generate-invoice", async (req, res) => {
  const title = "Test Product";
  const description = "Test description";
  const payload = "{}";
  const currency = "XTR";
  const prices = [{ amount: 1, label: "Test Product" }];

  const invoiceLink = await bot.api.createInvoiceLink(
    title,
    description,
    payload,
    "", // Provider token must be empty for Telegram Stars
    currency,
    prices,
  );

  res.json({ invoiceLink });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});