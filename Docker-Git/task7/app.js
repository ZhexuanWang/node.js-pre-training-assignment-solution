const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/data', (req, res) => {
    res.json([
        { id: 1, name: 'Alice', role: 'developer' },
        { id: 2, name: 'Bob',   role: 'designer'  },
        { id: 3, name: 'Carol', role: 'manager'   }
    ]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
