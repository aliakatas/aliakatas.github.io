
import express from 'express';
import random from 'random';
const app = express();

app.use(express.static('build')); // Serve the React build folder

app.get('/generate-groups', (req, res) => {
  const { num1, num2, allowLess } = req.query;
  const groups = createRandomGroups(parseInt(num1, 10), parseInt(num2, 10), allowLess === 'true');
  res.json(groups);
});

function createRandomGroups(n, groupSize, allowLess = false) {
  const names = Array.from({ length: n }, (_, i) => (i + 1).toString());
  const groups = [];

  if (groupSize > n) {
    return groups;
  }

  while (n >= groupSize) {
    const group = [];
    for (let i = 0; i < groupSize; i++) {
      const nameIndex = random.int(0, names.length - 1);
      const name = names.splice(nameIndex, 1)[0];
      group.push(name);
    }

    groups.push(group);
    n = names.length;
  }

  if (allowLess) {
    groups.push(...names);
  } else {
    const numGroups = groups.length;
    for (let i = 0; i < names.length; i++) {
      const groupIndex = i % numGroups;
      groups[groupIndex].push(names[i]);
    }
  }

  return groups;
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
