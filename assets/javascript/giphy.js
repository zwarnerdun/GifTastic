$(document).ready(function () {

    var topicsarray = ["Invader Zim", "CatDog", "Spongebob Squarepants", "Jimmy Neutron", "Rolli Polli Ollie"]

    // Add buttons for cartoons

    function renderButtons() {

        $("#cartoon-buttons").empty();

        for (i = 0; i < topicsarray.length; i++) {
            var btn = "<button class='btn-primary' data-cartoon='" + topicsarray[i] + "'>" + topicsarray[i] + " </button>"
            // btn.style.paddingLeft = "50px";
            // $("#cartoon-buttons").append("<button class='btn-primary' data-cartoon='" + topicsarray[i] + "'>" + topicsarray[i] + " </button>");
            // btn.css( { marginLeft : "5px", marginRight : "5px" } )
            $("#cartoon-buttons").append(btn);
            // btn.css( { "padding-right" : "10px" } );
        }

    }

 

    // renderButtons();

 

    // Adding a button for caroon entered

    $("#add").on("click", function () {

       

        event.preventDefault();

        // var cartoon = $("#cartooninput").val().trim();

        topicsarray.push($("#cartooninput").val().trim());

        renderButtons();

        return;

    });

 

    // Getting gifs from api... onto html

    $("#cartoon-buttons").on("click", ".btn-primary", function () {

        // $("#cartoons").empty();

        var cartoon = $(this).attr("data-cartoon");

        console.log(cartoon);

        // var queryURL = "https://api.giphy.com/v1/gifs/search?" +

        //     cartoon + "&api_key=O2e7KLJzpXXSL0tiQ3C6ZkfVxfUFagBA&q"
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=O2e7KLJzpXXSL0tiQ3C6ZkfVxfUFagBA&q="+ cartoon + "&limit=10&offset=&rating=G&lang=en"
 

        $.ajax({

            url: queryURL,

            method: "GET"

        }).done(function (response) {

            var results = response.data;

            $("#cartoons").empty();

            for (var i = 0; i < results.length; i++) {

                var cartoonDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var cartoonImg = $("<img>");

 

                cartoonImg.attr("src", results[i].images.original_still.url);

                cartoonImg.attr("data-still", results[i].images.original_still.url);

                cartoonImg.attr("data-animate", results[i].images.original.url);

                cartoonImg.attr("data-state", "still");

                cartoonImg.attr("class", "gif");

                cartoonDiv.append(p);

                cartoonDiv.append(cartoonImg);

                $("#cartoons").append(cartoonDiv);

            }

        });

    });

 

    function changeState(){

        var state = $(this).attr("data-state");

        var animateImage = $(this).attr("data-animate");

        var stillImage = $(this).attr("data-still");

 

        if (state == "still") {

            $(this).attr("src", animateImage);

            $(this).attr("data-state", "animate");

        }

 

        else if (state == "animate") {

            $(this).attr("src", stillImage);

            $(this).attr("data-state", "still");

        }

    }

 

    $(document).on("click", ".gif", changeState);

 

});


