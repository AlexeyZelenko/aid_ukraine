<template>
    <div class="component-content">
      <h2>Статті</h2>
      <p>Тут буде список статей, новин та іншого контенту.</p>
      <div class="articles-list">
        <div class="article-card">
          <h3>Як надати допомогу внутрішньо переміщеним особам</h3>
          <p class="article-meta">Автор: Адмін | Дата: 01.06.2025</p>
          <p class="article-excerpt">
            У цій статті ми розглянемо основні кроки та рекомендації щодо ефективної допомоги людям, які були змушені покинути свої домівки.
          </p>
          <button class="btn btn-primary btn-sm">Читати далі</button>
          <button class="btn btn-secondary btn-sm">Редагувати</button>
        </div>
        <div class="article-card">
          <h3>Волонтерство: від чого почати та як не вигоріти</h3>
          <p class="article-meta">Автор: Ольга Волонтерка | Дата: 28.05.2025</p>
          <p class="article-excerpt">
            Цей посібник для новачків у волонтерському русі допоможе зрозуміти, як ефективно допомагати та дбати про своє ментальне здоров'я.
          </p>
          <button class="btn btn-primary btn-sm">Читати далі</button>
          <button class="btn btn-secondary btn-sm">Редагувати</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ArticlesComponent',
  };
  </script>
  
  <style scoped>
  .articles-list {
    margin-top: 1.5rem;
    display: grid;
    gap: 1.5rem;
  }
  
  .article-card {
    background-color: #fefefe;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .article-card h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: #212529;
  }
  
  .article-meta {
    font-size: 0.85rem;
    color: #6c757d;
    margin-bottom: 0.75rem;
  }
  
  .article-excerpt {
    font-size: 0.95rem;
    color: #495057;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
  
  .article-card .btn {
    margin-right: 0.5rem;
  }
  </style>