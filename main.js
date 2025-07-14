let page = 1;
let limit = 10;
let max_reached = false;
let updateUserid = null;
const url = `https://686f975191e85fac42a1b05c.mockapi.io/api/users`;
const reqHeaders = { "Content-Type": "application/json" };

const tableBody = document.getElementById("user-details");
const controlBtn = document.querySelector(".controls");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#previous");
const loader = document.querySelector(".loader");
const addUserBtn = document.querySelector("#add-user");
const userForm = document.querySelector("form");
const userFormSubmit = document.querySelector("form input[type='submit']");

const displayLoader = () => {
  console.log("Loader", loader.style);
  loader.style.display = "inline-block";
};

const hideLoader = () => {
  loader.style.display = "none";
};

const fetchUserData = async (url, page = 1) => {
  displayLoader();
  const paginatedUrl = `${url}?limit=${limit}&page=${page}`;
  console.log("Fetching from url", paginatedUrl);
  try {
    const res = await fetch(paginatedUrl, { headers: reqHeaders });
    if (res.ok) {
      const resJson = await res.json();
      console.log("Response received", resJson);
      hideLoader();
      populateData(resJson);
      if (page==1){
        // prevBtn.style.opacity=0.4;
        prevBtn.disabled=true
        //prevent hoverring effects
      }
      else{
        prevBtn.disabled=false;
      }
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    hideLoader();
    console.error("There has been a problem with your fetch operation:", error);
    tableBody.innerHTML =
      '<tr><td colspan="3">Error loading data. Please try again.</td></tr>';
  }
};

const removeAllChildren = (parent) => {
  parent.innerHTML = "";
};

const updateUserEvent = (userNode, firstName = "", lastName = "",picture="") => {
  console.log("updating user");
  userNode.addEventListener("click", (event) => {
    event.stopPropagation();
    userForm.querySelector("label[for='heading']").textContent = "Update user";
    userForm.querySelector("input[id='first-name']").value = firstName;
    userForm.querySelector("input[id='last-name']").value = lastName;
    userForm.querySelector("input[id='picture']").value = picture;
    userForm.style.right = "0";
    console.log(userNode.id, " id clicked!");
    updateUserid = userNode.id;
  });
};

const deleteUserEvent = (userNode,deleteNode) => {
  deleteNode.addEventListener("click",(e)=>{
    e.stopPropagation();
    let deleteUserid = userNode.id;
    let deleteUrl = `${url}/${deleteUserid}`;
    let success= apiCall(deleteUrl,"DELETE");
    if (success){
      userNode.remove();

      window.alert("User deleted successfully");
    }
    else{
      window.alert("There was an error while deleting user")
    }
  });
  
};

const populateData = (resData) => {
  if (!tableBody) {
    console.error("Table body element not found.");
    return;
  }
  console.log("response data", resData);
  if (resData.length < limit) {
    max_reached = true;
    nextBtn.disabled=true;

  } else {
    nextBtn.disabled=false;
    max_reached = false;
  }
  

  removeAllChildren(tableBody);
  for (const { id, firstName, lastName, picture } of resData) {
    const dataRow = document.createElement("tr");
    dataRow.id = id;

    const dataValueFirstName = document.createElement("td");
    dataValueFirstName.textContent = firstName;

    const dataValueLastName = document.createElement("td");
    dataValueLastName.textContent = lastName;

    const dataValueAvatar = document.createElement("td");
    const avatarImage = document.createElement("img");
    avatarImage.setAttribute("src", picture);
    avatarImage.alt = "image";

    const deleteAction = document.createElement("td");
    deleteAction.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="20px" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256"><g fill="#d63f3f" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8,8)"><path d="M25.86,6.55c-2.01,0.29 -3.88,0.48 -5.68,0.61c0.02,-0.45 0.01,-0.9 -0.04,-1.34c-0.11,-0.99 -0.9,-1.75 -1.88,-1.8c-1.5,-0.08 -3.01,-0.08 -4.51,0c-0.98,0.05 -1.77,0.81 -1.88,1.8c-0.05,0.45 -0.05,0.89 -0.04,1.34c-1.81,-0.13 -3.67,-0.32 -5.68,-0.61c-0.55,-0.08 -1.05,0.3 -1.13,0.85c-0.08,0.55 0.3,1.05 0.85,1.13c3.7,0.53 6.92,0.79 10.14,0.79c3.22,0 6.44,-0.26 10.14,-0.79c0.55,-0.08 0.93,-0.58 0.85,-1.13c-0.08,-0.55 -0.58,-0.93 -1.13,-0.85zM13.84,7.27c-0.03,-0.41 -0.03,-0.83 0.02,-1.26c1.42,-0.08 2.87,-0.08 4.3,0.03c0.05,0.41 0.04,0.82 0.01,1.23c-1.45,0.05 -2.88,0.05 -4.33,0zM24.22,10.79c-2.91,0.36 -5.58,0.54 -8.22,0.54c-2.64,0 -5.31,-0.19 -8.23,-0.54c-0.53,-0.06 -1.01,0.33 -1.03,0.86c-0.12,4.68 0.44,9.89 1.54,13.5c0.4,1.32 1.53,2.3 2.9,2.49c1.93,0.27 3.36,0.4 4.8,0.4c1.44,0 2.84,-0.13 4.75,-0.39c1.39,-0.19 2.53,-1.2 2.92,-2.58c1.17,-4.17 1.72,-8.96 1.6,-13.43c-0.01,-0.53 -0.5,-0.92 -1.03,-0.86z"></path></g></g></svg>';

    dataValueAvatar.appendChild(avatarImage);

    dataRow.appendChild(dataValueAvatar);
    dataRow.appendChild(dataValueFirstName);
    dataRow.appendChild(dataValueLastName);
    dataRow.appendChild(deleteAction);

    tableBody.appendChild(dataRow);
    updateUserEvent(dataRow, firstName, lastName,picture);
    deleteUserEvent(dataRow,deleteAction);
  }
};

const formValidation = () => {
  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let picture = document.getElementById("picture");

  if (
    firstName.value.trim() == "" ||
    lastName.value.trim() == "" ||
    picture.value.trim() == ""
  ) {
    window.alert("All fields must be filled in");
    return false;
  }

  if (picture.value.match(/\.(jpeg|jpg|gif|png)$/) == null) {
    window.alert("Image field must contain a vaild image");
    return false;
  }
  return {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    picture: picture.value.trim(),
  };
};

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

userForm.addEventListener("click", (event) => {
  event.stopPropagation();
});

addUserBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  userForm.querySelector("label[for='heading']").textContent = "Add user";
  userForm.style.right = "0";
  updateUserid = null;
});

document.addEventListener("click", () => {
  userForm.style.right = "-100%";
  updateUserid = null;
});



const apiCall = async (url, method, reqBody = false) => {
  try {
    let options = {
      method: method,
      headers: reqHeaders,
    };
    if (reqBody) {
      options.body = JSON.stringify(reqBody);
    }
    const res = await fetch(url, options);
    if (res.ok) {
      const resJson = await res.json();
      console.log("Response received", resJson);
      
      return true;
      // Refresh the current page data to show updates
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return false;
  }
};




userForm.addEventListener("submit", async(event) => {
  event.preventDefault();
  console.log("Submitting form data");
  let validatedFormData = formValidation();

  if (validatedFormData) {
    let success = false;
    if (updateUserid != null) {
      console.log("updating user", updateUserid);
      updateUrl = `${url}/${updateUserid}`;
      success= await apiCall(updateUrl, "PUT", validatedFormData);
      updateUserid = null;
    } else {
      success=await apiCall(url, "POST", validatedFormData);
    }
    if (success){
      window.alert("Form submitted successfully");
      window.location.reload();
    }
    else{
      window.alert("There was an error submitting the form. Please try again!")
    }
  }
});
