
let stdinfo = [];
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const gpaEl = document.getElementById('gpa');
const ageEl = document.getElementById('age');
const degreeEl = document.getElementById('degree');

const submitbtn = document.getElementById('submit');

const searchEl = document.getElementById('search-bar');

function print(){
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const gpa = document.getElementById('gpa').value;
    const age = document.getElementById('age').value;
    const degree = document.getElementById('degree').value;

    let stringobj = `{"name":"${name}", "email":"${email}","age":"${age}",
                 "gpa":"${gpa}", "degree":"${degree}"}`;
    
    let obj = JSON.parse(stringobj);
    
    stdinfo.push(obj);

    nameEl.value='';emailEl.value='';gpaEl.value='';ageEl.value='';degreeEl.value='';

    submitbtn.value="Add Student";
    renderTable(stdinfo);
}


function renderTable(stdinfo){

    const tbody = document.getElementById('tableBody');
    tbody.innerHTML='';
    let num=1;
    stdinfo.forEach((data)=>{
        let row = document.createElement('tr');
        let rowId = `row${num}`;
        row.id = rowId;
        let editId = `edit${num}`, delId = `del${num}`;
        row.style.height = "25px";
        row.style.padding = "10px";
        row.innerHTML = `<td style="padding:10px">${num}</td>
            <td style="padding:10px">${data.name}</td>
            <td style="padding:10px">${data.email}</td>
            <td style="padding:10px">${data.gpa}</td>
            <td style="padding:10px">${data.age}</td>
            <td style="padding:10px; display:flex; justify-content:space-between">${data.degree}
            <div>
            <i style="cursor: pointer;" class="fa fa-edit editbtn" style="color: #ffffff; margin-right: 20px;"></i>
            <i style="cursor: pointer;" class="fa fa-trash delbtn"; color: #ffffff;"></i>
            <div></td>`

        num+=1;
        tbody.appendChild(row);

    });

    deleteRow();
    editRow();
}

function deleteRow(){
    var table = document.getElementById("stdInfo");

    var deleteButtons = table.getElementsByClassName("delbtn");

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].onclick = function() {

          let row = this.closest("tr");
          row.parentNode.removeChild(row);

          delete stdinfo[i];

          renderTable(stdinfo);
        }
    }
}

function editRow(){
    var table = document.getElementById("stdInfo");

    var editButtons = table.getElementsByClassName("editbtn");

    for(let i=0; i<editButtons.length; i++){
        editButtons[i].onclick = function(){
            let row = this.closest("tr");

            submitbtn.value="Edit Student";
            let rowchild = row.children;
            
            nameEl.value = rowchild[1].innerText;
            emailEl.value = rowchild[2].innerText;
            gpaEl.value = rowchild[3].innerText;
            ageEl.value = rowchild[4].innerText;
            degreeEl.value = rowchild[5].innerText;

            // delete stdinfo[i];

            // deleteRow();
            renderTable(stdinfo);

        }
    }
}

searchEl.addEventListener('keyup', ()=>{
    const value = searchEl.value.trim().toLowerCase();
    if(value == '')
        renderTable(stdinfo);

    else{
        let filteredInfo = stdinfo.filter((data)=>{
            const name = data.name.toLowerCase();
            const email = data.email.toLowerCase();
            const degree = data.degree.toLowerCase();

            return name.includes(value) || email.includes(value) || degree.includes(value);
        });

        renderTable(filteredInfo);
    }
})

const submitBtn = document.getElementById('stdForm');

submitBtn.addEventListener('submit', (e)=>{
    e.preventDefault();
    print();
});