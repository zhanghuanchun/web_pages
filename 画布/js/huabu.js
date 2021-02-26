function HuaBu(id, cvsobj) {

    // 获取容器
    var container = document.querySelector(id);
    // 获取画布，设置元素属性
    var cvs = container.querySelector("canvas");
    cvs.width = cvsobj.width;
    cvs.height = cvsobj.height;
    cvs.style.backgroundColor = cvsobj.bg;
    container.style.width = cvsobj.width + "px";
    container.style.height = cvsobj.height + "px";

    // 动态创建颜色选项卡
    var colorol = document.createElement("ol");
    colorol.className = "brushcolor";
    cvsobj.colors.forEach(function (value) {
        var coloritem = document.createElement("li");
        coloritem.className = "coloritem";
        coloritem.style.backgroundColor = value;
        colorol.appendChild(coloritem);
    });
    container.appendChild(colorol);

    // 动态创建笔刷大小选项
    //var brushsize = document.querySelector(".brushsize");
    var sizeul = document.createElement("ul");
    sizeul.className = "brushsize";
    cvsobj.sizes.forEach(value => {
        var sizeitem = document.createElement("li");
        sizeitem.className = "sizeitem";
        var sizespan = document.createElement("span");
        sizespan.style.height = value+"px";
        sizespan.style.borderRadius = value+"px";
        sizeitem.appendChild(sizespan);
        sizeul.appendChild(sizeitem);
    })
    container.appendChild(sizeul);

    // 设置鼠标监听事件，跟随鼠标画图
    var ctx = cvs.getContext('2d');
    
    var isMouseDown = false;

    

    cvs.onmousedown = function (e) {
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        isMouseDown = true;
    }
    cvs.onmousemove = function (e) {
        if (isMouseDown) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    }
    cvs.onmouseup = function () {
        isMouseDown = false;
    }
    container.addEventListener("mouseleave",function(){
        isMouseDown = false;
    })
    
    // 设置颜色和笔刷大小的选项卡监听
    colorol.addEventListener("click", function (e) {
        if (this == e.target) return;
        ctx.strokeStyle = getComputedStyle(e.target).backgroundColor
    });

    sizeul.addEventListener("click", function (e) {
        if (this == e.target) return;
        ctx.lineWidth = parseInt(getComputedStyle(e.target).height)
    });
}