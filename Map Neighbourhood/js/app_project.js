//global vaiables used by all
//array of objects(locations) every object have its own lat,lng ant title
var locations = [
    { title: 'Park Ave Penthouse', lat: 40.7713024, lng: -73.9632393 },
    { title: 'Chelsea Loft', lat: 40.7444883, lng: -73.9949465 },
    { title: 'Union Square Open Floor Plan', lat: 40.7347062, lng: -73.9895759 },
    { title: 'East Village Hip Studio', lat: 40.7281777, lng: -73.984377 },
    { title: 'TriBeCa Artsy Bachelor Pad', lat: 40.7195264, lng: -74.0089934 },
    { title: 'Chinatown Homey Space', lat: 40.7180628, lng: -73.9961237 }
];
//define the map and clientid and secretid for the foursquare api
var map;
var bounds;
var clientid = "V443OTCAQPJLCRY4QWBFYN3ZK5FDKGJOYDHLMI3O342IRVNN";
var clientsecret = "AK1JHLEG2D2KW14WF5HYVFNTUYFTBXYS4LDUUNRAHPR5URLB";
//used ti get the phone_number in much readable way 
function formatPhone(phonenum) {
    var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regexObj.test(phonenum)) {
        var parts = phonenum.match(regexObj);
        var phone = "";
        if (parts[1]) { phone += "+1 (" + parts[1] + ") "; }
        phone += parts[2] + "-" + parts[3];
        return phone;
    } else {
        //invalid phone number
        return phonenum;
    }
}
//used to create an array of locationa and events on them 
function actionmap(location) {
    var self = this;
    bounds.extend(location)
    this.title = location.title;
    this.lat = location.lat;
    this.lng = location.lng;
    this.visible = ko.observable(true);
    this.phone_number = "";
    this.city = "";
    this.street = "";
    this.url = "";
    this.info = "";
    //init the info of the location 
    this.info = "<div><br>name:" + self.title + "<br>Lat:" + self.lat.toString() +
        "<br>Lng:" + self.lng.toString();
    //foursquare url 
    var foursquare = 'https://api.foursquare.com/v2/venues/search?ll=' +
        self.lat + ',' + self.lng + '&client_id=' +
        clientid + '&client_secret=' + clientsecret + '&v=20160118' +
        '&query=' + self.title;
    //asyncronously we try to get info from foursquare
    //here we use $.getJSON method on jquery to get response in json format
    $.getJSON(foursquare).done(function(data) {
        //recive the json result of respone in temporarly variable to handle 
        //the data and extract info from it
        var output = data.response.venues[0];
        //used try catch to handle errors 
        //take your attention output may contain url,street,city,phone 
        //or may not 
        try {
            self.url = output.url;
            if (typeof self.url === 'undefined') {
                self.url = "can't resolve url"
            }
        } catch (err) {
            self.url = "can't resove url";
        }
        self.info += "<br>Url:" + self.url
        try {
            self.street = output.location.formattedAddress[0];
        } catch (err) {
            self.street = "cant resolve street"
        }
        self.info += "<br>Street:" + self.street
            //console.log(self.street);
        try {
            self.city = output.location.formattedAddress[1];
        } catch (err) {
            self.city = "can't resolve city";
        }
        self.info += "<br>City:" + self.city;
        // console.log(self.city);
        try {
            self.phone_number = output.contact.phone;
            if (typeof self.phone_number === 'undefined') {
                self.phone_number = "can't resolve phone number";
            } else {
                self.phone_number = formatPhone(self.phone_number);
            }
        } catch (err) {
            self.phone_number = "can't resolve phone number"
        }
        self.info += "<br>Phone:" + self.phone_number + "</div>"
            //in case there is errors or special cases of retriving info from 
            //foursquare
    }).fail(function() {
        alert("There was an error with the Foursquare API call. Please refresh the page and try again to load Foursquare data.");
    });
    //define infowindow
    this.infowindow = new google.maps.InfoWindow({ content: self.info });
    //define marker
    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lng),
        map: map,
        title: location.title,
        animation: google.maps.Animation.DROP
    });
    //used to display the special marker of visible==true
    //with help of property visible we can control on what we display
    this.displaymarker = ko.computed(function() {
        if (self.visible() === true) {
            self.marker.setMap(map);
        } else {
            self.marker.setMap(null);
        };
    }, self);

    //add click event on markers 
    this.marker.addListener("click", function() {
        self.infowindow.setContent(self.info);
        self.infowindow.open(map, this);
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.marker.setAnimation(null);
        }, 2100);

    }, self);
    //used to active the event click on listitems 
    this.activate_it = function(item) {
        google.maps.event.trigger(self.marker, 'click');
    }
}
//this function used to action the map and set propertires for each location
function ViewModel() {
    var self = this;
    bounds = new google.maps.LatLngBounds();
    //to recive the entered text at search 
    this.filterlocation = ko.observable("");
    //action the map global vaiable and init it with the first loaction 
    //of locations array
    map = new google.maps.Map(document.getElementById("map"), {
        title: 'Park Ave Penthouse',
        center: { lat: 40.7713024, lng: -73.9632393 },
        zoom: 10,

    });
    map.fitBounds(bounds);
    //transfer the locations array into observableArray 
    this.maplocations = ko.observableArray([]);
    locations.forEach(function(element) {
        self.maplocations.push(new actionmap(element));
    });

    //action the map and listed item to the entered text in search 
    this.filter = ko.computed(function() {
        var entered = self.filterlocation().toLowerCase();
        if (!entered) {
            //if the entered text in search have no value 
            //them all items will displayed as normal 
            self.maplocations().forEach(function(locationItem) {
                locationItem.visible(true);
            });
            return self.maplocations();
        } else {
            /*
            if the entered text on search have a value 
            filter the observableArray to mactch the entered text at search 
        
            */
            return ko.utils.arrayFilter(self.maplocations(), function(locationItem) {
                var string = locationItem.title.toLowerCase();
                var result = (string.search(entered) >= 0);
                locationItem.visible(result);
                console.log(result)
                return result;
            });
        }
    }, self);
}
//applay ko to add its bindings 
function initapp() {
    ko.applyBindings(new ViewModel());
}
//on error will load the map
function badevents() {
    alert("Google Maps has failed to load." +
        "Please check your internet connection and try again.");
}