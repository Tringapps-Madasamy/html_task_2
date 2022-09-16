
let countid = 1;
let mydata;
let editid = null;
let locate = -1;
function storingthedata() {
    if (document.getElementById("check").checked) {
        if (editid == null && locate == -1) {
            let data;
            try {
                data = JSON.parse(localStorage.getItem("formData"));
            }
            catch (e) {
                mydata = [{ "id": 1, "email": "abc@gmail.com", "firstname": "santhosh", "lastname": "son", "phonenumber": 8758474433, "Gender": "male", "dateofbirth": "01-02-2003" }];
                localStorage.setItem("formData", JSON.stringify(mydata));
            }
            if (data == null) {
                mydata = [{ "id": 1, "email": "abc@gmail.com", "firstname": "santhosh", "lastname": "son", "phonenumber": 8758474433, "Gender": "male", "dateofbirth": "01-02-2003" }];
                localStorage.setItem("formData", JSON.stringify(mydata));
                console.log(data);
            }
            data = JSON.parse(localStorage.getItem("formData"));
            let email = document.getElementById("mail").value;
            let fname = document.getElementById("fname").value;
            let lname = document.getElementById("lname").value;
            let phonenum = document.getElementById("phnum").value;
            let gender;
            if (document.getElementById("Mgender").checked) {
                gender = document.getElementById("Mgender").value;
            }
            else if (document.getElementById("Fgender").checked) {
                gender = document.getElementById("Fgender").value;
            }
            let dob = document.getElementById("dob").value;
            let temp = countid + 1;
            mydata = { 'id': temp, 'email': email, 'firstname': fname, 'lastname': lname, 'phonenumber': phonenum, 'Gender': gender, 'dateofbirth': dob };
            data.push(mydata);
            localStorage.setItem("formData", JSON.stringify(data));
            let retrievedata = JSON.parse(localStorage.getItem("formData"));
            buildtable(retrievedata);
            countid = temp;
            document.getElementById("mail").value = "";
            document.getElementById("fname").value = "";
            document.getElementById("lname").value = "";
            document.getElementById("phnum").value = "";
            var ele = document.getElementsByName("malefemalebtn");
            for (var i = 0; i < ele.length; i++)
                ele[i].checked = false;
            var inputs = document.querySelectorAll('.checkbox');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
            document.getElementById("dob").value = "";

            console.log(retrievedata);
        }
        else {
            let mail = document.getElementById("mail").value;
            let firstname = document.getElementById("fname").value;
            let lastname = document.getElementById("lname").value;
            let phone = document.getElementById("phnum").value;
            let dob = document.getElementById("dob").value;
            let gender;
            if (document.getElementById("Mgender").checked) {
                gender = document.getElementById("Mgender").value;
            }
            else if (document.getElementById("Fgender").checked) {
                gender = document.getElementById("Fgender").value;
            }

            editid.cells[1].innerHTML = mail;
            editid.cells[2].innerHTML = firstname;
            editid.cells[3].innerHTML = lastname;
            editid.cells[4].innerHTML = phone;
            editid.cells[5].innerHTML = gender;
            editid.cells[6].innerHTML = dob;
            editid = null;
            let updatedata = JSON.parse(localStorage.getItem('formData'));
            updatedata[locate].email = mail;
            updatedata[locate].firstname = firstname;
            updatedata[locate].lastname = lastname;
            updatedata[locate].phonenumber = phone;
            updatedata[locate].Gender = gender;
            updatedata[locate].dateofbirth = dob;
            localStorage.setItem('formData', JSON.stringify(updatedata));
        }
    }
}
function buildtable(data) {
    let table = document.getElementById('mytable');
    table.innerHTML = "";
    console.log(countid);
    for (let i = 0; i < data.length; i++) {
        let row = `<tr>
                     <td>${data[i].id}</td>
                     <td>${data[i].email}</td>
                     <td>${data[i].firstname}</td>
                     <td>${data[i].lastname}</td>
                     <td>${data[i].phonenumber}</td>
                     <td>${data[i].Gender}</td>
                     <td>${data[i].dateofbirth}</td>
                     <td><button type="submit" class="edit" onClick="onEdit(this,${i})">EDIT</button>
                     <button type="submit" class="delete" onClick="onDelete(${i})">DELETE</button></td>
                </tr>`
        table.innerHTML += row
    }
}
function onDelete(id) {
    if (confirm("If you want to delete this?")) {
        let arr = JSON.parse(localStorage.getItem('formData'));
        arr.splice(id, 1);
        localStorage.setItem('formData', JSON.stringify(arr));
        let nowthedata = JSON.parse(localStorage.getItem("formData"));
        buildtable(nowthedata);
    }
}
function onEdit(td, id) {
    locate = id;
    editid = td.parentElement.parentElement;
    let editthedata = JSON.parse(localStorage.getItem('formData'));
    document.getElementById('mail').value = editthedata[id].email;
    document.getElementById('fname').value = editthedata[id].firstname;
    document.getElementById('lname').value = editthedata[id].lastname;
    document.getElementById('phnum').value = editthedata[id].phonenumber;
    document.getElementById('dob').value = editthedata[id].dateofbirth;
    var ele = document.getElementsByName("malefemalebtn");
    for (var i = 0; i < ele.length; i++)
        ele[i].checked = false;
}
