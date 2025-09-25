let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");
let regUser = document.getElementById("regUser");
let regPass= document.getElementById("regPass");
let loginUser = document.getElementById("loginUser");
let loginPass= document.getElementById("loginPass");
let myTable = document.getElementById("myTable");


btn2.onclick=function(){
  regUser.style.display='block';
  regPass.style.display='block';
  btn3.style.display='block';
  btn4.style.display='block';
}

btn1.onclick=function(){
  loginUser.style.display='block';
  loginPass.style.display='block';
  btn6.style.display='block';
  btn5.style.display='block';
}
btn3.onclick= function register() {
  let user2 = document.getElementById('regUser').value;
  let pass2 = document.getElementById('regPass').value;
  if(user2 && pass2){
    localStorage.setItem(user2,pass2);
    alert("Registered successfully ✅");
    myTable.style.display='table';
    updateTable(true);
  }else {
    alert("Please fill all fields ❌");
  }
}
btn5.onclick= function login() {
  let user1 = loginUser.value;
  let pass1 = loginPass.value;

  if(user1 && pass1){
    const storedPass = localStorage.getItem(user1, pass1);
    if (storedPass && pass1 === storedPass) {
      alert('Login successful 🎉');
      myTable.style.display = 'table';
      updateTable(true);
    } else {
      alert('Invalid username or password ❌');
    }
  }
   else {
    alert("Enter username and password ❌");
}
   }

btn6.onclick = function() {
  let user1 = loginUser.value;
  if (user1) {
    localStorage.removeItem(user1);
    alert("User deleted 🗑️");
    updateTable(true);
  } else {
    alert("Enter username to delete ❌");
  }
  loginUser.value = "";
  loginPass.value = "";
}
btn4.onclick=function(){
  let user1 = regUser.value;
  if (user1) {
    localStorage.removeItem(user1);
    alert("User deleted 🗑️");
    updateTable(true);
  } else {
    alert("Enter username to delete ❌");
  }
  regUser.value = "";
  regPass.value = "";
}
function updateTable(showElements = false) {
  let tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  for (let i = 0; i < localStorage.length; i++) {
    let username = localStorage.key(i);
    let password = localStorage.getItem(username);

    let row = `<tr>
               <td>${i + 1}</td>
               <td>${username}</td>
               <td >${password}</td>
               <td>
               <button onclick="editUser('${username}')">Edit</button>
              </td>
             </tr>`;
    tbody.innerHTML += row;
  }
  if ($.fn.DataTable.isDataTable('#myTable')) {
    $('#myTable').DataTable().destroy();
  }

  $('#myTable').DataTable({
    destroy: showElements,
    paging: showElements,
    searching: showElements,
    ordering: showElements,
    responsive: showElements,
    info: showElements,
  });
  if (showElements) {
    document.querySelectorAll('.dataTables_length, .dataTables_paginate, .dataTables_filter, .dataTables_info')
      .forEach(el => el.style.display = 'block');

    document.querySelectorAll('th.sorting, th.sorting_asc, th.sorting_desc')
      .forEach(el => el.style.pointerEvents = 'auto');
  }
}
function editUser(username) {
  regUser.value = username;
  regPass.value = localStorage.getItem(username);
  regUser.style.display = 'block';
  regPass.style.display = 'block';
  btn3.style.display = 'block';
  btn4.style.display = 'block';
  btn3.onclick = function() {
    let newUsername = regUser.value;
    let newPassword = regPass.value;

    if(newUsername && newPassword){
      if(newUsername !== username){
        localStorage.removeItem(username);
      }

      localStorage.setItem(newUsername, newPassword);
      alert("User updated ✅");
      myTable.style.display = 'table';
      updateTable(true);
      btn3.onclick = registerUser;
    } else {
      alert("Please fill all fields ❌");
    }
  }
}
function registerUser() {
  let user2 = regUser.value;
  let pass2 = regPass.value;
  if(user2 && pass2){
    localStorage.setItem(user2, pass2);
    alert("Registered successfully ✅");
    myTable.style.display='table';
    updateTable(true);
  } else {
    alert("Please fill all fields ❌");
  }
}
btn3.onclick = registerUser;


updateTable(false);
