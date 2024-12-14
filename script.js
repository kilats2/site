// Configuração inicial do contador de tempo juntos
const startDate = new Date('2019-12-27'); // Data do início do namoro
const counterElement = document.getElementById('counter'); // Contador de data
const counterElement2 = document.getElementById('counter2'); // Contador de tempo

function updateCounter() {
    const now = new Date();
    const years = now.getFullYear() - startDate.getFullYear();
    const months = now.getMonth() - startDate.getMonth() + (years * 12);
    const days = Math.floor((now - new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) / (1000 * 60 * 60 * 24)) % 30;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    counterElement.textContent = `${Math.floor(months / 12)} anos, ${months % 12} meses, ${days} dias`;
    counterElement2.textContent = `${hours.toString().padStart(2, "0")} horas : ${minutes.toString().padStart(2, "0")} minutos : ${seconds.toString().padStart(2, "0")} segundos`;
}

updateCounter();
setInterval(updateCounter, 1000); // Atualiza o contador a cada segundo

// Configuração da galeria de fotos
const gallery = document.querySelector('.gallery');
const prevBtn = document.querySelector('.arrow-left');
const nextBtn = document.querySelector('.arrow-right');
let currentIndex = 0;

function updateGallery() {
    const width = gallery.parentElement.offsetWidth;
    gallery.style.transform = `translateX(-${currentIndex * width}px)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? gallery.children.length - 1 : currentIndex - 1;
    updateGallery();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === gallery.children.length - 1) ? 0 : currentIndex + 1;
    updateGallery();
});

// Alterna automaticamente as fotos a cada 3 segundos
setInterval(() => {
    currentIndex = (currentIndex + 1) % gallery.children.length;
    updateGallery();
}, 3000);

// Função para gerar corações caindo
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
    document.body.appendChild(heart);

    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Gera corações a cada 500ms
setInterval(createHeart, 500);
