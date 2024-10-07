var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDescription");
var productCategory = document.getElementById("productCategory");
var tableBody = document.getElementById("tableBody");
var btn = document.getElementById("addOrUpdate");
var currentIndex;

var productContainer = [];

//TODO: to retrieve data from local storage and display it
if(localStorage.getItem("myProducts")!==null){
    productContainer = JSON.parse(localStorage.getItem("myProducts"));
    displayProduct(productContainer);
}else{
    productContainer = [];
}

//TODO: function to add row
function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value,
        category: productCategory.value
    };
    productContainer.push(product);
    localStorage.setItem("myProducts",JSON.stringify(productContainer));
    displayProduct(productContainer);
    clearProduct();
}

//TODO: function to clear data from input fields
function clearProduct(){
    productName.value = "";
    productPrice.value = "";
    productDescription.value = "";
    productCategory.value = "";
    document.getElementById('inValidName').innerHTML = '';
    document.getElementById('inValidPrice').innerHTML = '';
    document.getElementById('inValidDes').innerHTML = '';
    document.getElementById('inValidCat').innerHTML = '';
    productName.classList.remove('is-valid');
    productName.classList.remove('is-invalid');
    productPrice.classList.remove('is-valid');
    productPrice.classList.remove('is-invalid');
    productDescription.classList.remove('is-valid');
    productDescription.classList.remove('is-invalid');
    productCategory.classList.remove('is-valid');
    productCategory.classList.remove('is-invalid');
}

//TODO: function to display data in table
function displayProduct(arrayContainer){
    var cartona = "";
    for(var i = 0; i< arrayContainer.length; i++){
        cartona += `<tr>
                        <td>${i+1}</td>
                        <td>${arrayContainer[i].name}</td>
                        <td>${arrayContainer[i].price}</td>
                        <td>${arrayContainer[i].description}</td>
                        <td>${arrayContainer[i].category}</td>
                        <td class="d-flex justify-content-evenly">
                            <button class="btn btn-warning" onclick="setProductToIndex(${i})">Update</button>
                            <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                        </td>
                    </tr>`;
    }
    tableBody.innerHTML = cartona;
}

//TODO: function to delete data of one selected row
function deleteProduct(index) {
    productContainer.splice(index,1);
    localStorage.setItem("myProducts",JSON.stringify(productContainer));
    displayProduct(productContainer);
}

//TODO: function to set values of selected row in inputs field to update
function setProductToIndex(index) {
    currentIndex = index;
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productDescription.value = productContainer[index].description;
    productCategory.value = productContainer[index].category;
    btn.innerHTML="Update Product";
    btn.className="btn btn-warning";
}

//TODO: function to switch between add function and update function and validate the data
function addOrUpdate() {
    if (btn.innerHTML.trim()=="Add Product") {
        if(regexValidationName()&&regexValidationPrice()&&regexValidationDes()&&regexValidationCat()){
            addProduct();
            document.getElementById('inValidName').innerHTML = '';
            document.getElementById('inValidPrice').innerHTML = '';
            document.getElementById('inValidDes').innerHTML = '';
            document.getElementById('inValidCat').innerHTML = '';
            productName.classList.remove('is-valid');
            productName.classList.remove('is-invalid');
            productPrice.classList.remove('is-valid');
            productPrice.classList.remove('is-invalid');
            productDescription.classList.remove('is-valid');
            productDescription.classList.remove('is-invalid');
            productCategory.classList.remove('is-valid');
            productCategory.classList.remove('is-invalid');
        }else{
            if (regexValidationName()==false) {
                document.getElementById('inValidName').innerHTML = ' *it is not valid'
            }else{
                document.getElementById('inValidName').innerHTML = ''
            }
            if (regexValidationPrice()==false) {
                document.getElementById('inValidPrice').innerHTML = ' *it is not valid'
            }
            if (regexValidationDes()==false) {
                document.getElementById('inValidDes').innerHTML = ' *it is not valid'
            }
            if (regexValidationCat()==false) {
                document.getElementById('inValidCat').innerHTML = ' *it is not valid'
            }
        }
    }else{
        if(regexValidationName()&&regexValidationPrice()&&regexValidationDes()&&regexValidationCat()){
            updateProduct();
            document.getElementById('inValidName').innerHTML = '';
            document.getElementById('inValidPrice').innerHTML = '';
            document.getElementById('inValidDes').innerHTML = '';
            document.getElementById('inValidCat').innerHTML = '';
            productName.classList.remove('is-valid');
            productName.classList.remove('is-invalid');
            productPrice.classList.remove('is-valid');
            productPrice.classList.remove('is-invalid');
            productDescription.classList.remove('is-valid');
            productDescription.classList.remove('is-invalid');
            productCategory.classList.remove('is-valid');
            productCategory.classList.remove('is-invalid');
        }else{
            if (regexValidationName()==false) {
                document.getElementById('inValidName').innerHTML = ' *it is not valid'
            }
            if (regexValidationPrice()==false) {
                document.getElementById('inValidPrice').innerHTML = ' *it is not valid'
            }
            if (regexValidationDes()==false) {
                document.getElementById('inValidDes').innerHTML = ' *it is not valid'
            }
            if (regexValidationCat()==false) {
                document.getElementById('inValidCat').innerHTML = ' *it is not valid'
            }
        }
    }
}

