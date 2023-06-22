const reconstruction_fee=1;
const rental_tax=5;

const cars=[
    {
        id:0,
        car_type:'kia',
        rent_type:'يومي',
        factory_date: '2020',
        rent_val:150000,
        images:['kia-k5.png']
    },
    {
        id:1,
        car_type:'audi',
        rent_type:'شهري',
        factory_date: '2020',
        rent_val:50000,
        images:['kia-k5.png']
    },
    {
        id:2,
        car_type:'bmw',
        rent_type:'يومي',
        factory_date: '2020',
        rent_val:70000,
        images:['kia-k5.png']
    },
    {
        id:3,
        car_type:'toyota',
        rent_type:'اسبوعي',
        factory_date: '2020',
        rent_val:96700,
        images:['kia-k5.png']
    },
];


function fetchData(){
    cars.forEach(car=>{

        document.querySelector('.cars-table-body').innerHTML+=`
        <tr>
            <td>${car.car_type}</td>
            <td>${car.factory_date}</td>
            <td>${car.rent_type}</td>
            <td>${car.rent_val + ((car.rent_val/100)*reconstruction_fee)+ ((car.rent_val/100)*rental_tax)} ل.س</td>
            <td>
                <a href="car.html?id=${car.id}">
                    <img src="images/cars/${car.images[0]}"/>
                </a>
            </td>
        </tr>
    `
    });
}


function getCar(){
    const urlParams = new URLSearchParams(window.location.search);
    const car=cars.filter(car => car.id == urlParams.get('id'))[0];

    document.getElementsByClassName('car-type')[0].innerText=car.car_type;
    document.getElementsByClassName('car-factory-date')[0].innerText=car.factory_date;
    document.getElementsByClassName('rent-cost')[0].innerText=car.rent_val;
    document.getElementsByClassName('rent-type')[0].innerText=car.rent_type;
    document.getElementsByClassName('rent-reconstruction-fee')[0].innerText=(car.rent_val/100)*reconstruction_fee;
    document.getElementsByClassName('rent-tax')[0].innerText=(car.rent_val/100)*rental_tax;
    document.getElementsByClassName('rent-total-cost')[0].innerText=car.rent_val+(car.rent_val/100)*rental_tax+(car.rent_val/100)*reconstruction_fee;

    car.images.forEach((image)=>{
        document.getElementsByClassName('car-images')[0].innerHTML+=`
            <div class="image">
                <img src="images/cars/${image}" alt="">
            </div>
        `;
    });
}


document.getElementById('agreement').addEventListener('change',(item)=>{
    if (item.target.checked){
        document.getElementsByClassName("form")[0].style.display="block";
        generate();
    }else{
        document.getElementsByClassName("form")[0].style.display="none";
    }
});


let captcha;
function generate() {

    captcha = document.getElementById("image");
    let uniquechar = "";
 
    const randomchar =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
    for (let i = 1; i < 5; i++) {
        uniquechar += randomchar.charAt(
            Math.random() * randomchar.length)
    }
 
    captcha.innerHTML = uniquechar;
}

function refeshCaptcha(){
    document.getElementsByClassName('error-message')[0].innerText='';
    document.getElementById("captchaInput").value="";
    generate();
}

const form = document.getElementById("formData");
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const usr_input = document.getElementById("captchaInput").value;
    if (usr_input == captcha.innerHTML) {
    
        nameRegex=new RegExp("^[ء-ي]+$", '');
        username=document.getElementById('name').value;
        if (!nameRegex.exec(username)){
            document.getElementsByClassName('name-error-message')[0].innerText="الرجاء إدخال احرف عربية فقط";
            return;
        }else{
            document.getElementsByClassName('name-error-message')[0].innerText="";
        }

        idRegex=new RegExp(/^[0-1]{1}[1-9]{10}$/);
        idnumber=document.getElementById('idnumber').value;
        if (!idRegex.exec(idnumber)){
             document.getElementsByClassName('idnumber-error-message')[0].innerText="الرقم الوطني خاطئ";    
             return;
        }else{
            document.getElementsByClassName('idnumber-error-message')[0].innerText=""; 
        }

        mobileRegex=new RegExp(/^09[3-9]{1}\d{7}$/);
        mobile=document.getElementById('mobile').value;
        if (!mobileRegex.exec(mobile)){
             document.getElementsByClassName('mobile-error-message')[0].innerText="رقم الهاتف خاطئ";
             return;
        }else{
            document.getElementsByClassName('mobile-error-message')[0].innerText="";
        }

        const total=document.getElementById('rentCount').value*(document.getElementsByClassName('rent-total-cost')[0].innerText);
        alert('التكلفة الإجمالية: '+total);
    }
    else {
        
        document.getElementsByClassName('refresh-captcha')[0].style.display="block";
        document.getElementsByClassName('error-message')[0].innerText="الرمز خاطئ الراجاء إعادة المحاولة";
        generate();
    }

    


});










 