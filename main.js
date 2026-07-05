//GetTotalPrice

let Price = document.getElementById('price');
let Taxes = document.getElementById('taxes');
let Ads = document.getElementById('ads');
let Discount = document.getElementById('discount');
let Total = document.getElementById('total');

function GetTotalPrice()
{
    if(Price.value != '')
    {
        result = (+Price.value + +Taxes.value + +Ads.value) - +Discount.value
        Total.innerHTML = result;
        Total.style.backgroundColor = 'green'
    }
    else
    {
        Total.innerHTML = '-';
        Total.style.backgroundColor = 'red';
    }
}

//Add New Product
let submit = document.getElementById('submit');
let count = document.getElementById('count')
let category = document.getElementById('category')


let productslist;
if(localStorage.Product != null)
{
    productslist = JSON.parse(localStorage.getItem('Product'));
}
else
{
    productslist = []
}


submit.onclick = function AddNewProduct()
{
    let newproductobj =
    {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }

    productslist.push(newproductobj);

    localStorage.setItem('Product',JSON.stringify(productslist));

    clearinputs();

}

function clearinputs()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    discount.value = '';
    ads.value = '';

}

function showtabledata()
{
    let table = '';
    
    for(let i = 0; i<productslist.length; i++)
    {
        table += 
        `<tr>
                <td>${i}</td>
                <td>${productslist[i].title}</td>
                <td>${productslist[i].price}</td>
                <td>${productslist[i].taxes}</td>
                <td>${productslist[i].ads}</td>
                <td>${productslist[i].discount}</td>
                <td>${productslist[i].total}</td>
                <td>${productslist[i].category}</td>
                <td><button id="update">Update</button></td>
                <td><button id="delete">Delete</button></td>
                </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
}

showtabledata();