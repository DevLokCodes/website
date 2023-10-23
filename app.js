new Vue({
  el: '#slider',
  data: {
    slides: [
      {
        title: 'Ready Player One',
        description: 'When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.',
        image: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg',
      },
      {
        title: 'Avengers: Infinity War',
        description: 'As the Avengers and their allies have continued to protect the world from threats too large for any...',
        image: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
      },
      {
        title: 'Coco',
        description: 'Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician...',
        image: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
      },
    ],
  },
  mounted() {
    const slider = this.$el.querySelector('.slider-cards');
    slider.addEventListener('touchstart', this.startDrag);
    slider.addEventListener('touchend', this.stopDrag);
    slider.addEventListener('touchmove', this.touchMove);
  },
  methods: {
    startDrag(e) {
      // Handle touchstart event
      this.dragging = true;
      this.initialTouchX = e.touches[0].pageX;
      this.initialCardsX = this.cardsX;
    },
    stopDrag() {
      // Handle touchend event
      this.dragging = false;

      const cardWidth = this.$el.querySelector('.slider-card').offsetWidth + 10;
      const nearestSlide = -Math.round(this.cardsX / cardWidth);
      this.selectedIndex = Math.min(Math.max(0, nearestSlide), this.slides.length - 1);
      gsap.to(this, 0.3, { cardsX: -this.selectedIndex * cardWidth });
    },
    touchMove(e) {
      // Handle touchmove event
      if (this.dragging) {
        const touchX = e.touches[0].pageX;
        const dragAmount = touchX - this.initialTouchX;
        const targetX = this.initialCardsX + dragAmount;
        this.cardsX = targetX;
      }
    },
  },
});
