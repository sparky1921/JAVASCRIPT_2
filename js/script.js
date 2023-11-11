$(function () {
    $('#photo-viewer').show().on('click', '.photo-box', function x(e) {
        var $content = $(this).clone().find('img').css({
            marginLeft: 0,
            marginTop: 0,
            width: '100%',
            height: 'auto'
        });
    
        var modal = $("#myModal");
       
 
        var modalImg = $("#img");
        $('.photo-box').on('click',  function(e){
            $(modal).show()
            $(modalImg).attr('src', $('.active').children('.myImg').map(function () {
                return $(this).attr('src')
                }).get());
        })
        

        var span = $(".close");
    
        span.on('click', function(e) { 
            e.preventDefault();
            $(modal).hide();
        })
    });
    });
