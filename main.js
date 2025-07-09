let page=1;
let limit = 10;
let max_reached= false;
const url = `https://reqres.in/api/users?per_page=${limit}`;
const reqHeaders = { "x-api-key": "reqres-free-v1" };

const tableBody = document.getElementById("user-details");



const controlBtn=document.querySelector(".controls");




const fetchUserData = (url,page=1)=>{
    paginatedUrl = `${url}&&page=${page}`;
    console.log("Fetching from url",paginatedUrl);
    fetch(paginatedUrl, { headers: reqHeaders })
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

}

function removeAllChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

function populateData(resData) {
  if (!tableBody) {
    console.error("Table body element not found.");
    return;
  }
  if (resData.length<limit){
     max_reached=true;
  }
  console.log("clearing previous data");
  removeAllChildren(tableBody);
  console.log("removed all children");

  for (const { first_name, last_name, avatar } of resData) {
    const dataRow = document.createElement("tr");

    const dataValueFirstName = document.createElement("td");
    dataValueFirstName.textContent  = first_name;

    const dataValueLastName = document.createElement("td");
    dataValueLastName.textContent  = last_name;

    const dataValueAvatar = document.createElement("td");
    avatarImage = document.createElement("img");
    avatarImage.setAttribute("src", avatar);
    avatarImage.alt = "image";

    dataValueAvatar.appendChild(avatarImage);
    
    dataRow.appendChild(dataValueAvatar);
    dataRow.appendChild(dataValueFirstName);
    dataRow.appendChild(dataValueLastName);

    tableBody.appendChild(dataRow);
  }
}


fetchUserData(url)

controlBtn.addEventListener("click",(event)=>{
    console.log(event)
    if (event.target.attributes.id.value=="next" && !max_reached){
        page++;
        fetchUserData(url,page);
    }
    else if (event.target.attributes.id.value=="previous" && page>=1){
        page--;
        fetchUserData(url,page);
    }
    
}
)