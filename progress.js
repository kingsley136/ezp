function prepareLoading() {
    const templateString = [
        '<div class="ezpContainer">',
        // path to empty image 
        '<img class="ezpImage" src="img/empty.png"/>',
        '</div>',
        '<div class="filled ezpContainer">',
        // path to filled image
        '<img class="ezpImage" src="img/filled.png"/>',
        '</div>',
        '<input type="hidden" id="ezpLoadedPercent" value="0">'
  ].join('');
  $('.ezpStandby').html($.parseHTML(templateString));
  $('.ezpStandby').on();
  $(".ezpStandby").fadeIn("slow");
};

function setCookie(key, value, expiry) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
    }

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function eraseCookie(key) {
    var keyValue = getCookie(key);
    setCookie(key, keyValue, '-1');
}

document.onreadystatechange = (e) => {
  if (!getCookie('ezpCookie')) {
    setCookie('ezpCookie', 1, 7);
    if(document.readyState=="interactive") {
      prepareLoading();
      let all = $("*");
      for (var i=0, max=all.length; i < max; i++) {
        updateProgress(all[i]);
      }
    }
  }
   
}

function updateProgress(ele) {
  const all = $("*");
  const step=100/all.length;

  if ($(ele).on()) {
    let loadedPercent = step + Number($("#ezpLoadedPercent")[0].value);
    
    $("#ezpLoadedPercent").val(loadedPercent < 25 ? loadedPercent + 25 : loadedPercent);

    $(".ezpContainer.filled").animate({
      width: loadedPercent + "%" 
    } , loadedPercent > Math.floor(Math.random() * 70) + 30 ? Math.floor(Math.random() * 20) + 5 : Math.floor(Math.random() * 10) + 5 ,() => {
      if(loadedPercent > 75) {
        $(".ezpStandby").fadeOut("slow");
      }     
    });
  } else  {
    updateProgress(ele);
  }
}