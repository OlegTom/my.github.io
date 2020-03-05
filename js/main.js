$(document).ready(function(){
	$('.carousel').carousel({
		interval: 5000,
	  	keyboard: true,
	    pause: 'hover',
	    ride: 'carousel',
	    wrap: true,
	});
});

$(document).ready(function(){
	$('.header').height($(window).height());
});
	$(".navbar a").click(function(){
		$("body,html").animate({
			scrollTop:$("#" + $(this).data('value')).offset().top
		},2000)
	});

$(document).ready(function(){
	$(".up").hide();     
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.up').fadeIn();
            } 
            else {
                $('.up').fadeOut();
            }
        }); 
        $('.up a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 2000);
            return false;
        });
    }); 
});

function calculate() {
    var currencySelect = document.getElementById("currencyCode");
    var currencyCode = currencySelect.options[currencySelect.selectedIndex].value;
    var currencyInfo = null;
    for(var i=0;i<exchangeRates.length;i++) {
        if(exchangeRates[i].cc === currencyCode) {
            currencyInfo = exchangeRates[i];
            break;
        }
    }
    var inputSum = document.getElementById("amount").value;
    document.getElementById("convertedAmount").value = (inputSum / currencyInfo.rate).toFixed(2);
}

function generateCourses(courses) {
    var currencySelect = document.getElementById("currencyCode");
    for (var i = 0; i < courses.length; i++) {
        var textBlock = document.createElement('div');
		var rateText = document.createTextNode(courses[i].rate);
        textBlock.appendChild(rateText);
		var tile = document.createElement('li');
		var h1 = document.createElement('h1');
		h1.innerHTML = courses[i].txt + '(' + courses[i].cc + ')';		
		tile.appendChild(h1);
		tile.appendChild(textBlock);		
		var container = document.getElementsByClassName('products-list')[0];
		container.appendChild(tile);
        var option = document.createElement('option');
		option.setAttribute('value', courses[i].cc);
		option.innerHTML=courses[i].txt + ' / ' +courses[i].cc;		
		currencySelect.appendChild(option);
    }
}

function processRequestData() {
	if (this.readyState == 4) {
		if (httpRequest.status == 200) {
			console.log('Response got.');			
			var result = JSON.parse(httpRequest.responseText);
            exchangeRates = result;
            generateCourses(result);
		} else {
			console.error('Request failed!');
		}
	}	
}

function getCourses() {
	console.log('Document loaded.');
	httpRequest = new XMLHttpRequest();	
	if (!httpRequest) {
		console.log('Error! Failed to create XMLHttpRequest!');
		return false;
	}
	httpRequest.onreadystatechange = processRequestData;
	httpRequest.open('GET', 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', true);
	/*https://bank.gov.ua/NBUStatService/v1/statdirectory/dollar_info?json*/
	httpRequest.send(null);	
}