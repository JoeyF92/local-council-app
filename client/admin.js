//set a variable to dictate what table is automatically shown on page reload (useful when submitting on this page)

//listen for which table the user wants to view
// Listen for which table the user wants to view
document.querySelector("#pending-table").addEventListener("click", function () {
  fetchTableData("pending");
  localStorage.setItem("refreshstatus", "pending");
});

document.querySelector("#results-table").addEventListener("click", function () {
  fetchTableData("approved");
  localStorage.setItem("refreshstatus", "approved");
});

document
  .querySelector("#progress-table")
  .addEventListener("click", function () {
    fetchTableData("in-progress");
    localStorage.setItem("refreshstatus", "in-progress");
  });

document
  .querySelector("#complete-table")
  .addEventListener("click", function () {
    fetchTableData("complete");
    localStorage.setItem("refreshstatus", "complete");
  });

document.querySelector("#denied-table").addEventListener("click", function () {
  fetchTableData("denied");
  localStorage.setItem("refreshstatus", "denied");
});

//fetch the table data
const fetchTableData = async (status) => {
  const response = await fetch(
    `http://localhost:3000/submissions/status/${status}`
  );
  const data = await response.json();

  if (response.status == 200) {
    populateTable(data, status);
  } else {
    console.log(data.error);
  }
};

const populateTable = (data, status) => {
  if (data != "") {
    const submissionsDiv = document.querySelector("#submissions-table");
    submissionsDiv.innerHTML = "";
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
      "Vote Count",
      "Action",
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
        votes,
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
      submissionStatusCell.textContent =
        submission_status.charAt(0).toUpperCase() + submission_status.slice(1);
      dataRow.appendChild(submissionStatusCell);

      // Date Added column
      const dateAddedCell = document.createElement("td");

      dateAddedCell.textContent = new Date(date_time_entry).toLocaleString();
      dataRow.appendChild(dateAddedCell);

      // Image column
      const imageCell = document.createElement("td");
      const image = document.createElement("img");
      image.src = photo;
      image.style.maxWidth = "100px"; // Adjust the size as needed
      imageCell.appendChild(image);
      dataRow.appendChild(imageCell);

      //Vote column
      const voteCell = document.createElement("td");
      voteCell.textContent = votes;
      dataRow.appendChild(voteCell);

      // Action column
      const actionCell = document.createElement("td");

      if (status === "pending" || status === "denied") {
        const approveButton = document.createElement("button");
        approveButton.textContent = "Approve";
        approveButton.addEventListener("click", () =>
          decisionHandle("approved", submission_id)
        );
        actionCell.appendChild(approveButton);
      }

      if (status === "pending") {
        const denyButton = document.createElement("button");
        denyButton.textContent = "Deny";
        denyButton.addEventListener("click", () =>
          decisionHandle("denied", submission_id)
        );
        actionCell.appendChild(denyButton);
      }

      //edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () =>
        showEditForm(item, submission_id)
      );
      actionCell.appendChild(editButton);

      dataRow.appendChild(actionCell);

      table.appendChild(dataRow);
    }

    //create button for mass moving submissions to denied at the end of the month
    submissionsDiv.appendChild(table);
    if (status == "approved") {
      const resetDivP = document.createElement("div");
      const resetDivButton = document.createElement("div");
      resetDivP.classList = "resetdiv";
      resetDivButton.classList = "resetdiv";
      const p = document.createElement("p");
      p.textContent =
        "Click to move all remaining submissions to denied and reset month";
      const button = document.createElement("button");
      button.textContent = "Move and Reset";
      button.addEventListener("click", moveAndReset);
      resetDivP.appendChild(p);
      resetDivButton.appendChild(button);
      submissionsDiv.append(resetDivButton, resetDivP);
    }
  }
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
    location.reload();
  } else {
    console.log(data.error);
  }
};

