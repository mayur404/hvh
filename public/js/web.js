$(function(){
mixpanel.track("pageClick");
dWidth = $(document).width();
dHeight = $(document).height();
sHeight = $(window).height();
sWidth = $(window).width();
var progress = 65;
var pVisited = false;
FastClick.attach(document.body);

//Initialize Parse

Parse.initialize("fPqhSQ3vIBPh0GaWmgfIcLJs2ei7yjvJ9NWH0wwt", "tD1bvpBkj3awul69cU7mLIcDGzBDT1eEKBBVshZv");

var betaUser = Parse.Object.extend("betaUser");
var betaStore = Parse.Object.extend("betaStore");

if(detectmob()){
	//Mobile Device	
    mixpanel.track("mobileVisit");
	blockSize = dWidth/3;
    bottomHeight = dHeight*0.4;
    topWidth = dWidth;
    bottomWidth = dWidth;
    topHeight = dHeight - bottomHeight;
    setH('top',topHeight);
    setLT('top',0,0);
    setH('bottom',bottomHeight);
    setLT('bottom',0,topHeight);
    //$(".first").
    //$(".square").css({'width':'50px','height':'50px','margin-top':'-25px','margin-left':'-25px'});    
    gridHeight = blockSize*2;
    blockSize = blockSize+'px';
    $('.mGridItem').css({'width':blockSize,'height':blockSize});
    //$('.bt').css({'margin-top':gridHeight});
    setTimeout(function(){
        $(".loading").hide();
        $(".mobile").show();
        $(".mobile").transition({opacity:1},500);

        swiper = new Swiper('.swiper-mobile', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            direction: 'horizontal'
        });

        $('.pagination-mobile').css({'bottom':'48px'});
        document.body.style.webkitTouchCallout='none';
        $('.topSlide').each(function(){
            var tempHeight = $(this).height();
            diff = (topHeight - tempHeight)/2;
            $(this).css({'top':diff});
            if($(this).hasClass('full')){
                console.log('has');
                $(this).css({'top':dHeight/2});
                $(this).css({'margin-top':-tempHeight/2 - 30});
            }
            $(this).transition({opacity:1,delay:200},200);
            
        });

        swiper.on('slideChangeEnd', function () {
            console.log(swiper.activeIndex);
            if(swiper.activeIndex == 3){
                $('.actionInner').css({'background':'#FFB300','box-shadow':'0px 0px 15px rgba(21,21,21, 0.8)'});
                $('.actionBtn').css({'background':'#FFB300'});
                $('.innerFill').css({'background':'#FFB300'});
                $('.webBack').addClass('blackClass');
            }else{
                $('.actionInner').css({'background':'#E91E63','box-shadow':'0px 0px 15px rgba(81,45,168, 0.8)'});
                $('.actionBtn').css({'background':'#E91E63'});
                $('.innerFill').css({'background':'#E91E63'});
                $('.webBack').removeClass('blackClass');
            }
            if(swiper.activeIndex == 6){
                mixpanel.track("viewedComplete");
            }
        });

    },800);
    

}else{
	//Web Browser
    mixpanel.track("webVisit");
    $(window).resize(function(){
        location.reload();
    });

	console.log(dHeight);
	console.log(dWidth);
    padding = dHeight*.05;
    dHeight = dHeight*.9;
    dWidth = dWidth - 2*padding;
	blockSize = dHeight/4;
	rightWidth = blockSize*3;
    blockSize = blockSize*1.5;
	rightHeight = dHeight;
	leftHeight = dHeight;
	leftWidth = dWidth - rightWidth;
	console.log(leftWidth);
	setW('left',leftWidth);
	setLT('left',0,0);
	setW('right',rightWidth);
	setLT('right',leftWidth,0);
    setW('fillPanel',rightWidth);
    setLT('fillPanel',leftWidth,0);
    gridHeight = blockSize*3;
    blockSize = blockSize+'px';
    $('.gridItem').css({'width':blockSize,'height':blockSize});
    gridHeight = -gridHeight/2 +'px';
    console.log(gridHeight);
    $('.photoGrid').css({'margin-top':gridHeight});
    $(".web").css({'width':dWidth,'height':dHeight,'left':padding,'top':padding});
    setTimeout(function(){
        $('.loading').hide();
        $(".web").show();
        $(".web").transition({opacity:1},500);
        //transitDiv('loading','web');
        swiper = new Swiper('.swiper-web', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            direction: 'vertical',
            keyboardControl:true,
            mousewheelControl:true,
            mousewheelReleaseOnEdges:true
        });

        $('.pagination-web').css({'right':75,'z-index':102});
        $('.leftSlide').each(function(){
            var tempHeight = $(this).height();
            $(this).css({'margin-top':-tempHeight/2 - 100});
        });

        swiper.on('slideChangeEnd', function () {
            console.log(swiper.activeIndex);
            if(swiper.activeIndex == 3){
                $('.actionInner').css({'background':'#FFB300','box-shadow':'0px 0px 15px rgba(21,21,21, 0.8)'});
                $('.actionBtn').css({'background':'#FFB300'});
                $('.innerFill').css({'background':'#FFB300'});
                $('.webBack').addClass('blackClass');
            }else{
                $('.actionInner').css({'background':'#E91E63','box-shadow':'0px 0px 15px rgba(81,45,168, 0.8)'});
                $('.actionBtn').css({'background':'#E91E63'});
                $('.innerFill').css({'background':'#E91E63'});
                $('.webBack').removeClass('blackClass');
            }
        });

    },800);
	


    

    //Detecting Mouse Scroll

 //Firefox
 $('.web').bind('DOMMouseScroll', function(e){
    if(e.originalEvent.detail > 0) {
         //console.log('Down');
         var currStamp = parseInt(new Date().getMilliseconds());
         //scroll down  wheelDir +1 for Down
         if(wheelDir != 1){
            //Let it scroll and reset wheelStamp
            wheelDir = 1;
            console.log("Shift Down");
            wheelStamp = parseInt(new Date().getMilliseconds());
            shiftDown();
         }else{
            
            difference = currStamp - wheelStamp;
            if(Math.abs(difference)>100){
                console.log("Shift Down");
                wheelStamp = parseInt(new Date().getMilliseconds());
                shiftDown();
            }
            //console.log("Difference: " + difference);
         }
                          
    }else {
         //console.log('Up');
         var currStamp = parseInt(new Date().getMilliseconds());
         //scroll up   wheelDir -1 for Up
         if(wheelDir != -1){
            //Let it scroll and reset wheelStamp
            wheelDir = -1; 
            console.log("Shift Up");
            wheelStamp = parseInt(new Date().getMilliseconds());
            shiftUp();
         }else{
            
            difference = currStamp - wheelStamp;   
            if(Math.abs(difference)>100){
                console.log("Shift Up");
                wheelStamp = parseInt(new Date().getMilliseconds());
                shiftUp();
            }
            //console.log("Difference: " + difference);
         }
         
    }
     //prevent page fom scrolling
     return false;
 });

 //IE, Opera, Safari
 $('.web').bind('mousewheel', function(e){
    var w = e.originalEvent.wheelDelta;
     if(e.originalEvent.wheelDelta < 0) {
         //console.log('Down');
         var currStamp = parseInt(new Date().getMilliseconds());
         //scroll down  wheelDir +1 for Down
         if(wheelDir != 1){
            //Let it scroll and reset wheelStamp
            wheelDir = 1;
            console.log("Shift Down");
            wheelStamp = parseInt(new Date().getMilliseconds());
            shiftDown();
         }else{
            
            difference = currStamp - wheelStamp;
            if(Math.abs(difference)>100){
                console.log("Shift Down");
                wheelStamp = parseInt(new Date().getMilliseconds());
                shiftDown();
            }
            //console.log("Difference: " + difference);
         }
                          
     }else {
         //console.log('Up');
         var currStamp = parseInt(new Date().getMilliseconds());
         //scroll up   wheelDir -1 for Up
         if(wheelDir != -1){
            //Let it scroll and reset wheelStamp
            wheelDir = -1; 
            console.log("Shift Up");
            wheelStamp = parseInt(new Date().getMilliseconds());
            shiftUp();
         }else{
            
            difference = currStamp - wheelStamp;   
            if(Math.abs(difference)>100){
                console.log("Shift Up");
                wheelStamp = parseInt(new Date().getMilliseconds());
                shiftUp();
            }
            //console.log("Difference: " + difference);
         }
         
     }

     //prevent page fom scrolling
     return false;
 });
}

