let navbar = document.getElementById("navbar")
let canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight - "70"

let c = canvas.getContext("2d")

class Ball{
    constructor(x,y,r,vx,vy,color){
        this.r = r 
        this.x = x
        this.y = y
        this.vx = vx / 2
        this.vy = vy / 2
        this.ballColor = color
    }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.r,0,Math.PI*2)
        c.fillStyle = this.ballColor
        c.fill()
    }
    update(){
        if(this.x + this.r >= canvas.width || this.x - this.r <= 0){
            this.vx = -this.vx
        }
        this.x += this.vx
        if(this.y + this.r >= canvas.height || this.y - this.r <= 0){
            this.vy = -this.vy
        }
        this.y += this.vy
        this.draw()
    }
}

let balls = []

let color = ""
let speedX = 10
let speedY = 10
let size = 0

canvas.addEventListener("click",(e)=>{
    if(color == "")
    return;
    if(e.clientX <= size || e.clientX >= canvas.width - size)
    return;
    if(e.clientY <= size + 70 || e.clientY - 70 >= canvas.height - size)
    return;
    if(size == 0)
    return;
    balls.push(new Ball(e.clientX,e.clientY-"70",size,speedX,speedY,color))
})

document.querySelector("#ball-size").addEventListener("click",(e)=>{
    if(e.target.nodeName != "BUTTON")
    return;
    switch(e.target.getAttribute("id")){
        case "small":
            size = 15
            break;
        case "medium":
            size = 25
            break;
        case "large":
            size = 35
    }
    document.querySelectorAll("#ball-size button").forEach(element=>{
        element.removeAttribute("style")
    })
    e.target.style = "background-color : #218c74"
})

document.querySelector("#speed").addEventListener("input",()=>{
    document.querySelector("#speedValue").innerText = document.querySelector("#speed").value + " m/s"
    speedX = document.querySelector("#speed").value
    speedY = document.querySelector("#speed").value

})

document.querySelector("#colorList").addEventListener("click",(e)=>{
    if(e.target.nodeName != "LI")
    return;
    switch(e.target.getAttribute("id")){
        case "red":
            color = "#e74c3c"
            document.querySelector("#color-btn").style.backgroundColor = "#e74c3c"
            break;
        case "yellow":
            color = "#f1c40f"
            document.querySelector("#color-btn").style.backgroundColor = "#f1c40f"
            break;
        case "orange":
            color = "#e67e22"
            document.querySelector("#color-btn").style.backgroundColor = "#e67e22"
            break;
        case "blue":
            color = "#3498db"
            document.querySelector("#color-btn").style.backgroundColor = "#3498db"
            break;
        case "green":
            color = "#27ae60"
            document.querySelector("#color-btn").style.backgroundColor = "#27ae60"
            break;
        case "purple":
            color = "#9b59b6"
            document.querySelector("#color-btn").style.backgroundColor = "#9b59b6"
    }
})

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth 
    canvas.height = window.innerHeight - "70"
})

function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)
    balls.forEach(ball=>{
        ball.update()  
    })
    requestAnimationFrame(animate)
}

animate()
