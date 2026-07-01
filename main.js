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