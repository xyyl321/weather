$(function(){
    $(".search").on("blur","input",function(){
        let cen=$(this).val()
        window.location.href="weather.html?location="+cen
    })
    let arr = ["北京", "天津", "上海", "广州", "深圳", "武汉", "成都", "杭州", "苏州", "临汾", "三亚", "贵州", "昆明", "西安", "沈阳", "大同", "拉萨", "呼和浩特", "包头", "乌鲁木齐", "齐齐哈尔", "西宁", "济南", "合肥"];
    let str = ""
    arr.forEach((v)=>{
        str+=`
        <li class="city-item">${v}</li>
        `
    })
    $(".city-list").html(str)
    $(".city-list").html(str)
$(".city-list").on("click",".city-item",function(){
    let a = this.innerText
    window.location.href="weather.html?location="+a
})
})