const showEditForm = (item, id) => {
  const formContainer = document.querySelector("#form-container");

  // Clear any existing content in the form container
  formContainer.innerHTML = "";

  // Create the form
  const form = document.createElement("form");
  //   form.method = "post";

  // Title input
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title:";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.required = true;
  titleInput.value = `${item.title}`;

  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(document.createElement("br"));

  // Category input
  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Category:";
  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.name = "category";
  categoryInput.required = true;
  categoryInput.value = `${item.category}`;
  form.appendChild(categoryLabel);
  form.appendChild(categoryInput);
  form.appendChild(document.createElement("br"));

  // Proposal input
  const proposalLabel = document.createElement("label");
  proposalLabel.textContent = "Proposal:";
  const proposalTextarea = document.createElement("textarea");
  proposalTextarea.name = "proposal";
  proposalTextarea.required = true;
  proposalTextarea.value = `${item.proposal}`;
  form.appendChild(proposalLabel);
  form.appendChild(document.createElement("br"));
  form.appendChild(proposalTextarea);
  form.appendChild(document.createElement("br"));

  // Photo input
  const photoLabel = document.createElement("label");
  photoLabel.textContent = "Photo URL:";
  const photoInput = document.createElement("input");
  photoInput.type = "url";
  photoInput.name = "photo";
  photoInput.required = true;
  photoInput.value = `${item.photo}`;
  form.appendChild(photoLabel);
  form.appendChild(photoInput);
  form.appendChild(document.createElement("br"));

  // Submission status input
  const statusLabel = document.createElement("label");
  statusLabel.textContent = "Submission Status:";
  const statusSelect = document.createElement("select");
  statusSelect.name = "status";
  statusSelect.status = `Complete`;

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Denied", value: "denied" },
    { label: "Approved", value: "approved" },
    { label: "In Progress", value: "in-progress" },
    { label: "Complete", value: "complete" },
  ];

  statusOptions.forEach((option) => {
    const statusOption = document.createElement("option");
    statusOption.value = option.value;
    statusOption.textContent = option.label;
    statusSelect.appendChild(statusOption);
  });

  statusSelect.value = item.submission_status; // Set the value of the select element

  form.appendChild(statusLabel);
  form.appendChild(statusSelect);
  form.appendChild(document.createElement("br"));

  // Submit button
  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Submit";
  form.appendChild(submitButton);

  form.addEventListener("submit", (e) => submitEdit(e, id));

  // Close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "x";
  closeButton.classList.add("close-button");
  closeButton.addEventListener(
    "click",
    () => {
      formContainer.hidden = true;
    },
    { once: true }
  );
  formContainer.appendChild(closeButton);
  formContainer.appendChild(form);
  formContainer.hidden = false;
};

const submitEdit = async (e, id) => {
  e.preventDefault();
  const formContainer = document.querySelector("#form-container");

  const form = e.target;
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: form.elements.title.value,
      category: form.elements.category.value,
      proposal: form.elements.proposal.value,
      photo: form.elements.photo.value,
      submission_status: form.elements.status.value,
    }),
  };
  const response = await fetch(
    `http://localhost:3000/submissions/${id}`,
    options
  );
  const data = await response.json();
  if (response.status == 200) {
    console.log(data);
    formContainer.hidden = true;
    location.reload();
  } else {
    console.log(data.error);
  }
};

const moveAndReset = async () => {
  // Move all remaining submissions to "denied"
  const deny = await fetch(`http://localhost:3000/submissions/denyAll`, {
    method: "PATCH",
  });

  let denyData = await deny.json();
  console.log(denyData);
  if (deny.status === 200) {
    console.log("Moved rest of submissions to deny");
  } else {
    console.log(denyData.error);
  }

  // Reset all users' vote count
  const voteReset = await fetch(
    `http://localhost:3000/submissions/clearVotes`,
    {
      method: "PATCH",
    }
  );
  let voteResetData = await voteReset.json();

  if (voteReset.status === 200) {
    console.log("All votes cleared");
    window.location.reload();
  } else {
    console.log(voteResetData.error);
  }
};
const refreshStatus = localStorage.getItem("refreshstatus") || "pending";
fetchTableData(refreshStatus);