//TODO: function to update the row and change the button to add
function updateProduct(){
    productContainer[currentIndex].name = productName.value;
    productContainer[currentIndex].price = productPrice.value;
    productContainer[currentIndex].description = productDescription.value;
    productContainer[currentIndex].category = productCategory.value;
    localStorage.setItem("myProducts",JSON.stringify(productContainer));
    displayProduct(productContainer);
    btn.innerHTML="Add Product";
    btn.className="btn btn-success";
    clearProduct();
}

//TODO: function to search by name
function searchProduct(term){
    var searchContainer = [];
    for(var i = 0; i<productContainer.length; i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            searchContainer.push(productContainer[i]);  
        }
        displayProduct(searchContainer);
    }
}

//TODO: function to delete all data
function deleteAll(){
    if(confirm("Are you sure to delete all data permanently?"))
    {
        productContainer = [];
        localStorage.setItem("myProducts",JSON.stringify(productContainer));
        displayProduct(productContainer);
    }
}

//TODO: function to validate name input by regex
function regexValidationName(){
    var regex = /^[A-Z][a-z\s]{0,20}$/;
    if(regex.test(productName.value)){
            productName.classList.add('is-valid');
            productName.classList.remove('is-invalid');
            return true;
        }else{
            if(productName.value==""){
                productName.classList.remove('is-valid');
                productName.classList.remove('is-invalid');
                return false;
            }else{
                productName.classList.add('is-invalid');
                productName.classList.remove('is-valid');
                return false;
            }
        }
}

//TODO: function to validate price input by regex
function regexValidationPrice(){
    var regex = /^\d{1,6}\.{0,1}\d{0,2}$/;
    if(regex.test(productPrice.value)){
            productPrice.classList.add('is-valid');
            productPrice.classList.remove('is-invalid');
            return true;
        }else{
            if(productPrice.value==""){
                productPrice.classList.remove('is-valid');
                productPrice.classList.remove('is-invalid');
                return false;
            }else{
                productPrice.classList.add('is-invalid');
                productPrice.classList.remove('is-valid');
                return false;
            }
        }
}

//TODO: function to validate description input by regex
function regexValidationDes(){
    var regex = /^[a-zA-Z0-9\s]{1,100}$/;
    if(regex.test(productDescription.value)){
            productDescription.classList.add('is-valid');
            productDescription.classList.remove('is-invalid');
            return true;
        }else{
            if(productDescription.value==""){
                productDescription.classList.remove('is-valid');
                productDescription.classList.remove('is-invalid');
                return false;
            }else{
                productDescription.classList.add('is-invalid');
                productDescription.classList.remove('is-valid');
                return false;
            }
        }
}

//TODO: function to validate category input by regex
function regexValidationCat(){
    var regex = /^[a-zA-Z0-9\s]{1,20}$/;
    if(regex.test(productCategory.value)){
            productCategory.classList.add('is-valid');
            productCategory.classList.remove('is-invalid');
            return true;
        }else{
            if(productCategory.value==""){
                productCategory.classList.remove('is-valid');
                productCategory.classList.remove('is-invalid');
                return false;
            }else{
                productCategory.classList.add('is-invalid');
                productCategory.classList.remove('is-valid');
                return false;
            }
        }
}