$(".listBtn").click(function(){
	transitDiv('noForm','form');
});

$(".signBtn").click(function(){
    transitDiv('noSign','sign');
});

$(".to").bind('touchend',function(){
    $('.actionInner').transition({scale:[0,0]},500);
    $('.actionBtn').transition({scale:[0,0]},500);
    var sibling = $(this).parent().next().prop('className');
    $(this).parent().parent().prev().addClass('showFull');
    sibling = sibling.split(' '); 
    sibling = sibling[1];
    console.log("sibling:"+sibling);
    $('.pagination-mobile').transition({opacity:0},400);
    parent = $(this).parent().prop('className');
    console.log("parent:"+parent);
    parent = parent.split(' '); 
    parent = parent[1];
    console.log("parent:"+parent);
    $('.'+parent).transition({opacity:0},400,function(){
        $('.'+parent).hide();
    });
    $bottom = $(this).parent().parent().next();
    $(this).parent().parent().next().transition({opacity:0},400,function(){
        console.log($bottom);
        $bottom.hide();
        $('.'+sibling).show();
        console.log("sibling: "+sibling);
        adjust(sibling);
        $('.'+sibling).transition({opacity:1},400);
    });
    swiper.lockSwipes()
});

$(".back").bind('touchend',function(){
    $(".mobile").css({'overflow':'hidden'});
    var sibling = $(this).parent().prev().prop('className');
    $(this).parent().parent().prev().removeClass('showFull');
    sibling = sibling.split(' '); 
    sibling = sibling[1];
    console.log("sibling:"+sibling);
    parent = $(this).parent().prop('className');
    console.log("parent:"+parent);
    parent = parent.split(' '); 
    parent = parent[1];
    $bottom = $(this).parent().parent().next();
    $('.'+parent).transition({opacity:0},400,function(){
        $('.actionInner').transition({scale:[1,1]},400);
        $('.actionBtn').transition({scale:[1,1]},400);
        $('.pagination-mobile').transition({opacity:1},400);
        $('.'+parent).hide();
        $('.'+sibling).show();
        $('.'+sibling).css({'opacity':0});
        $('.'+sibling).transition({opacity:1},400);
        $bottom.show();
        $bottom.css({'opacity':0});
        $bottom.transition({opacity:1},400);
    });

    swiper.unlockSwipes()
});

