let page = 1;
let limit = 10;
let max_reached = false;
const url = `https://reqres.in/api/users?per_page=${limit}`;
const reqHeaders = { "x-api-key": "reqres-free-v1" };

const tableBody = document.getElementById("user-details");
const controlBtn = document.querySelector(".controls");
const loader = document.querySelector(".loader");

const displayLoader = () => {
  console.log("Loader", loader.style);
  loader.style.display = "inline-block";
};

const hideLoader = () => {
  loader.style.display = "none";
};

const fetchUserData = async (url, page = 1) => {
  displayLoader();
  const paginatedUrl = `${url}&page=${page}`;
  console.log("Fetching from url", paginatedUrl);
  try {
    const res = await fetch(paginatedUrl, { headers: reqHeaders });
    if (res.ok) {
        console.log("Response received");
        const resJson = await res.json();
        hideLoader();
      populateData(resJson.data);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    hideLoader();
    console.error("There has been a problem with your fetch operation:", error);
    tableBody.innerHTML = '<tr><td colspan="3">Error loading data. Please try again.</td></tr>';
  }
};

const removeAllChildren=(parent)=> {
   parent.innerHTML = '';
}

const populateData=(resData)=> {
  if (!tableBody) {
    console.error("Table body element not found.");
    return;
  }
  if (resData.length < limit) {
    max_reached = true;
  } else {
    max_reached = false;
  }
  removeAllChildren(tableBody);

  for (const { first_name, last_name, avatar } of resData) {
    const dataRow = document.createElement("tr");

    const dataValueFirstName = document.createElement("td");
    dataValueFirstName.textContent = first_name;

    const dataValueLastName = document.createElement("td");
    dataValueLastName.textContent = last_name;

    const dataValueAvatar = document.createElement("td");
    const avatarImage = document.createElement("img");
    avatarImage.setAttribute("src", avatar);
    avatarImage.alt = "image";

    dataValueAvatar.appendChild(avatarImage);

    dataRow.appendChild(dataValueAvatar);
    dataRow.appendChild(dataValueFirstName);
    dataRow.appendChild(dataValueLastName);

    tableBody.appendChild(dataRow);
  }
}

controlBtn.addEventListener("click", (event) => {
  console.log(event);
  if (event.target.id == "next" && !max_reached) {
    page++;
    fetchUserData(url, page);
  } else if (event.target.id == "previous" && page > 1) {
    page--;
    fetchUserData(url, page);
  }
});

fetchUserData(url);
