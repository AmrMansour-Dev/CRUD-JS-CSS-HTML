//GetTotalPrice

let Price = document.getElementById('price');
let Taxes = document.getElementById('taxes');
let Ads = document.getElementById('ads');
let Discount = document.getElementById('discount');
let Total = document.getElementById('total');

let mode = 'create';
let temp;

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


submit.onclick = function()
{
    let productobj =
    {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }

    if(mode == 'create')
    {
        if(productobj.count > 0)
        {
            for(let i = 0; i < productobj.count; i++)
            {
            productslist.push(productobj);
            }
        }
        else
        {
            productslist.push(productobj);
        }
    }
    else
    {
        productslist[temp] = productobj;
        mode = 'create';
        submit.innerHTML = 'Create';
        count.style.display ='block'
    }



    localStorage.setItem('Product',JSON.stringify(productslist));

    clearinputs();
    showtabledata();
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
    GetTotalPrice();
    
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
                <td><button onclick = "update(${i})" id="update">Update</button></td>
                <td><button onclick = "deleteproduct(${i})" id="delete">Delete</button></td>
                </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteallbtn = document.getElementById('deleteall');

    if(productslist.length > 0)
    {
        deleteallbtn.innerHTML = `<button onclick = "deleteallproducts()">Delete All (${productslist.length})</button>`
    }
    else
    {
        deleteallbtn.innerHTML = ''
    }
}

showtabledata();

function deleteproduct(i)
{
    productslist.splice(i,1);
    localStorage.setItem('Product',JSON.stringify(productslist));
    showtabledata();
}

function deleteallproducts()
{
    productslist.splice(0);
    localStorage.clear();
    showtabledata();
}

let title = document.getElementById('title');

function update(i)
{
    title.value = productslist[i].title;
    price.value = productslist[i].price;
    Taxes.value = productslist[i].taxes;
    Ads.value = productslist[i].ads;
    Discount.value = productslist[i].discount;
    count.style.display = 'none'
    category.value = productslist[i].category;
    submit.innerHTML = 'Update';
    temp = i;
    mode = 'update'
    GetTotalPrice();
    
}

let SearchMode = 'SearchByTitle'

function GetSearchMode(id)
{
    SearchMode = id;
    let search = document.getElementById('searchbox');
    if(SearchMode == 'SearchByTitle')
    {
        search.placeholder = 'Search By Title'
    }
    else
    {
        search.placeholder = 'Search By Category'
    }
    search.value = ''
    search.focus();
    showtabledata();
}

function SearchTable(value)
{
    let table = '';

    for(let i = 0; i<productslist.length; i++)
    {
        if(SearchMode == 'SearchByTitle')
        {
            if(productslist[i].title.includes(value.toLowerCase()))
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
                <td><button onclick = "update(${i})" id="update">Update</button></td>
                <td><button onclick = "deleteproduct(${i})" id="delete">Delete</button></td>
                </tr>`

            }
        }
        else
        {
            if(productslist[i].category.includes(value))
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
                <td><button onclick = "update(${i})" id="update">Update</button></td>
                <td><button onclick = "deleteproduct(${i})" id="delete">Delete</button></td>
                </tr>`
            }
        }


    }

        document.getElementById('tbody').innerHTML = table;
}