$(".mListBtnDone").bind('touchend',function(){
    storeName = $(".storeName").val();
    locality = $(".locality").val();
    contactName = $(".contactName").val();
    contactEmail = $(".contactEmail").val();
    contactNumber = $(".contactNumber").val();

    if(storeName!='' && locality!='' && contactName!='' && contactEmail!='' && contactNumber!=''){
        $('.listInput').hide();
        $('.mListBtnDone').hide();
        $('.afterList').show();
        adjust('mForm');  
        var store = new betaStore();
        store.set("name",storeName);
        store.set("locality",locality);
        store.set("contactName",contactName);
        store.set("contactEmail",contactEmail);
        store.set("contactNumber",contactNumber);
        store.save();
        mixpanel.track("betaStoreRegistered");
    }else{
        $('.listInput').transition({opacity:0.2},100,function(){
            $('.listInput').transition({opacity:0.9},150);
        });
    }
    
});
$(".mSignBtnDone").bind('touchend',function(){
    name = $('.nameInput').val();
    email = $('.emailInput').val()

    if($('.nameInput').val()!=''&& $(".emailInput").val()!=''){
        $('.betaName').html(name);
        $('.signInput').hide();
        $('.mSignBtnDone').hide();
        $('.afterSign').show();
        adjust('mForm');
        var user = new betaUser();
        user.set("name",name);
        user.set("email",email);
        user.save();
        mixpanel.track("betaUserRegistered");
    }else{
        $('.signInput').transition({opacity:0.2},100,function(){
            $('.signInput').transition({opacity:0.9},150);
        });
    }
    
});

