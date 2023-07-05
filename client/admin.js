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

const populateTable = (data) => {
  console.log(data);
  const submissionsDiv = document.querySelector("#submissions-table");
  //create table
  const table = document.createElement("table");
  table.classList.add("category-table");

  const tableHeaders = [
    "Category",
    "Title",
    "Proposal",
    "Submission Status",
    "Date Added",
    "Image",
    "Decision",
  ];
  //populate the tables headers
  const headerRow = document.createElement("tr");
  for (const headerText of tableHeaders) {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  // Populate data rows
  for (const item of data) {
    const dataRow = document.createElement("tr");
    const {
      category,
      title,
      proposal,
      submission_status,
      date_time_entry,
      photo,
      submission_id,
    } = item;

    // Category column
    const categoryCell = document.createElement("td");
    categoryCell.textContent = category;
    dataRow.appendChild(categoryCell);

    // Title column
    const titleCell = document.createElement("td");
    titleCell.textContent = title;
    dataRow.appendChild(titleCell);

    // Proposal column
    const proposalCell = document.createElement("td");
    proposalCell.textContent = proposal;
    dataRow.appendChild(proposalCell);

    // Submission Status column
    const submissionStatusCell = document.createElement("td");
    submissionStatusCell.textContent = submission_status;
    dataRow.appendChild(submissionStatusCell);

    // Date Added column
    const dateAddedCell = document.createElement("td");
    dateAddedCell.textContent = date_time_entry;
    dataRow.appendChild(dateAddedCell);

    // Image column
    const imageCell = document.createElement("td");
    const image = document.createElement("img");
    image.src = photo;
    image.style.maxWidth = "100px"; // Adjust the size as needed
    imageCell.appendChild(image);
    dataRow.appendChild(imageCell);

    // Decision column
    const decisionCell = document.createElement("td");
    const approveButton = document.createElement("button");
    approveButton.textContent = "Approve";
    approveButton.addEventListener("click", () =>
      decisionHandle("approved", submission_id)
    );
    decisionCell.appendChild(approveButton);

    const denyButton = document.createElement("button");
    denyButton.textContent = "Deny";
    denyButton.addEventListener("click", () =>
      decisionHandle("denied", submission_id)
    );
    decisionCell.appendChild(denyButton);

    //edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    decisionCell.appendChild(editButton);

    dataRow.appendChild(decisionCell);

    table.appendChild(dataRow);
  }

  submissionsDiv.appendChild(table);
};

const decisionHandle = async (action, id) => {
  const options = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: action,
    }),
  };
  const response = await fetch(
    `http://localhost:3000/submissions/${id}`,
    options
  );
  const data = await response.json();

  if (response.status == 200) {
    console.log("it worked");
  } else {
    console.log(data.error);
  }
};

loadProposals();
