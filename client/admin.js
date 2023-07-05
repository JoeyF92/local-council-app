const loadProposals = async () => {
  console.log("hi");
  const response = await fetch(
    "http://localhost:3000/submissions/status/pending"
  );
  console.log("hi2");
  const data = await response;

  if (response.status == 200) {
    alert("User created!");
  } else {
    alert(data.error);
  }
};

loadProposals();