$(".mProgressBtn").bind('touchend',function(){
    $('.actionInner').transition({scale:[0,0]},500);
    $('.actionBtn').transition({scale:[0,0]},500);
    $('.pagination-mobile').transition({opacity:0},400);
    transitDiv('swiper-mobile','appProgress');
    halfProgress = progress - 50;
    time = 800;
    if(!pVisited){
        setTimeout(function(){
            //$('.rotate').transition()
            var i = 0;
            var interval = setInterval(function(){
                i=i+1;
                if(i>progress){
                    clearInterval(interval);
                }else{
                    $('.per').html(i);    
                }

            },time/progress);

            //Circle Animation
            midTime = time*50/progress;
            remTime = time - midTime;
            remAngle = Math.abs(halfProgress*180/100);
            remAngle = remAngle + 15;
            backAngle = remAngle - 15;
            remAngle = remAngle+'deg';
            backAngle = backAngle+'deg';
            $('.rotate').transition({rotate:'180deg'},midTime,'linear',function(){
                $('.cover-left').hide();
                $('.cover-right').show();
                $('.rotate').hide();
                $('.rotateOther').show();
                $('.rotateOther').transition({rotate:remAngle},remTime,'linear',function(){
                    $('.rotateOther').transition({rotate:backAngle},150,'linear',function(){
                        $('.progressBackBtn').transition({opacity:1},400);
                    });    
                });
            });

        },400);
        pVisited = true;
    }
});

$(".progressBackBtn").bind('touchend',function(){
    transitDiv('appProgress','swiper-mobile');
    $('.actionInner').transition({scale:[1,1]},500);
    $('.actionBtn').transition({scale:[1,1]},500);
    $('.pagination-mobile').transition({opacity:1},400);
});

$(".mLittleBtn").bind('touchend',function(){
     window.open(
         'http://littleboat.io',
         '_blank'
     );
});

$(".visitBtn").bind('click',function(){
     window.open(
         'http://littleboat.io',
         '_blank'
     );
});

$(".mContactBtn").bind('touchend',function(){
     window.open('mailto:get@klassy.in?subject=Hello%20again');
});

$(".emailBtn").bind('click',function(){
     window.open('mailto:get@klassy.in?subject=Hello%20again');
});

$(".mob").bind('click',function(){
     window.open('tel:9172559095');
});

$(".email").bind('click',function(){
     window.open('mailto:get@klassy.in?subject=Hello%20again');
});

$(".fb").bind('click',function(){
    window.open(
         'http://fb.me/getklassy',
         '_blank'
    );
});

$(".t").bind('click',function(){
    window.open(
         'http://twitter.com/getklassy',
         '_blank'
    );
});

$(".blg").bind('click',function(){
    window.open(
         'http://medium.com/@getklassy',
         '_blank'
    );
});

$(".navList").click(function(){
    $(this).toggleClass('active');
    if($(this).hasClass('active')){
            $(".navPanel").show();
            $(".outerFill").transition({opacity:0.85},500);
            $(".innerFill").transition({scale:[150,150]},1000);
            temp = $(".navBar").height();
            $('.navBar').css({'top':dHeight/2});
            $('.navBar').css({'margin-top':-temp/2});
            $('.navBar').transition({opacity:1},1000);
  
    }else{
        $('.navBar').css({'opacity':0});
        $(".outerFill").transition({opacity:0},800,function(){
            $('.navPanel').hide();
        });
        $(".innerFill").transition({scale:[0,0]},500);
    }
    
});
//Changing input

$('.inputBox').change(function(){
    $(this).css({'color':'#FFB300'});
})

$('.signMe').change(function(){
    $(this).css({'color':'#E91E63'});
})

