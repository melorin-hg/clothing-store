const productContainer=document.querySelector('.Product-container');
const womensBtn= document.querySelector('#women');
const mensBtn= document.querySelector('#men');
const childrensBtn= document.querySelector('#children');
const searchInputBox= document.querySelector('#search-inputbox');
const searchBtn= document.querySelector('#search-btn');
let all;let mens; let womens; let childrens; let SearchResults;
let showcaseProducts;
let category= 'all';
let dividedDisplayProducts=[];
let productPageNumber=0;
function categorySpleater(data){
    womens=data.filter(product=>product.category==='زنانه');
    mens=data.filter(product=>product.category==='مردانه');
    childrens= data.filter(product=>product.category==='بچگانه');
    setShowcaseProducts();
}
function setShowcaseProducts(){
    if(category==='all'){
        showcaseProducts=all;
    }else if(category==='women'){
        showcaseProducts=womens;
    }else if(category==='men'){
        showcaseProducts=mens;
    }else if(category==='children'){
        showcaseProducts=childrens;
    }
}
async function readData() {
    try{
        let response=await fetch('data/data.json');
        all = await response.json();
        showcaseProducts=all;
        createAllProductCard();
    }catch{
        console.log('error');
    }
}
function createAllProductCard(){
    
    showcaseProductsSpliter();
    productContainer.innerHTML='';
    dividedDisplayProducts[productPageNumber].forEach(product => {
            createProductCard(product.image_gallery[0],product.name,product.price);
    });
    createPagebuttons();
}
function showcaseProductsSpliter(){
    dividedDisplayProducts=[];
    for(let i=0;i<showcaseProducts.length;i+=20){
        dividedDisplayProducts.push(showcaseProducts.slice(i,i+20));
    }
}
function createPagebuttons(){
    const ProductDividerContainer=document.querySelector('.ProductDivider-container');
    ProductDividerContainer.innerHTML='';
    const previousPageBtn=document.createElement('button');
    const previousPageBtnText=document.createTextNode('<');
    ProductDividerContainer.appendChild(previousPageBtn);
    previousPageBtn.appendChild(previousPageBtnText);
    for (let i = 0; i<dividedDisplayProducts.length; i++){
        let PagenumberBtn=document.createElement('button');
        let PagenumberBtnText=document.createTextNode(i+1);
        PagenumberBtn.setAttribute('id',`page${i+1}`);
        if(i==productPageNumber){
            PagenumberBtn.style.cssText='border: var(--border-2);color: var(--primery-color);'
        }
        ProductDividerContainer.appendChild(PagenumberBtn);
        PagenumberBtn.appendChild(PagenumberBtnText);
        PagenumberBtn.addEventListener('click',()=>{
            productPageNumber=i;
            createAllProductCard();
        });
    }
    const nextPageBtn=document.createElement('button');
    const nextPageBtnText=document.createTextNode('>');
    ProductDividerContainer.appendChild(nextPageBtn);
    nextPageBtn.appendChild(nextPageBtnText);
}
function createProductCard(image,name,price){
    let productBox= document.createElement('div');
    productBox.classList.add('Product-box');
    let productImage= document.createElement('img');
    productImage.setAttribute('src',image);
    productImage.setAttribute('alt','product-image');
    productImage.addEventListener('error',()=>productImage.setAttribute('src','images/placeholder.jpg'));
    let productSpecificationsContainer=document.createElement('div');
    let productName= document.createElement('h4');
    productName.classList.add('productName');
    let productNameText= document.createTextNode(name);
    let priceAbuttonContainer= document.createElement('span');
    priceAbuttonContainer.classList.add('priceAbutton-container');
    let productPrice= document.createElement('span');
    let productPriceText= document.createTextNode(price);
    let productbtn= document.createElement('button');
    productbtn.classList.add('buttons');
    let productbtnText= document.createTextNode('افزودن به سبد');

    productContainer.appendChild(productBox);
    productBox.appendChild(productImage);
    productBox.appendChild(productSpecificationsContainer);
    productSpecificationsContainer.appendChild(productName);
    productName.appendChild(productNameText);
    productSpecificationsContainer.appendChild(priceAbuttonContainer);
    priceAbuttonContainer.appendChild(productPrice);
    productPrice.appendChild(productPriceText);
    priceAbuttonContainer.appendChild(productbtn);
    productbtn.appendChild(productbtnText);
}
function changeCategory(categoryName){
    category=categoryName;
    searchInputBox.value='';
    productPageNumber=0;
    categorySpleater(all);
    createAllProductCard();
}
function search(){
    let searchText=searchInputBox.value;
    SearchResults=showcaseProducts.filter(product=>product.name.slice(0,searchText.length)==searchText);
    if(SearchResults.length>0){
        showcaseProducts=SearchResults;
        createAllProductCard();
        setShowcaseProducts();   
    }else{
        productContainer.innerHTML='';

        const undifindeBox= document.createElement('div');
        undifindeBox.classList.add('undifinde-box');
        const undifindeImage=document.createElement('img');
        undifindeImage.setAttribute('src','images/undifinde.png');
        undifindeImage.setAttribute('alt','undifinde');
        undifindeImage.setAttribute('id','undifindeImage');
        const undifindeProduct=document.createElement('span');
        undifindeProduct.setAttribute('id','undifindProduct')
        const undifindeProductText=document.createTextNode('در دسته بندی تعیین شده چنین محصولی وجود ندارد.');

        productContainer.appendChild(undifindeBox);
        undifindeBox.appendChild(undifindeImage);
        undifindeBox.appendChild(undifindeProduct);
        undifindeProduct.appendChild(undifindeProductText);
    }  
}
readData();

womensBtn.addEventListener('click',()=>changeCategory('women'));
mensBtn.addEventListener('click',()=>changeCategory('men'));
childrensBtn.addEventListener('click',()=>changeCategory('children'));
searchBtn.addEventListener('click',search);