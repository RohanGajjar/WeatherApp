doit = () => {

    var httpres = new XMLHttpRequest();
    var postalcode = document.getElementById('id1').value
    if(postalcode==''){
        alert("Please enter a valid zip code")
    }
    var url = 'http://open.mapquestapi.com/geocoding/v1/address?key=TLzPGZnx5Dd0UlhaCREwbLzyrJGGhBYj&postalCode='+postalcode;

    httpres.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            console.log(postalcode)
            console.log(myArr);
            myFunction(myArr);
        }
    };
    httpres.open("GET", url, true);
    httpres.send();
}


function myFunction(arr) {
    document.getElementById('locationName').innerHTML = ''+arr['results']['0']['locations']['0']['adminArea5']
    let latitude = arr['results']['0']['locations']['0']['displayLatLng']['lat'];
    let longitude = arr['results']['0']['locations']['0']['displayLatLng']['lng'];
    doit2(latitude,longitude);
}
doit2 = (lat,long) => {

    var httpres1 = new XMLHttpRequest();
    console.log(lat)
      var url = 'https://api.weather.gov/points/'+lat+','+long;
    // var KEY = 'TLzPGZnx5Dd0UlhaCREwbLzyrJGGhBYj';
    var postalcode = document.getElementById('id1')
    // var url = 'http://open.mapquestapi.com/geocoding/v1/address?key='+KEY+'&postalCode='+ postalcode;

    httpres1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr1 = JSON.parse(this.responseText);
            console.log(myArr1);
            myFunction2(myArr1);
        }
    };
    httpres1.open("GET", url, true);
    httpres1.send();
}
function myFunction2(arr) {
    var gridX = arr['properties']['gridX'];
    var gridY = arr['properties']['gridY'];

    doit3(gridX,gridY);
}
doit3 = (x,y) => {
    let httpres2 = new XMLHttpRequest();
    let url = 'https://api.weather.gov/gridpoints/EAX/'+x+','+y+'';
    httpres2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr2 = JSON.parse(this.responseText);
            console.log(myArr2);
            myFunction3(myArr2);
        }
    };
    console.log(x);
    console.log(y);
    httpres2.open("GET", url, true);
    httpres2.send();

}
function myFunction3(arr) {
    var out = "";
    var i;
    console.log(arr);

    document.getElementById('temp').innerHTML ='Current Temp: '+Math.floor(arr['properties']['temperature']['values']['0']['value'])+'°C'
    document.getElementById(
        'humidity').innerHTML='Humidity: '+Math.floor(arr['properties']['relativeHumidity']['values']['0']['value'])+'%';
    document.getElementById(
        'high').innerHTML ='High: '+Math.floor(arr['properties']['maxTemperature']['values']['0']['value'])+'°C';
    document.getElementById(
        'low').innerHTML = 'Low: '+Math.floor(arr['properties']['minTemperature']['values']['0']['value'])+'°C';
    document.getElementById(
        'wind').innerHTML = 'Wind: '+Math.floor(arr['properties']['windSpeed']['values']['0']['value'])+' km/h';

    for(let i=1;i<8;i++){
        let x = arr['properties']['temperature']['values'][i]['validTime'];
        document.getElementById('samedate'+i).innerHTML ='Time: '+x.substr(11,8);
        document.getElementById('samedatelow'+i).innerHTML ='Temp: '+Math.floor(arr['properties']['temperature']['values'][i]['value'])+'°C';
    }
    document.getElementById(
         'weatherSymb').innerHTML = 'Current weather: '+arr['properties']['weather']['values']['3']['value']['0']['weather']+'';
    for(let i=1;i<8;i++){
        let x = arr['properties']['minTemperature']['values'][i]['validTime'];
        document.getElementById('date'+i).innerHTML =''+x.substr(0,10);
        document.getElementById('datelow'+i).innerHTML ='Low: '+Math.floor(arr['properties']['minTemperature']['values'][i]['value'])+'°C';
        document.getElementById('datehigh'+i).innerHTML ='High: '+Math.floor(arr['properties']['maxTemperature']['values'][i]['value'])+'°C';

    }

}
