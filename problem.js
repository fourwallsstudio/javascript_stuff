const data = [
  'Tom;START',
  'Jeremy;START',
  'Dana;START',
  'Jeremy;4',
  'Dana;2',
  'James;START',
  'Leah;START',
  'James;5',
  'Nick;START',
  'Tom;1',
  'Nick;6',
  'Leah;3',
]

const data2 = [
  'Alice;START',
  'Bob;START',
  'Bob;1',
  'Carson;START',
  'Alice;15',
  'Carson;6',
  'David;START',
  'David;24',
  'Evil;START',
  'Evil;24',
  'Evil;START',
  'Evil;18',
  'Fiona;START',
]

const data3 = [
  'Nick;START',
  'Jeremy;START',
  'Leah;START',
  'Nick;10',
  'Jeremy;START',
  'Jeremy;START',
  'Leah;15',
  'Jeremy;8,14,9',
]

const detectFraud = (data) => {
  const jobs = data.map(d => d.split(';'));
  const highestIdToDate = [];
  const violations = [];
  const startIndices = {};
  const checkIndex = {};
  let currentHighest = 0;

  for (let i = 0, len = jobs.length; i < len; i++) {
    if (jobs[i][1] !== 'START') {
      const ids = jobs[i][1].split(',').map(i => parseInt(i));
      let violation;

      if (ids.length === 1) {
        const id = ids[0];
        if (id > currentHighest) currentHighest = id;
        violation = checkValidJob(data, highestIdToDate, id, jobs[i][0], startIndices[jobs[i][0]], checkIndex);
      } else {
        if (Math.max(...ids) > currentHighest) currentHighest = Math.max(...ids);
        checkIndex[jobs[i][0]] = ids.length;
        violation = checkValidBatch(data, highestIdToDate, ids, jobs[i][0], i);
      }
      if (violation) violations.push(violation);
    } else {
      if (startIndices[jobs[i][0]]) {
        startIndices[jobs[i][0]].push(i);
      } else {
        startIndices[jobs[i][0]] = [i];
      }
    }
    highestIdToDate.push(currentHighest);
  }

  return violations;
}

const checkValidJob = (data, highestIdToDate, id, name, startIndices, checkIndex) => {
  let startIdx = checkIndex[name] ? startIndices[checkIndex[name]] : 0;
  // console.log('checkValidJob', id, name);
  const indexOfStart = data.indexOf(`${name};START`, startIdx);
  // console.log('indexOfStart', indexOfStart, startIdx);
  if (checkIndex[name]) {
    checkIndex[name] += 1;
  } else {
    checkIndex[name] = 1;
  }
  if (highestIdToDate[indexOfStart] > id) return `${indexOfStart + 1};${name};SHORTENED_JOB`;
  return null;
}

const checkValidBatch = (data, highestIdToDate, ids, name, idx) => {
  for (let j = 0; j < idx; j++) {
    if (data[j] === `${name};START`) {
      for (let i = 0, len = ids.length; i < len; i++) {
        if (highestIdToDate[j] > ids[i]) return `${idx + 1};${name};SUSPICIOUS_BATCH`;
      }
    }
  }
  return null;
}

console.log(detectFraud(data3));