$('.signInput').change(function(){
    $(this).css({'color':'#E91E63'});
})

//Handing Resizing Issues



//All Btn events

$(".callBackBtn").click(function(){
    wStoreName = $(".wStore").val();
    wStoreLocality = $(".wStoreLocality").val();
    wContactName = $(".wContactName").val();
    wContactEmail = $(".wContactEmail").val();
    wContactNumber = $(".wContactNumber").val();
    if(wStoreName!=''&&wStoreLocality!=''&&wContactName!=''&&wContactEmail!=''&&wContactNumber!=''){
        var store = new betaStore();
        store.set("name",wStoreName);
        store.set("locality",wStoreLocality);
        store.set("contactName",contactName);
        store.set("contactEmail",wContactEmail);
        store.set("contactNumber",wContactNumber);
        store.save();
        mixpanel.track("betaStoreRegistered");
        $('.noForm').children('.statement').html("thank you!</br></br> we will get back to you asap.")
        $('.listBtn').hide();
        $('.callBackBtn').hide();
        $('.lessMargin').hide();
        transitDiv('form','noForm');
    }else{
        $('.inputBox').transition({opacity:0.2},100,function(){
            $('.inputBox').transition({opacity:0.9},150);
        });
    }   
    
});

$(".signMeUpBtn").click(function(){

    wName = $(".wName").val();
    wEmail = $(".wEmail").val();

    if(wName!=''&&wEmail!=''){
        var user = new betaUser();
        user.set("name",wName);
        user.set("email",wEmail);
        user.save();
        mixpanel.track("betaUserRegistered");
        $('.noSign').children('.statement').html(wName+",<br/>welcome to the club!")
        $('.signBtn').hide();
        $('.signMeUpBtn').hide();
        $('.lessMargin').hide();
        transitDiv('sign','noSign');
    }else{
        $('.inputBox').transition({opacity:0.2},100,function(){
            $('.inputBox').transition({opacity:0.9},150);
        });
    }

});


$(".actionInner").bind('click',function(){
    var scaleFactor = dHeight/20;
    if(menu){
        $('.menu').hide();
        $('.menu').css({'opacity':0});
        $('.actionBtn').transition({scale:[1,1]},500,function(){
            $('.actionInner').removeClass('noBoxShadow');
        });
        $('.actionInner').transition({rotate:'0deg'},500);

        menu = false;
    }else{
        $('.menu').show();
        var tempHeight = $('.menu').height();
        $('.menu').css({'margin-top':-tempHeight/2});
        $('.actionInner').addClass('noBoxShadow');
        $('.menu').transition({opacity:1},1600);
        $('.actionBtn').transition({scale:[scaleFactor,scaleFactor]},800);
        $('.actionInner').transition({rotate:'45deg'},800);
        menu = true;

    }
});

$('.menuItem').bind('touchend',function(){
        elem = $(this).prop('className');
        elem = elem.split(' ');
        console.log("Menu Clicked:" + elem[1]);
        setTimeout(function(){
            $('.menu').hide();
            $('.menu').css({'opacity':0});
            $('.actionBtn').transition({scale:[1,1]},500,function(){
                $('.actionInner').removeClass('noBoxShadow');
            });
            $('.actionInner').transition({rotate:'0deg'},500,function(){
                console.log('Inner');
                currIndex  = swiper.activeIndex;
                switch(elem[1]){
                    case 'navHome':
                        mul = Math.abs(currIndex - 0);
                        swiper.slideTo(0,200*mul);
                    break;
                    case 'navSign':
                        mul = Math.abs(currIndex - 1);
                        swiper.slideTo(1,200*mul);
                    break;
                    case 'navBusiness':
                        mul = Math.abs(currIndex - 3);
                        swiper.slideTo(3,200*mul);
                    break;
                    case 'navBlog':
                        window.open(
                          'http://medium.com/@getklassy',
                          '_blank'
                        );
                        mixpanel.track("navigatedBlog");
                    break;
                    case 'navApp':
                        mul = Math.abs(currIndex - 4);
                        swiper.slideTo(4,200*mul);
                    break;
                    case 'navAbout':
                        mul = Math.abs(currIndex - 5);
                        swiper.slideTo(5,200*mul);
                    break;
                    case 'navContact':
                        mul = Math.abs(currIndex - 6);
                        swiper.slideTo(6,200*mul);
                    break;
                }
            });
            menu = false;
        },100);
        
});


