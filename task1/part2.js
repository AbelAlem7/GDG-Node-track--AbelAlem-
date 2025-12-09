const express = require('express');
const app = express();
const PORT = 4000;
app.use(express.json());
let students = [];
let currentId = 1;
app.get('/students', (req, res) => {
    res.json(students);
});
app.post('/students', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const newStudent = { id: currentId++, name };
    students.push(newStudent);
    res.status(201).json(newStudent);
});
app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const student = students.find(s => s.id === parseInt(id));
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    student.name = name || student.name;
    res.json(student);
});
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const index = students.findIndex(s => s.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }

    students.splice(index, 1);
    res.json({ message: 'Student deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`this is running on http://localhost:${PORT}`);
});
