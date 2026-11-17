const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let nodes = [];
let packets = [];

const protocols = ['UART', 'I2C', 'SPI', 'CAN', 'DLMS', 'RS-485'];
let floatingTexts = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Node {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 210, 255, 0.5)';
        ctx.fill();
    }
}

class Packet {
    constructor(startNode, endNode) {
        this.start = startNode;
        this.end = endNode;
        this.progress = 0;
        this.speed = 0.01 + Math.random() * 0.02;
    }
    update() {
        this.progress += this.speed;
    }
    draw() {
        const currentX = this.start.x + (this.end.x - this.start.x) * this.progress;
        const currentY = this.start.y + (this.end.y - this.start.y) * this.progress;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#00d2ff';
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00d2ff';
    }
}

class FloatingText {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.text = protocols[Math.floor(Math.random() * protocols.length)];
        this.life = 1.0;
        this.decay = 0.01 + Math.random() * 0.02;
    }
    update() {
        this.life -= this.decay;
        this.y -= 0.5;
    }
    draw() {
        ctx.font = '10px monospace';
        ctx.fillStyle = `rgba(0, 210, 255, ${this.life})`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

// Initialize Nodes
for (let i = 0; i < 50; i++) {
    nodes.push(new Node());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.shadowBlur = 0; // Reset shadow for background elements

    // Update & Draw Nodes
    nodes.forEach(node => {
        node.update();
        node.draw();
    });

    // Draw Connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(0, 210, 255, ${0.1 - dist/1500})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Randomly spawn packets on active connections
                if (Math.random() < 0.001) {
                    packets.push(new Packet(nodes[i], nodes[j]));
                }
            }
        }
    }

    // Update & Draw Packets
    for (let i = packets.length - 1; i >= 0; i--) {
        packets[i].update();
        if (packets[i].progress >= 1) {
            // Spawn protocol text when packet reaches destination
            if (Math.random() < 0.3) {
                floatingTexts.push(new FloatingText(packets[i].end.x, packets[i].end.y));
            }
            packets.splice(i, 1);
        } else {
            packets[i].draw();
        }
    }
    ctx.shadowBlur = 0; // Reset shadow after packets

    // Update & Draw Floating Texts
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
        floatingTexts[i].update();
        if (floatingTexts[i].life <= 0) {
            floatingTexts.splice(i, 1);
        } else {
            floatingTexts[i].draw();
        }
    }

    requestAnimationFrame(animate);
}

animate();