$('.nav').bind('click',function(){
        elem = $(this).prop('className');
        elem = elem.split(' ');
        console.log("Menu Clicked:" + elem[1]);
                console.log('Inner');
                currIndex  = swiper.activeIndex;
                $('.navList').toggleClass('active');
                $('.navBar').css({'opacity':0});
                $(".outerFill").transition({opacity:0},800,function(){
                    $('.navPanel').hide();
                });
                $(".innerFill").transition({scale:[0,0]},500);
                switch(elem[1]){
                    case 'wSignUp':
                        mul = Math.abs(currIndex - 1);
                        swiper.slideTo(1,200*mul);
                    break;
                    case 'wBusiness':
                        mul = Math.abs(currIndex - 3);
                        swiper.slideTo(3,200*mul);
                    break;
                    case 'wApp':
                        mul = Math.abs(currIndex - 4);
                        swiper.slideTo(4,200*mul);
                    break;
                    case 'wAbout':
                        mul = Math.abs(currIndex - 5);
                        swiper.slideTo(5,200*mul);
                    break;
                    case 'wBlog':
                        window.open(
                          'http://medium.com/@getklassy',
                          '_blank'
                        );
                        mixpanel.track("navigatedBlog");
                    break;
                    case 'wContact':
                        mul = Math.abs(currIndex - 6);
                        swiper.slideTo(6,200*mul);
                    break;
                }
});

//Swiper Events




}); // Jquery Ends Here   --------------------------------------------------------------------------------------

var dHeight;
var dWidth;
var sHeight;
var sWidth;
var blockSize;
var leftWidth;
var leftHeight;
var rightWidth;
var rightHeight;
var topWidth;
var topHeight;
var bottomHeight;
var bottomWidth;
var wheelStamp = parseInt(new Date().getMilliseconds());
var wheelDir = 0;
var swiper;
var menu = false;
function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    if(window.screen.width < 800){
        return true;
    }else{
        return false;    
    }
    
  }
}

function setW(elem, width){
	var elem = '.'+elem;
	$(elem).css({'width':width});
}

function setH(elem, height){
    var elem = '.'+elem;
    $(elem).css({'height':height});
}

function setLT(elem, left, top){
	var elem = '.'+elem;
	$(elem).css({'left':left,'top':top});
}


function shiftDown(){
    //swiper.slideNext();
}

function shiftUp(){
    //swiper.slidePrev();
}

function transitDiv(from,to,adjust,time,page,pagination){
        if(time){
            var tTime = time;
        }else{
            var tTime = 400;
        }
        if(page){
            if(pagination){
                $('.pagination-mobile').transition({opacity:0},400);    
            }else{
                $('.pagination-mobile').transition({opacity:1},400);
            }
            
        }
        $("."+from).transition({opacity:0},400,function(){
        $("."+from).hide();
        $("."+to).show();
        $("."+to).css({opacity:0});
        if(adjust){
            var tempHeight = $(this).height();
            $('.'+to).css({'margin-top':-tempHeight/2 - 100});
        }
        $("."+to).transition({opacity:1},tTime);  
    });
    
}

function adjust(elem){
     
        var tempHeight = $('.' + elem).height();
        console.log(tempHeight);
        if(tempHeight > dHeight){
            console.log("Overflow");
            $('.'+elem).css({'top':0});
            $(".mobile").css({'overflow-y':'scroll'});
        }else{
            console.log("In Aukad");
            $('.'+elem).css({'top':dHeight/2});
            $('.'+elem).css({'margin-top':-tempHeight/2 - 30});
            $(".mobile").css({'overflow-y':'scroll'});
        }
        //var final = tempHeight * 100 /60;
        //final = final - tempHeight;
        
        
}