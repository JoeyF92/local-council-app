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
    editButton.addEventListener("click", () =>
      showEditForm(item, submission_id)
    );
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
  statusSelect.value = `${item.status}`;

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
  console.log(id);
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

loadProposals();
