

var images = [];

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    try{
        chrome.tabs.sendMessage(tabs[0].id, {action: "get_images"}, response => {
            $('.gallery').html('');
            images = response;
            (Array.isArray(response) && response.length > 0) ? 
            response.map((img) => {
                $('.gallery').append('<div class="box"> <img src="' + img.src + '" /> <div/>');
            }) : $('.gallery').append('<h1>No Images were found, please try different page.</h1>');
    
        })
    }catch(err){
        $('.gallery').append('<h1>No Images were found, please try different page.</h1>');
    }
})

$(document).on('click', '#download_all', (e) => {
    chrome.runtime.sendMessage({action: "download", data: images}, res => {
        console.log("Complete");
    })
})



$(document).on('click', '.help', (e) => {
    var windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
    window.open("help.html", "CNN_WindowName", windowFeatures);
})