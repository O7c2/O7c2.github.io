document.addEventListener('DOMContentLoaded', () => {
    const dialogueTextElement = document.getElementById('dialogue-text');
    const choiceButtons = document.querySelectorAll('.choice-button');
    let typingTimeout;

    // 存放不同部分内容的 "剧本"
    const story = {
        welcome: "你好。欢迎来到我的个人空间…\n你想了解关于我的什么事情呢？",
        about: "我叫O7c2，一名学生。\n我相信代码和创意能够交织出不可思议的世界。",
        projects: “无”,
        contact: "如果想与我取得联系，可以通过以下方式：\n- GitHub: <a href='https://github.com/O7c2' target='_blank'>O7c2</a>"
    };

    // 打字机函数
    function typeWriter(text, i = 0) {
        clearTimeout(typingTimeout);
        if (i < text.length) {
            dialogueTextElement.innerHTML = text.substring(0, i + 1) + '<span class="cursor">▋</span>';
            typingTimeout = setTimeout(() => typeWriter(text, i + 1), 50); // 打字速度
        } else {
             dialogueTextElement.innerHTML = text; // Typing finished
        }
    }

    // 为选项按钮添加点击事件
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            if (story[targetId]) {
                typeWriter(story[targetId]);
            }
        });
    });

    // 页面加载时显示欢迎语
    typeWriter(story.welcome);

    // (可选) 点击窗口继续播放音乐
    const bgm = document.getElementById('bgm');
    if(bgm) {
        document.body.addEventListener('click', () => {
            if (bgm.paused) {
                bgm.play();
            }
        }, { once: true });
    }

    // --- 樱花飘落特效 ---
    const canvas = document.getElementById('sakura');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let petals = [];
    const petalCount = 50;

    function Petal() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 2 - canvas.height;
        this.w = 20 + Math.random() * 15;
        this.h = 10 + Math.random() * 5;
        this.opacity = this.w / 35;
        this.xSpeed = 1 + Math.random();
        this.ySpeed = 0.5 + Math.random() * 0.5;
        this.flip = Math.random();
        this.flipSpeed = Math.random() * 0.03;
    }

    Petal.prototype.draw = function() {
        if (this.y > canvas.height || this.x > canvas.width) {
            this.x = -this.w;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
        }
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
        ctx.closePath();
        ctx.fillStyle = '#ffb6c1';
        ctx.fill();
    };
    
    Petal.prototype.update = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.flip += this.flipSpeed;
        this.w = 20 + Math.cos(this.flip) * 5;
    };

    function initPetals() {
        for(let i = 0; i < petalCount; i++) {
            petals.push(new Petal());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animate);
    }
    
    initPetals();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        petals = [];
        initPetals();
    });
});
