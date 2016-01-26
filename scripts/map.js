
function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return "Basic " + hash;
}

function get_token(callback) {
    $.ajax
    ({
        type: "POST",
        url: "https://foxtest.herokuapp.com/v1/token",
        dataType: 'json',
        async: false,
        data: {  },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', make_base_auth("locafox", "LocaF#xes!"));
        },
        success: function(e) {

            callback(e)

        }
    });

}

function initMap(){

    get_token(function(token){
        console.log(token)
        $.ajax
        ({
            type: "POST",
            url: "https://foxtest.herokuapp.com/v1/offers",
            dataType: 'json',
            data: {
                "token": token.token,
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', make_base_auth("locafox", "LocaF#xes!"));
            },
            success: function(e){
                console.log(JSON.stringify(e));





                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 10,
                    center: new google.maps.LatLng(52.54493660551252, 13.299623261996308),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                var infowindow = new google.maps.InfoWindow();

                var marker, i;

                for(i=0; i< e.length; i++){
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(e[i].lat, e[i].long),
                        map: map
                    });
                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            infowindow.setContent(JSON.stringify(e[i].id));
                            infowindow.open(map, marker);
                        }
                    })(marker, i));


                }





            }

        });
        

    })
}


