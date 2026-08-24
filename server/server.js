const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

function calculateNumbers(name1, name2) {
    const cleanName1 = name1.toLowerCase().replace(/\s/g, "");
    const cleanName2 = name2.toLowerCase().replace(/\s/g, "");

    let remainingName2 = cleanName2.split("");
    let matches = 0;

    for (const letter of cleanName1) {
        const index = remainingName2.indexOf(letter);
        if (index !== -1) {
            matches++;
            remainingName2.splice(index, 1);
        }
    }

    let numbers1 = [];
    for (let i = 0; i < matches; i++) numbers1.push(2);
    for (let i = 0; i < cleanName1.length - matches; i++) numbers1.push(1);

    let numbers2 = [];
    for (let i = 0; i < cleanName2.length - matches; i++) numbers2.push(1);

    const love = [1, 1, 1, 1];

    return {
        numbers1,
        numbers2,
        love,
        sequence: [...numbers1, ...numbers2, ...love]
    };
}

function reduceToTwo(numbers) {
    let current = [...numbers];

    while (current.length > 2 || (current.length === 2 && current.join("").length > 2)) {
        let next = [];

        let left = 0;
        let right = current.length - 1;

        while (left < right) {
            next.push(current[left] + current[right]);
            left++;
            right--;
        }

        if (left === right) {
            next.push(current[left]);
        }

        current = next;
    }

    return current;
}

app.post("/api/calculate", (req, res) => {
    const { name1, name2, answers } = req.body;

    if (!name1 || !name2) {
        return res.status(400).json({
            error: "Both names are required."
        });
    }

    const data = calculateNumbers(name1, name2);
    const finalNumbers = reduceToTwo(data.sequence);

    res.json({
        name1,
        name2,
        answers: answers || [],
        numbers1: data.numbers1,
        numbers2: data.numbers2,
        love: data.love,
        sequence: data.sequence,
        finalNumbers,
        percentile: Number(finalNumbers.join(""))
    });
});

app.get("/", (req, res) => {
    res.json({
        message: "Lover Percentile Backend is running ❤️"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

