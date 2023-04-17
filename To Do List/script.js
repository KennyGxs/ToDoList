

// To Do Eleman Ekleme

// Eleman Seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
//öğelerin storage bölümünden gelmesini istediğimiz için taskList dizisini kaldırıyoruz.
//let ile başlamamızın sebebi sabit değil değişken olmasını istiyoruz.

let todos;

//load items

loadItems();


eventListeners();

function eventListeners() {
    //submmit event
    form.addEventListener("submit", addNewItem);
    //delete an item
    taskList.addEventListener("click", deleteItem);
    //delete all item
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
    todos = getItemsFromLS();
    todos.forEach (function (item) {  //Anlamadım!!!!!!!!!
        createItem(item);
    })


}
    

// Get Items From Local Storage

function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos")); // JSON.parse ile string olarak gelen verileri array'a dönüştüyoruz böylece.        
    }
    return todos;  //Tüm bunların sonunda fonksiyonun tüm bunları döndürmesini istiyoruz.
}


// set item to Local storage

function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo); //dizimize eleman ekleyeceğiz bunun için push yapısını kullanabiliriz. 
    localStorage.setItem("todos", JSON.stringify(todos)) //JSON.stringify yapısı ile veriyi yukarıdakinin tersi olarak stringe çevirip yolluyoruz.

}





function createItem(newTodo) { //text olmasının sebebi yukarıda dizilerin içerisinden gelecek olan text elemanının yeni öğeyi oluşturacak olması.
    //li Oluşturma**

    const li = document.createElement("li"); //Li oluşturulma komutunu vermenin ardından li'lerin classnamelerini oluşturmalıyız.
    li.className = "list-group-item list-group-item-secondary";
    //input alanında girilen verileri li'ye bağlamamız gerekiyor.Bunu appendChild ile yapıyoruz.
    li.appendChild(document.createTextNode(newTodo));

    //daha sonrasında ikonlarımızı ekleyebilmek amacıyla bir de a oluşturmamız gerekmektedir.

    const a = document.createElement("a");
    //Burada birden fazla a elemanımız olduğu için a.className yerine a.classList metodunu kullanıyoruz.
    a.classList = ("delete-item float-right");
    a.setAttribute("href", "#");
    //daha sonra iconumuzu oluşturmalıyız
    a.innerHTML = '<i class="fas fa-times"></i>'; // iç ve dış tırnak işaretlerinin karışmaması için dışarısını tek tırnağa çeviriyoruz.

    li.appendChild(a);

    taskList.appendChild(li);
}



function addNewItem(e) {
    if (input.value === '') {
        alert("Alanı Doldurunuz!");
        // console.log("submit");
    }

    // create Item

    createItem(input.value);

    setItemToLS(input.value);


    input.value = ""; //input alanına veri girişinin ardından alanın boşalması için.

    e.preventDefault();  //Sayfanın yenilenmesini önler.

}

//Eleman Silme

function deleteItem(e) {
    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinize emin misiniz?")) { //Bunu sormadan önce çarpı işaretininin classını sorgulaması gerekir.
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        }
    }
    e.preventDefault();
}


//To Do'ları Storage'dan Silme

function deleteTodoFromStorage(deletetodo){
    let todos = getItemsFromLS();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1)
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));


}


//Tüm Elemanları Silme

function deleteAllItems(e) {

    if (confirm("Tüm Öğeyi Silmek İstediğinize Emin misiniz")) {
       
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear(); 
       
       
        // taskList.childNodes.forEach(function (item) {    //childNodes içerisinde forEach olduğu için bu yöntemi kullandık.
        //     if (item.nodeType === 1) {
        //         item.remove();
        //     }
        // })
    }

    //taskList.innerHTML = ""; //Bu örnek özelinde yukarıdaki yöntemin alternatifi olarak kullanabiliriz.

}
