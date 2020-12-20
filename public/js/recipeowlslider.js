
$('.owl-carousel').owlCarousel({
    center: true,
    items:1,
	loop:true,
    margin:30,
	responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:false
        },
		1000:{
            items:3,
            nav:false
        },
    }
})


