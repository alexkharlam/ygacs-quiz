import dotenv from 'dotenv';

import app from './app.js';
import connectDB from './middleware/connectDB.js';

dotenv.config({ path: 'config.env' });

//

connectDB().then(() => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`🟢 Server running on port ${port}`);
  });
});
