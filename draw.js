const canvasEl = document.querySelector('canvas'), //canvas elements
canvasCtx = canvasEl.getContext('2d') //canvas context
gapX = 13 //window.innerHeight /2 - 100

const lineWidth = 20

const mouse = {
    x: 0,
    y: 0,
}

const field = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw: function() {
    canvasCtx.fillStyle = '#008000' //verde
    canvasCtx.fillRect(0,0, this.w, this.h);
    },
}

const line = {
    w: 15,
    h: field.h,
    draw: function() {
        canvasCtx.fillStyle = '#e1faf8'; //branco
        canvasCtx.fillRect(
            field.w / 2 - this.w,
            0,
            this.w,
            this.h,
            )
    },
}

const score = {
    player: 0,
    cpu: 0,
    playerScored: function(){
        this.player++
    },
    cpuScored: function() {
        this.cpu++
    },
    draw: function() {
        canvasCtx.font = 'normal 25pt arial'
        canvasCtx.textAlign = 'center'
        canvasCtx.textBaseline = 'top'
        canvasCtx.fillStyle = '#e1faf8'
        canvasCtx.fillText(this.player, field.w / 4, 50)
        canvasCtx.fillText(this.cpu, field.w / 2 + field.w /4, 50)
    }
}

const leftPaddle = {
    x: gapX,
    y: window.innerHeight /2 - 100,
    w: 25,
    h: 180,
    _move: function() {this.y= mouse.y-100},
    draw: function() {
        canvasCtx.fillStyle = '#e1faf8'; //branco
        canvasCtx.fillRect(
            this.x,
            this.y,
            this.w,
            this.h)
            this._move()
    },
}

const rightPaddle = {
    x: window.innerWidth - lineWidth - gapX,
    y: window.innerHeight /2 - 100,
    w: 25,
    h: 180,
    _move: function() {
        if (this.y + this.h / 2 < ball.y + ball.r)
        {
            this.y += ball.spd * (Math.random() * 1.6)
        }else{
            this.y -= ball.spd  * (Math.random() * 1.6)
        }
    },
    draw: function() {
        canvasCtx.fillStyle = '#e1faf8'; //branco
        canvasCtx.fillRect(
            this.x,
            this.y,
            this.w,
            this.h)
        this._move()
    }
}

const ball = {
    x: field.w / 2,
    y: field.h / 2,
    r: 19,
    spd: 8,
    dirX: 1,
    dirY: 1,

    _reverseY: function() {
        this.dirY *= -1
    },
    _reverseX: function() {
        this.dirX *= -1
    },
    _pointUp: function(){

        this.x = field.w / 2;
        this.y = field.h / 2;
            
        if (this.spd < 15) {
            this.spd+=0.5
        };
        
    },
    _move: function(){
        this.x += this.dirX * this.spd
        this.y += this.dirY * this.spd
    },
    _calPos: function() {


        if (this.y + this.r > rightPaddle.y && this.y + this.r < rightPaddle.y + rightPaddle.h) {
        if (this.x > field.w - this.r  - rightPaddle.w - gapX && this.dirX > 0) {this._reverseX()}
        } else if (this.x > field.w - this.r) {
            //marcar ponto para o jogador
            score.playerScored()
            this._reverseX()
            this._pointUp()
        }
        
        if (this.y + this.r > leftPaddle.y && this.y + this.r < leftPaddle.y + leftPaddle.h) {
            if (this.x < this.r + leftPaddle.w + gapX && this.dirX < 0) {this._reverseX()}
            } else if (this.x < this.r && this.dirX < 0) {
                //marcar ponto para a cpu
                score.cpuScored()
                this._reverseX()
                this._pointUp()
            }

        //if (this.x < 0 + this.r && this.dirX < 0) {this._reverseX()}
        if (this.y > field.h - this.r && this.dirY > 0) {this._reverseY()}
        if (this.y < 0 + this.r && this.dirY < 0) {this._reverseY()}
    },

    draw: function(){
        canvasCtx.beginPath()
        canvasCtx.arc(this.x,this.y,this.r,0,2 * Math.PI, false)
        canvasCtx.fill();

        this._move()
        this._calPos()
        
    }
}




function setup(){
    canvasEl.width = window.innerWidth -10;
    canvasEl.height = window.innerHeight -10;

    canvasCtx.width = window.innerWidth;
    canvasCtx.height = window.innerHeight;
}

function draw() {

    field.draw();
    line.draw();
    score.draw();
    leftPaddle.draw();
    rightPaddle.draw();
    ball.draw(), 100/60;
}



setup()
setInterval(draw, 1000 / 60)

canvasEl.addEventListener('mousemove', (e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
})

