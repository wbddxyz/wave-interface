const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Function to set canvas dimensions
function setCanvasDimensions() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Define particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 10 + 5; // Adjust particle size
    this.speed = Math.random() * 0.05 + 0.02; // Adjust particle speed
    this.angle = Math.random() * Math.PI * 2; // Random initial angle
    this.angularVelocity = Math.random() * 0.1 - 0.05; // Random angular velocity
  }

  update() {
    this.angle += this.angularVelocity; // Update particle angle

    // Update particle position using a sine wave for smooth wave-like motion
    this.x += this.speed; // Move particles horizontally
    this.y = canvas.height / 2 + Math.sin(this.x / 50) * 50; // Move particles vertically in a sine wave

    // Wrap particle position when it goes out of bounds
    if (this.x > canvas.width + this.size) {
      this.x = -this.size;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)'; // Change particle color to blue
    ctx.fill();
  }
}

// Create an array of particles
const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

// Function to draw the animated background
function drawBackground() {
  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'lightblue');
  gradient.addColorStop(1, 'blue');

  // Set background gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update and draw each particle
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  // Draw frosted glass effect
  ctx.globalAlpha = 0.1; // Set transparency
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // Semi-transparent white
  ctx.fillRect(100, 100, canvas.width - 200, canvas.height - 200); // Position and size of content rectangle
  ctx.globalAlpha = 1; // Reset global alpha

  // Request animation frame to continuously update the background
  requestAnimationFrame(drawBackground);
}

// Set canvas dimensions initially and on window resize
setCanvasDimensions();
window.addEventListener('resize', setCanvasDimensions);

// Start drawing the animated background
drawBackground();
