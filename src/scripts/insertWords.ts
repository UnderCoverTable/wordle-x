import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Setup Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

// Folder where JSON files are stored
const WORDS_DIR = path.resolve("src/assets"); // change to your JSON folder

async function insertWords() {
  try {
    const files = fs.readdirSync(WORDS_DIR);

    for (const file of files) {
      if (!file.endsWith(".json")) continue;

      const filePath = path.join(WORDS_DIR, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const words: string[] = JSON.parse(fileContent);

      // Extract word length from filename, like words-5.json
      const lengthMatch = file.match(/\d+/);
      if (!lengthMatch) {
        console.warn(`⚠️ Skipping ${file}, no length found.`);
        continue;
      }

      const wordLength = parseInt(lengthMatch[0], 10);

      // Prepare rows for bulk insert
      const rows = words.map((word) => ({
        word_length: wordLength,
        word,
      }));

      console.log(`📥 Inserting ${rows.length} words of length ${wordLength}...`);

      const { error } = await supabase.from("words").insert(rows);
      if (error) {
        console.error(`❌ Failed to insert words from ${file}:`, error);
      } else {
        console.log(`✅ Inserted ${rows.length} words from ${file}`);
      }
    }

    console.log("🎉 All words imported successfully!");
  } catch (err) {
    console.error("❌ Error during import:", err);
  }
}

insertWords();