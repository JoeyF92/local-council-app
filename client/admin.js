const { populate } = require("dotenv/lib/main");

const loadProposals = async () => {
  const response = await fetch(
    "http://localhost:3000/submissions/status/pending"
  );
  const data = await response.json();

  if (response.status == 200) {
    populateTable(data);
  } else {
    console.log(data.error);
  }
};


const populateTable(data){}


loadProposals();
