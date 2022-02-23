

const skills = document.querySelector('#skills_list');
const devs_add_form = document.querySelector('#devs_add_form');
const devs_edit_form = document.querySelector('#devs_edit_form');
const devs_data_list = document.querySelector('#devs_data_list');
// const devs_edit_btns = document.querySelectorAlll('.devs_edit_btn');





const loadskills = () => {

//     fetch('http://localhost:3000/devs').then(data => data.json()).then(data => {

//     let skills_list = '';

//     data.map(skill =>{


//         skills_list += `
        
//         <option value="${skill.id}">${skill.skill}</option>
        
//         `;


//     });

//     skills.insertAdjacentHTML('beforeend' , skills_list)

//     });


    axios.get('https://my-json-server.typicode.com/ridoydeveloper/js-class18/devs').then(data =>{

        let skills_list = '';

    data.data.map(skill =>{


        skills_list += `
        
        <option value="${skill.id}">${skill.skill}</option>
        
        `;


    });

    skills.insertAdjacentHTML('beforeend' , skills_list)



    });





}

loadskills();

/**
 * all devs load
 */

const getDevelopers = () => {


    axios.get('https://my-json-server.typicode.com/ridoydeveloper/js-class18/devs').then(res => {

    let devs_data = '';
    res.data.map((dev , index) => {

        devs_data += `
        
        <tr>
        <td>${index + 1}</td>
        <td>${dev.name}</td>
        <td>${dev.email}</td>
        <td>${dev.call}</td>
        <td>${dev.skill}</td>
        
        <td><img style="object-fit:cover; width:50px; height:50px;" src="${dev.photo}" alt=""></td>
        <td>
            <a class="btn btn-info btn-sm" onclick="modalSingekData(${dev.id})" data-bs-toggle="modal" href="#modal_view"> <i class="fa fa-eye"></i></a>
            <a class="btn btn-warning btn-sm" onclick="editDeveloper(${dev.id})" data-bs-toggle="modal"  href="#modal_edit"> <i class="fa fa-edit"></i></a>
            <a class="btn btn-danger btn-sm" onclick="modalDeleteData(${dev.id})" data-bs-toggle="modal" href="#modal_delete"> <i class="fa fa-trash"></i></a>
        </td>
    </tr>`;

    });

   devs_data_list.innerHTML = devs_data;

  });


}

getDevelopers();


/**
 * add new devs
 * 
 */

 devs_add_form.addEventListener('submit',function(e){


    e.preventDefault();

    let name  = this.querySelector('#name');
    let email = this.querySelector('#email');
    let call  = this.querySelector('#call');
    let photo = this.querySelector('#photo');
    let skill = this.querySelector('#skills_list');


    if(name.value == '' || email.value == '' || call.value == '' || photo.value == '' || skill.value == ''){


        alert('All fields are required !');

    }else{

axios.post('https://my-json-server.typicode.com/ridoydeveloper/js-class18/devs' , {

id      : "",
name    : name.value,
email   : email.value,
call    : call.value,
photo   : photo.value,
skillId : skill.value


}).then(res => {

    name.value ='';
    email.value ='';
    call.value ='';
    photo.value ='';
    photo.value ='';
    skill.value ='';
    
    getDevelopers();


});


    

};



 });


 /**
  * devs data edit
  */

function editDeveloper(id){

    let name = document.getElementById('ename');
    let email = document.getElementById('eemail');
    let call = document.getElementById('ecall')
    let photo = document.getElementById('ephoto');
    let skill = document.getElementById('eskills_list')
    let preview = document.getElementById('epreview')
    let edit_id = document.getElementById('edit_id')
    
   

    axios.get(`https://my-json-server.typicode.com/ridoydeveloper/js-class18/devs/${id}`).then(res => {


    name.value = res.data.name;
    email.value = res.data.email;
    call.value = res.data.call;
    photo.value = res.data.photo;
    skill.value = res.data.skill;
    edit_id.value = id;
    preview.setAttribute('src' , res.data.photo)





    });


}

devs_edit_form.addEventListener('submit' , function(e){

    e.preventDefault();

    let name  = this.querySelector('#ename');
    let email = this.querySelector('#eemail');
    let call  = this.querySelector('#ecall');
    let photo = this.querySelector('#ephoto');
    let skill = this.querySelector('#eskills_list');
    let edit_id = this.querySelector('#edit_id');




    axios.patch(`https://my-json-server.typicode.com/ridoydeveloper/js-class18/devs/${edit_id.value}`,{

        id      : "",
        name    : name.value,
        email   : email.value,
        call    : call.value,
        photo   : photo.value,
        skillId : skill.value




    }).then(res => {

        name.value ='';
        email.value ='';
        call.value ='';
        photo.value ='';
        photo.value ='';
        skill.value ='';
        
        getDevelopers();






    });

});




/**
 * modal delete
 */
 const modal_delete = document.getElementById('deldata');

function modalDeleteData(id){


    modal_delete.setAttribute('delId' , id);


};

modal_delete.addEventListener('click' , function(){

    let del_id = this.getAttribute('delId');

axios.delete(`https://my-json-server.typicode.com/ridoydeveloper/js-class18/devs/${del_id}`).then(res => {


    getDevelopers();



})

});


/**
 * single data
 */

function modalSingekData(id){

    let modal_view = document.getElementById('modal_view');

    axios.get(`https://my-json-server.typicode.com/ridoydeveloper/js-class18/devs/${id}`).then(res => {


    modal_view.querySelector('.modal-body').innerHTML =`
    
 
    <div class="card">
    <img class="card-img" src="${res.data.photo}" alt="">
    <div class="card-body">
        <h2>${res.data.name}</h2>
        <h3>${res.data.skill}</h3>


    </div>
</div>

    
    
    `;



});

}