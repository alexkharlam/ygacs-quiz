// import dotenv from 'dotenv';

import app from './app.js';
import connectDB from './middleware/connectDB.js';

// dotenv.config({ path: 'process.env' });

//

// connect DB and run server (in the connectDB callback)
connectDB().then(() => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`🟢 Server running on port ${port}`);
  });
});
