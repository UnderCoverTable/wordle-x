import { supabase } from '@/api/supabaseClient/supabaseClient';
import fs from 'fs';
import path from 'path';

async function importWords(filePath: string, length: number) {
  // Read JSON file
  const fullPath = path.resolve(filePath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  console.log('fileContent: ', fileContent);
  
  // // Parse JSON array
  // const words: string[] = JSON.parse(fileContent);

  // // Optional: batch insert for efficiency (insert 100 words at a time)
  // const batchSize = 100;
  // for (let i = 0; i < words.length; i += batchSize) {
  //   const batch = words.slice(i, i + batchSize).map(word => ({
  //     word_length: length,
  //     word: word.trim(),
  //   }));
  //   const { error } = await supabase.from('words').insert(batch);
  //   if (error) {
  //     console.error(`Error inserting batch starting at index ${i}:`, error);
  //   } else {
  //     console.log(`Inserted batch ${i} - ${i + batch.length}`);
  //   }
  // }

  // console.log(`Finished importing ${words.length} words of length ${length}`);
}

// Import JSON files
(async () => {
  console.log("HERER");
  await importWords('../../../assets/words-1.json', 1);
  // await importWords('./words6.json', 6);
})();