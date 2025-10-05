import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://leads-tracker-app-3cffb-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const database = getDatabase(app);
console.log(database);
const referenceInDB = ref(database, "leads");
// let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

onValue(referenceInDB, function (snapshot) {
  if (snapshot.exists()) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
  } else {
    console.log("No leads found in database");
    ulEl.innerHTML = "";
  }
});

deleteBtn.addEventListener("dblclick", function () {
  console.log("Delete button clicked");
  // For now, just render empty array since we don't have delete functionality
  remove(referenceInDB);
  ulEl.innerHTML = "";
});

inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
});
