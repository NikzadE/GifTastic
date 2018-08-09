$(document).ready(function(){
    
    
    var topics = []
    
    
    function displayAnimal (){
        
        var animal = $(this).data("animal");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=ZQHf2I4NU7I09Vi0Qhcrnt9ryHujxBYi&limit=10";
        console.log (queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response){
            var results = response.data;
            for (var i = 0; i<results.length; i++) {
        
            var animalDiv = $("<div class='col-md-4'>");
            
            var rating = results[i].rating;
            var defaultAnimitaedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            var animalImage = $("<img>");
            var p = $("<p>").text("Rating: " + rating);
            
            animalImage.attr("src", staticSrc);
            animalImage.addClass("animalGiphy");
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", staticSrc);
            animalImage.attr("data-animate", defaultAnimitaedSrc);
            
            animalDiv.append(p)
            animalDiv.append(animalImage);
            $("#placeholder").prepend(animalDiv);

            }
        });
    }
    
    $("#add").on("click", function(event){
        event.preventDefault();
        var newAnimal = $("#idea").val().trim();
        topics.push(newAnimal);
        $("#idea").val('');
        displayButtons();
    });

    function displayButtons () {
        $("#newButtons").empty();
        for (var i = 0; i<topics.length; i++) {
            var a = $('<button class="btn btn-outline-primary">');
            a.attr("id", "animal");
            a.attr("data-animal", topics [i]);
            a.text(topics [i]);
            $("#newButtons").append (a);
        }
    }
    displayButtons();

    $(document).on("click", "animal", displayAnimal);

    $(document).on("click", ".animalGiphy", pausePlayGifs);
    function pausePlayGifs() {
        var state = $this.attr("data-state");

        if (state==="still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
             
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }
    }
});
