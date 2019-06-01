var topicsarray = ["Invader Zim", "CatDog", "Spongebob Squarepants", "Jimmy Neutron", "Rolli Polli Ollie"]

$(document).ready(function() {
    
    for (var i = 0; i < topicsarray.length; i++) {
        $("#cartoon buttons").append("<button type='submit' (\"" + topicsarray[i] + "\")' class='btn btn-primary mb-2' value=' " + topicsarray[i] + "'> " + topicsarray[i] + " </button>");
    }

});

// ButtonClicked
function ButtonClicked() {
    var userInput = $('#cartooninput').val();
    searchGif(userInput);
        
}

// submitButton
function submitButton() {
    var userInput = $('#cartooninput').val();
    if (userInput) {
        $('#cartoon buttons').append("<button type='sumbit' (\"" + userInput + "\")' class='btn btn-primary mb-2' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

// searchGiphy
function searchGiphy(gifName) {
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?' + gifName + 'api_key=O2e7KLJzpXXSL0tiQ3C6ZkfVxfUFagBA&q=cartoons&limit=25&offset=0&rating=G&lang=en',
        type: 'GET',
    })
        .done(function(response) {
        displayGiphy(response);
    })
}
  

function displayGiphy(response) {
    $('#cartoons').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#cartoons').append(image);
    }
}; 

$('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
        $(this).attr('src', $(this).attr("data-still"));
        $(this).attr('data-state', 'still');
    }

});

