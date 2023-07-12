import { menuArray } from '/data.js'
let totalPrice = 0
const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const loginForm = document.getElementById('login-form')

modalCloseBtn.addEventListener('click', function(e){
    modal.style.display = 'none'
    const loginFormData = new FormData(loginForm)
    const name = loginFormData.get('full-name')
    e.preventDefault()
    document.getElementById('checkout').innerHTML = orderConfirm(name)
    document.getElementById('checkout').classList.remove('hidden')
    
})
document.addEventListener('click', function(e){
    if(e.target.dataset.menu){
        handleMenuClick(e.target.dataset.menu)
        document.getElementById('checkout').classList.remove('hidden')
    }
    else if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
    else if(e.target.dataset.order){
        modal.style.display = 'inline'
    }
})



function handleMenuClick(menuId){
    const targetMenuItem = menuArray.filter(function(item){
        return item.id === menuId
    })[0]
    targetMenuItem.inMenu = !targetMenuItem.inMenu
    renderCheckout(targetMenuItem)
}


function getMenuHtml(){
    let menuHTML = ''
    menuArray.forEach(function(item){
        let ingredientsHtml = ''
        if(item.ingredients.length > 0){
            item.ingredients.forEach(function(ingredient){
                ingredientsHtml+=`${ingredient} `
            })
        }
        menuHTML += `
        <div class="item">
            <div class="item-inner">
                <h1 class="item-pic">${item.emoji}</h1>
                <div class="item-txt">
                    <h2>${item.name}</h2>
                    <ul class="ingredient-list">${ingredientsHtml}</ul>
                    <p class="price">£${item.price}</p>
                </div>
                <div>
                    <i class="fa-regular fa-square-plus fa-2xl" data-menu="${item.id}"></i>
                </div>
            </div>
        </div>`
    })
    return menuHTML
}

function renderCheckout(item){
    let orderHtml = ''
    let checkoutArray = []
    totalPrice += item.price
    orderHtml += `
    <div class="menu-items">
        <p>${item.name}</p>
        <i class="fa-solid fa-trash" data-remove="${item.id}"></i>
        <span class="item-price">£${item.price}</span>
    </div>`
    document.getElementById('checkout-inner').innerHTML += orderHtml
    updateTotalPrice(totalPrice)
    
    
}

function removeItem(itemId){
    let totalPrice = 0
    let orderHtml = ''
    for(let item of menuArray){
        if(item.id === itemId){
            totalPrice = item.price
            orderHtml = `
            <div class="item">
                <p>${item.name}</p>
                <i class="fa-solid fa-trash" data-remove="${item.id}"></i>
                <span class="item-price">£${item.price}</span>
            </div>`
            
        }
    }
    document.getElementById('checkout-inner').innerHTML = orderHtml
    updateTotalPrice(totalPrice)
}

function updateTotalPrice(price){
    if(price > 0){
        document.getElementById('total-price').innerText = price
    } else {
        document.getElementById('total-price').innerText = price
    }
} 

    
function orderConfirm(name){
    let modal = ''
    modal = `
    <div class="confirmed">
        <h2>Thanks, ${name}! Your order is on the way!</h2>
    </div>
    `
    return modal
}

function renderMenu(){
    document.getElementById('menu').innerHTML = getMenuHtml()
}

renderMenu()
