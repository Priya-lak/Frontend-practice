const url = "https://reqres.in/api/users?page=1&&per_page=15";
const reqHeaders = { "x-api-key": "reqres-free-v1" };

const tableBody = document.getElementById("user-details");

fetch(url, { headers: reqHeaders })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Network response was not ok");
  })
  .then((resJson) => {
    console.log("Response received.");
    populateData(resJson.data);
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

function populateData(resData) {
  if (!tableBody) {
    console.error("Table body element not found.");
    return;
  }
  for (const { first_name, last_name, avatar } of resData) {
    const dataRow = document.createElement("tr");

    const dataValueFirstName = document.createElement("td");
    dataValueFirstName.textContent  = first_name;

    const dataValueLastName = document.createElement("td");
    dataValueLastName.textContent  = last_name;

    const dataValueAvatar = document.createElement("td");
    const avatarImageContainer = document.createElement("div");
    avatarImage = document.createElement("img");
    avatarImage.setAttribute("src", avatar);
    avatarImage.alt = "image";

    avatarImageContainer.appendChild(avatarImage);
    dataValueAvatar.appendChild(avatarImageContainer);
    
    dataRow.appendChild(dataValueAvatar);
    dataRow.appendChild(dataValueFirstName);
    dataRow.appendChild(dataValueLastName);

    tableBody.appendChild(dataRow);
  }
}
