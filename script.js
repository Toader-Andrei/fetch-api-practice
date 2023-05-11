let isEditing = false;

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((user) => {
      createUserCard(user);
    });
  });

function clearForm() {
  const form = document.querySelector(".form");
  form.reset();
}

function validationWarningText() {
  const warningText = document.querySelector(".warning-text");
  if (warningText) {
    warningText.remove();
  }
}

function createWarningText() {
  const inputContainers = document.querySelector(".inputs");

  const warningMessageContainer = document.createElement("div");
  warningMessageContainer.innerText = "Please fill all the remaining frames!";
  warningMessageContainer.classList.add("text-danger", "warning-text");

  inputContainers.appendChild(warningMessageContainer);
}

function createUserCard(user) {
  const dataContainer = document.querySelector(".date-container");

  const userData = document.createElement("div");
  userData.setAttribute("data-id", user.id);

  const userDataContainer = document.createElement("div");
  userDataContainer.classList.add("user", "mb-4");
  userDataContainer.setAttribute("data-id", user.id);

  const userDetailsContainer = document.createElement("div");
  userDetailsContainer.classList.add("d-flex", "flex-column");
  userDetailsContainer.setAttribute("data-id", user.id);

  const userBtnsContainer = document.createElement("div");
  userBtnsContainer.classList.add("btns");

  const userTrashIcon = document.createElement("i");
  userTrashIcon.setAttribute(
    "class",
    "fa-solid fa-trash cursor-pointer detele-button"
  );

  const userEditIcon = document.createElement("i");
  userEditIcon.setAttribute(
    "class",
    "fa-solid fa-pen-to-square cursor-pointer edit-button p-2"
  );

  userBtnsContainer.appendChild(userTrashIcon);
  userBtnsContainer.appendChild(userEditIcon);

  const dataNamesContainer = document.createElement("div");
  dataNamesContainer.classList.add("name-container", "fs-2");

  const dataNamesParagraph = document.createElement("p");
  dataNamesParagraph.innerText = "Your name should be: ";
  dataNamesParagraph.classList.add("m-0");

  const dataNamesSpan = document.createElement("span");
  dataNamesSpan.classList.add("name");
  dataNamesSpan.innerText = user.name;

  dataNamesParagraph.appendChild(dataNamesSpan);
  dataNamesContainer.appendChild(dataNamesParagraph);

  const dataEmailsContainers = document.createElement("div");
  dataEmailsContainers.classList.add("email-container", "fs-2");

  const dataEmailsParagraph = document.createElement("p");
  dataEmailsParagraph.innerText = "Your email should be: ";
  dataEmailsParagraph.classList.add("m-0");

  const dataEmailsSpan = document.createElement("span");
  dataEmailsSpan.classList.add("email");
  dataEmailsSpan.innerText = user.email;

  dataEmailsParagraph.appendChild(dataEmailsSpan);
  dataEmailsContainers.appendChild(dataEmailsParagraph);

  const dataIdContainer = document.createElement("div");
  dataIdContainer.classList.add("id-container", "fs-2");

  const dataIdParagraph = document.createElement("p");
  dataIdParagraph.innerText = "Your id should be: ";
  dataIdParagraph.classList.add("m-0");

  const dataIdSpan = document.createElement("span");
  dataIdSpan.classList.add("id");
  dataIdSpan.innerText = user.id;

  dataIdParagraph.appendChild(dataIdSpan);
  dataIdContainer.appendChild(dataIdParagraph);

  const dataAddressContainer = document.createElement("div");
  dataAddressContainer.classList.add("city-container", "fs-2");

  const dataAddressParagraph = document.createElement("p");
  dataAddressParagraph.innerText = "Your city should be: ";
  dataAddressParagraph.classList.add("m-0");

  const dataAddressSpan = document.createElement("span");
  dataAddressSpan.classList.add("city");
  dataAddressSpan.innerText = user.address.city;

  dataAddressParagraph.appendChild(dataAddressSpan);
  dataAddressContainer.appendChild(dataAddressParagraph);

  const breakLine = document.createElement("hr");
  breakLine.classList.add("mt-0");

  userDataContainer.appendChild(dataNamesContainer);
  userDataContainer.appendChild(dataEmailsContainers);
  userDataContainer.appendChild(dataIdContainer);
  userDataContainer.appendChild(dataAddressContainer);

  userData.appendChild(userDataContainer);
  userData.appendChild(userBtnsContainer);
  userData.appendChild(breakLine);

  dataContainer.appendChild(userData);

  userTrashIcon.addEventListener("click", (event) => {
    const numbersId = event.target.parentElement.parentElement;
    const id = numbersId.dataset.id;

    fetch("https://jsonplaceholder.typicode.com/users/" + id, {
      method: "DELETE",
    }).then(() => numbersId.remove());
  });

  userEditIcon.addEventListener("click", (event) => {
    const user = event.target.parentElement.parentElement;

    const name = user.querySelector(".name").innerText;
    const email = user.querySelector(".email").innerText;
    const id = user.querySelector(".id").innerText;
    const city = user.querySelector(".city").innerText;

    validationWarningText();
    const inputValueName = document.querySelector(".name-input");
    inputValueName.setAttribute("value", name);

    const inputValueEmail = document.querySelector(".email-input");
    inputValueEmail.setAttribute("value", email);

    const inputValueId = document.querySelector(".id-input");
    inputValueId.setAttribute("value", id);

    const inputValueCity = document.querySelector(".city-input");
    inputValueCity.setAttribute("value", city);

    isEditing = true;
    clearForm();
  });
}

const submitBtn = document.querySelector(".send");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const valueOFNameInput = document.querySelector(".name-input").value;
  const valueOfEmailInput = document.querySelector(".email-input").value;
  const valueOfIdInput = document.querySelector(".id-input").value;
  const valueOfCityInput = document.querySelector(".city-input").value;

  const newUser = {
    name: valueOFNameInput,
    email: valueOfEmailInput,
    id: valueOfIdInput,
    address: { city: valueOfCityInput },
  };

  if (isEditing) {
    const newInputValueName = document.querySelector(".name-input").value;
    const newInputValueEmail = document.querySelector(".email-input").value;
    const newInputValueId = document.querySelector(".id-input").value;
    const newInputValueCity = document.querySelector(".city-input").value;

    fetch("https://jsonplaceholder.typicode.com/users/" + newInputValueId, {
      method: "PUT",
      body: JSON.stringify({
        name: newInputValueName,
        email: newInputValueEmail,
        id: newInputValueId,
        address: { city: newInputValueCity },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      const userId = document.querySelector(
        '.user[data-id="' + valueOfIdInput + '"]'
      );

      const dataNames = userId.querySelector(".name");
      dataNames.innerText = newInputValueName;

      const dataEmails = userId.querySelector(".email");
      dataEmails.innerText = newInputValueEmail;

      const dataId = userId.querySelector(".id");
      dataId.innerText = newInputValueId;

      const dataAddress = userId.querySelector(".city");
      dataAddress.innerText = newInputValueCity;

      isEditing = false;
    });
  } else {
    if (
      valueOFNameInput === "" ||
      valueOfEmailInput === "" ||
      valueOfIdInput === "" ||
      valueOfCityInput === ""
    ) {
      validationWarningText();
      createWarningText();
    } else {
      fetch("https://jsonplaceholder.typicode.com/users/" + valueOfIdInput, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(() => {
        createUserCard(newUser);
      });
    }
  }

  clearForm();
});

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", (event) => {
  event.preventDefault();
  validationWarningText();
  clearForm();
});
