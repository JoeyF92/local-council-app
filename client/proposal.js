document
  .querySelector("#new-form-container")
  .addEventListener("submit", (e) => {
    submitProposal(e);
  });

const submitProposal = async (e, id) => {
  e.preventDefault();
  const form = e.target;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: form.elements.title.value,
      category: form.elements.category.value,
      proposal: form.elements.proposal.value,
      photo: form.elements.photo.value,
    }),
  };
  const response = await fetch(
    `http://localhost:3000/submissions/new`,
    options
  );
  console.log(response);
  const data = await response.json();
  if (response.status == 201) {
    console.log(`Successfully submitted proposal: ${data}`);
  } else {
    console.log(data.error);
  }
};
