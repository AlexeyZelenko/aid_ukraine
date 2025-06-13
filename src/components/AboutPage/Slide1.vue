<template>
    <div class="slide-container bg-white">
      <div class="flex">
        <div class="blue-accent h-4 w-1/2"></div>
        <div class="yellow-accent h-4 w-1/2"></div>
      </div>
  
      <div class="p-16 flex flex-col justify-center h-full">
        <div class="page-border">
          <h1 class="text-5xl font-bold mb-6 text-gray-800">Веб-сайт допомоги переселенцям та воїнам</h1>
          <p class="text-2xl mb-12 text-gray-600">Сучасний та надійний онлайн-ресурс для підтримки переселенців, воїнів, поранених воїнів та вдів.</p>
        </div>
  
        <div class="icon-container mt-8">
          <div v-for="item in iconItems" :key="item.label" class="icon-item">
            <div class="icon-circle blue-accent text-white">
              <i :class="item.iconClass"></i>
            </div>
            <span>{{ item.label }}</span>
          </div>
        </div>
  
        <p class="text-center text-lg mt-8">Представлення проєкту та командна місія</p>
      </div>
  
      <div class="absolute bottom-0 left-0 right-0 flex">
        <div class="yellow-accent h-4 w-1/2"></div>
        <div class="blue-accent h-4 w-1/2"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  // У Composition API з <script setup> немає необхідності в імпортах 'ref' або 'reactive'
  // для простих даних, які не є реактивними станами.
  // Якщо б це були дані, що змінюються та повинні викликати перемальовування, тоді б використовували ref/reactive.
  
  const iconItems = [
    { iconClass: 'fas fa-home fa-2x', label: 'Переселенці' },
    { iconClass: 'fas fa-shield-alt fa-2x', label: 'Воїни' },
    { iconClass: 'fas fa-first-aid fa-2x', label: 'Поранені' }, // Змінено на "Поранені"
    { iconClass: 'fas fa-heart fa-2x', label: 'Вдови' }
  ];
  </script>
  
  <style scoped>
  /* Scoped стилі для цього компонента */
  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: #333;
  }
  .slide-container {
    width: 1280px;
    min-height: 720px;
    position: relative;
    overflow: hidden;
    /* Tailwind CSS вже додає bg-white */
  }
  .blue-accent {
    background-color: #0057b7; /* Український прапор - синій */
  }
  .yellow-accent {
    background-color: #ffd700; /* Український прапор - жовтий */
  }
  .page-border {
    border-left: 10px solid #0057b7;
    padding-left: 2rem;
  }
  .icon-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1.5rem;
  }
  .icon-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }
  </style>