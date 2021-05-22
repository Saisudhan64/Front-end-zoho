
var items = document.querySelector('.display');

var currentpage = 1;

var pageview = "grid";

var mainarray = [];

var scrolled = 0;

var searchword = "";

var debounce = true;

var sort = 0;

var flag = 0;

var data = null;

var r = 0;

var up = 0;

//function for making API calls. returns values which are to be displayed in the screen

//@param{page} is the page number of the API call which is supposed to be called for data

const getvalues = async (page) => {


    if (page == 1) { var APIURL = 'http://run.mocky.io/v3/6f7a76ed-d6f5-4b54-be23-bf9a141c982a' }

    if (page == 2) { var APIURL = 'http://run.mocky.io/v3/07316365-b8d2-4574-9bc1-22b17b054e3b' }

    if (page == 3) { var APIURL = 'http://run.mocky.io/v3/1c56213e-1191-4b47-a54f-066736165ff3' }

    const response = await fetch(APIURL);

    if (!response.ok) {

        alert("error has occured");

    }

    data = await response.json();

    mainarray = mainarray.concat(data);

    //To set the layout of the screen initially either as grid view or table view

    if (pageview == "grid") { document.querySelector('.grid').click(); }

    if (pageview == "table") { document.querySelector('.table').click(); }

    window.scrollTop = 120;


    decider();
}

//function is used to render the list of 80 elements on the screen

//@param{data} the array of data which are supposed to be rendered in the screen

function rendering(data) {

    items.innerHTML = ``;

    for (let item in data) {

        let div = document.createElement('div');

        div.classList.add('gfelement');

        div.innerHTML =

            `<img src=${data[item].image} alt="image here" class="image">
     
        <span class= "name">${data[item].name}</span>
     
        <span class= "description">${data[item].description}</span>`;

        items.appendChild(div);

    }
    if (pageview == "grid") { document.querySelector('.grid').click(); }

    if (pageview == "table") { document.querySelector('.table').click(); }

}

getvalues(currentpage);

//event listener added to capture the click on table view hyperlink to apply table view css

document.querySelector('.table').addEventListener("click", function () {

    document.querySelector('.grid').style.borderBottom = "1px solid blue";

    document.querySelector('.table').style.borderBottom = "none";

    pageview = "table";

    var maindiv = document.querySelector(".display");

    maindiv.classList.remove("displayg");

    maindiv.classList.add("displayt");

    var name = document.getElementsByClassName('name');

    var h1 = document.querySelector(".tableh").style.display = "inline-block";

    var h2 = document.querySelector(".tableh1").style.display = "inline-block";

    var h3 = document.querySelector(".tableh2").style.display = "inline-block";

    var description = document.getElementsByClassName('description');

    for (var i = 0; i < name.length; i++) {

        name[i].classList.remove("nameg");

        description[i].classList.remove("descriptiong");

        name[i].classList.add("namef");

        description[i].classList.add("descriptionf");

    }

});

//event listener added to capture the click on grid view hyperlink to apply grid views css

document.querySelector('.grid').addEventListener("click", function () {

    pageview = "grid";

    document.querySelector('.table').style.borderBottom = "1px solid blue";

    document.querySelector('.grid').style.borderBottom = "none";

    var maindiv = document.querySelector(".display");

    maindiv.classList.remove("displayt");

    maindiv.classList.add("displayg");

    var name = document.getElementsByClassName('name');

    var h1 = document.querySelector(".tableh").style.display = "none";

    var h2 = document.querySelector(".tableh1").style.display = "none";

    var h3 = document.querySelector(".tableh2").style.display = "none";

    var description = document.getElementsByClassName('description');

    for (var i = 0; i < name.length; i++) {


        name[i].classList.remove("namef");

        description[i].classList.remove("descriptionf");

        name[i].classList.add("nameg");

        description[i].classList.add("descriptiong");
    }

});

//function that gets called on scrolling which is used to get data from the API calls 

//function uses debouncing principle to prevent multiple API calls on scroll

window.onscroll = function () { myFunction(); };

function myFunction() {

    if (debounce) {

        debounce = false;

        scrolled = document.documentElement.scrollTop;

        var body = document.body

        var height = body.scrollHeight;

        scrollindicator = true;

        if (window.innerHeight + window.scrollY >= height - 500) {

            currentpage += 1;

            if (currentpage > 3) { currentpage = 1 }

            up++;

            getvalues(currentpage);

            scrollindicator = false

        }

        // if (window.scrollY <= 100 && up >= 1) {

        //     up--;

        //     getvalues(currentpage)
        // }

        setTimeout(function () { debounce = true; }, 300);

    }

}

//seperate function for searching and returning the value in the array of items from API call

//@param {val} is the value entered in the input field by the user

function searching(val) {

    var rarray = mainarray.filter(item =>

        item.name.includes(val))

    sort = 0;

    eighty(rarray)

}

//function for returning the sorted array in ascending descending and revert the sorting in array 

// @param {num} is the number which denotes the type of sorting to be performed on the data

function Sorting(num) {

    var array1 = mainarray.slice();

    if (num == 1 || num == 2) {

        items.innerHTML = ``

        array1 = array1.sort(dynamicsort("name", num))

        eighty(array1);

        function dynamicsort(property, order) {

            var sort_order = 1;

            if (order === 2) {

                sort_order = -1;

            }

            return function (a, b) {

                if (a[property] < b[property]) {

                    return -1 * sort_order;

                } else if (a[property] > b[property]) {

                    return 1 * sort_order;

                } else {

                    return 0 * sort_order;

                }

            }
        }
    }

    if (num == 3) {

        var array2 = mainarray.slice();

        flag = 0;

        eighty(array2);

    }
}

//event listener to capture the search word from the input field

document.querySelector('.input').addEventListener("keyup", function (evt) {

    searchword = this.value

    if (searchword != '') {

        r = 1;

    }

    else { r = 0; }

    decider();
});

//Event listener to capture the clicks for sorting the array 

document.querySelector('.sorting').addEventListener("click", function () {

    sort++;

    if (sort == 4) {

        sort = 1;

    }

    r = 2;

    decider();

});

//Function that slices the array to display eighty items on the screen

// @param {input} is the input array which is to be sliced to 80 elements

function eighty(input) {

    if (input.length < 80) {

        rendering(input);

    }

    else {

        var returnarray = input.slice(input.length - 80, input.length);

        rendering(returnarray);

    }

}

//Function that decides which functionality to call upon based on user interaction

function decider() {

    if (r == 0) { eighty(mainarray) }

    if (r == 1) { searching(searchword); }

    if (r == 2) { Sorting(sort); }

}

