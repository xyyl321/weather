let url = "https://free-api.heweather.net/s6/weather/now?"
let texts = "广州"
let key = "fd10f737bdd14e6cbb94541bb04040f0"
let url1 = "https://free-api.heweather.net/s6/air/now?"
let url2 = "https://free-api.heweather.net/s6/weather/forecast?"
function Daytay(url, key, texts) {
    $.ajax({
        url: url + "location=" + texts + "&key=" + key,
        success: function (s) {
            let con = s.HeWeather6[0]
            let day = con.now.tmp
            $(".riqi .en .a").text(day + "°")  //温度
            let daty = con.basic.parent_city
            $(".bodys .title").text(daty)  //地区
            let cond_txt = con.now.cond_txt
            $(".banner .taday").text(cond_txt)  //天气
            let snt = con.basic.admin_area
            $(".bodys .qu").text(snt)
            let hum = con.now.hum
            $(".banner .per").text("湿度" + " " + hum + "%") //湿度
        }
    })
}
Daytay(url, key, texts)
function prediction(url2, key, texts) {
    $.ajax({
        url: url2 + "location=" + texts + "&key=" + key,
        success: function (sno) {
            console.log(sno)
            let snt = sno.HeWeather6[0].daily_forecast[0].tmp_max
            $(".riqi .en .a").text(snt + "°")
            let snts = sno.HeWeather6[0].daily_forecast[0].tmp_min
            $(".riqi .en .c").text(snts + "°")
            let daily_forecast = sno.HeWeather6[0].daily_forecast
            let str = ""
            let stra = ""
            let sn
            let type = daily_forecast[0]
            let timer = type.date.slice(5).replace("-", "/")
            if (type.cond_txt_d == type.cond_txt_n) {
                sn = type.cond_txt_n
            } else {
                sn = type.cond_txt_d + "转" + type.cond_txt_n
            }
            str += `
                <div class="en">
                    <span class="a">${type.tmp_max}</span>
                    <span class="b">~</span>
                    <span class="c">${type.tmp_min}</span>
                    <span class="d">${sn}</span>
                    <img class="f" src="img/${type.cond_code_d}.png" alt="">
                    <img class="f" src="img/${type.cond_code_n}.png" alt="">
                </div>
                
                `;
            stra += `
                <div class="week">
                    <span class="text1">${timer}</span>
                    <span class="text2">今天</span>
                </div>
                `
            $(".en").html(str)
            $(".week").html(stra)
        }
    })
}
prediction(url2, key, texts)
function Daytay2(url1, key, texts) {
    $.ajax({
        url: url1 + "location=" + texts + "&key=" + key,
        success: function (sn) {
            let stn = sn.HeWeather6[0].air_now_city.qlty
            if (stn == "优") {
                let nps = document.querySelector(".bodys .jiantou1")
                nps.style.display = "block"
            } else {
                let nps = document.querySelector(".bodys .jiantou1")
                nps.style.display = "none"
            }
            if (stn == "良") {
                let nps = document.querySelector(".bodys .jiantou2")
                nps.style.display = "block"
            } else {
                let nps = document.querySelector(".bodys .jiantou2")
                nps.style.display = "none"
            }
            if (stn == "轻度") {
                let nps = document.querySelector(".bodys .jiantou3")
                nps.style.display = "block"
            } else {
                let nps = document.querySelector(".bodys .jiantou3")
                nps.style.display = "none"
            }
            if (stn == "中度") {
                let nps = document.querySelector(".bodys .jiantou4")
                nps.style.display = "block"
            } else {
                let nps = document.querySelector(".bodys .jiantou4")
                nps.style.display = "none"
            }
            if (stn == "重度") {
                let nps = document.querySelector(".bodys .jiantou5")
                nps.style.display = "block"
            } else {
                let nps = document.querySelector(".bodys .jiantou5")
                nps.style.display = "none"
            }
            if (stn == "严重") {
                let nps = document.querySelector(".bodys .jiantou6")
                nps.style.display = "block"
            } else {
                let nps = document.querySelector(".bodys .jiantou6")
                nps.style.display = "none"
            }
        }
    })
}
// Daytay2(url1,key,texts)
let url3 = "https://www.tianqiapi.com/api/?version=v1"
function getHours(url, location) {
    $.ajax({
        url: url + "&" + location,
        success: function (res) {
            console.log(res)
        }
    })
}
getHours(url3, texts)
$(function () {
    let a = window.location.search
    let b = a.split("=")[1]
    console.log(b)
    if (window.location != "") {
        let cen = b
        Daytay(url, key, cen)
        Daytay2(url1, key, cen)
        prediction(url2, key, cen)
    } else {
        Daytay(url, key, texts)
        Daytay2(url1, key, texts)
        prediction(url2, key, texts)
    }

    var size = $(window).innerWidth() / 7.5,
        //		depthNum = 1.15 * size,
        stretchNum = .5 * size;
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 0, //slide做3d旋转时Y轴的旋转角度。默认50。
            stretch: -stretchNum,//每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
            depth: 115, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
            slideShadows: false //开启slide阴影。默认 true。
        }
    })
})