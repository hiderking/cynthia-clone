function locoAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locoAnimation();

//gsap timeline;
var tl=gsap.timeline();
function loading(){
var a=0;
setInterval(function(){
    a++;
    a=Math.floor(Math.random()*15)+a;
    if(a<100){
        document.querySelector("#percent").innerHTML=a+"%"
    }
    else{
        a=100;
        document.querySelector("#percent").innerHTML=a+"%"
    }
   
},150)

}



tl.to("#percent",{
    scale:1.3,
    duration:1.5,
    delay:.2,
    onStart:loading
    
})
tl.to("#loading",{
   y:"-100vh",
   duration:2,
   
    
})

var timeout;
function firstPageAnim() {
   
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        tl.to(".boundingelem", {
            y: "0", 
             duration: 2,
            delay: -1,
            ease: Expo.easeInOut,
            stagger: .2

        })
        tl.from("#herofooter", {
            y: '-10',
            opacity: 0,
            duration: 1.5,
            delay: -.1,
            ease: Expo.easeInOut
        })
}
//define default scale value;
var xscale = 1;
var yscale = 1;



var xprev = 0;
var yprev = 0;

function circleChaptaKaro() {
    window.addEventListener("mousemove", function (details) {
        var xdiff = details.clientX - xprev;
        var ydiff = details.clientY - yprev;

        // xscale= gsap.utils.clamp(.8,1.2,xdiff=details.clientX-xprev);
        // yscale= gsap.utils.clamp(.8,1.2,ydiff)

        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, details.clientY - yprev)
        xprev = details.clientX
        yprev = details.clientY

        circleMouseFollower(xscale, yscale);

        var timeout = setTimeout(function () {
            clearTimeout(timeout)
            window.addEventListener("mousemove", function (dets) {
                document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`
            })
        }, 100);

    });
}
function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`
    })
}
circleMouseFollower();
firstPageAnim();
circleChaptaKaro();

 // elemAnimation
function elemAnimation(){

   



document.querySelectorAll(".elem").forEach(function (elem) {

    var rotate = 0;
    var diffrot = 0;


// mouseleave
    elem.addEventListener("mouseleave", function (dets) {
        //minicircle
        gsap.to("#minicircle",{
            width:"10px"
            ,height:"10px",
            left:"-5px",
            top:"-5px"

        })
        //minicircle p
        gsap.to("#minicircle p",{
            opacity:0,
            display:"none",
            ease:Power3,
            duration:0.5
    
         })
//img
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power1,
            duration:0.5

        })
        //elem h1
        gsap.to(elem.querySelector("h1"),{
            transform:"translateX(0)",
            opacity:0.7,
            duration:0.5,
            ease:Power3
        })
        //elem h1
        gsap.to(elem.querySelector("h5"),{
            opacity:0.7,
            ease:Power3
        })

        
    });

   

    elem.addEventListener("mousemove", function (dets) {
        //minicircle
        gsap.to("#minicircle",{
            width:"100px"
            ,height:"100px",
            left:"-50px",
            top:"-50px"
        });
        //minicircle p
        gsap.to("#minicircle p",{
            opacity:1,
            display:"block",
            ease:Power3,
            duration:0.5
    
         })

        var diff = dets.clientY - elem.getBoundingClientRect().top;
        
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        //img
      
        gsap.to(elem.querySelector("img"), 
        {  opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot*0.8)
        })
        //h1
        gsap.to(elem.querySelector("h1"),{
            transform:"translateX(25px)",
            opacity:0.3,
            duration:0.5,
            ease:Power3
        })
        //h5
        gsap.to(elem.querySelector("h5"),{
            
            opacity:0.3,
            duration:0.5,
            ease:Power3
        })
   
    });

});

}
elemAnimation()
// function btnAnimation(){
// document.querySelector("#btn").addEventListener("mousemove",function(){
//     gsap.to("#btn",{
//         backgroundColor:"rgba(255, 255, 255, 0.69)",
//     })
//     gsap.to("#about a",{
//         zIndex:1,
//         color:"black"
//     })
//     gsap.to("#minicircle",{
//         zIndex:"-1",
//         backgroundColor:"black",
//     })
//     console.log("hello")

// })


// document.querySelector("#btn").addEventListener("mouseleave",function(){
//     gsap.to("#minicircle",{
//         zIndex:"999",
//         backgroundColor:"white",
//     })
// })


// }
// btnAnimation();
