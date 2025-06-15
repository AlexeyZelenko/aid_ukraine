<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-ukraine-blue mb-4">{{ $t('financial.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('financial.subtitle') }}</p>
        <div class="ukraine-accent-bar w-24 mx-auto mt-6"></div>
      </div>

      <!-- Bank Cards -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <!-- PrivatBank -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
          <div class="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
            <div class="flex items-center justify-between">
              <h3 class="text-2xl font-bold">{{ $t('financial.privatbank') }}</h3>
              <i class="fas fa-university text-3xl"></i>
            </div>
            <p class="mt-2 opacity-90">Надійний партнер у фінансовій допомозі</p>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Номер картки (UAH)</label>
                <div class="flex items-center justify-between">
                  <span class="font-mono text-lg">0000 0000 0000 0000</span>
                  <button 
                    @click="copyToClipboard('0000000000000000')"
                    class="text-ukraine-blue hover:text-ukraine-blue-light"
                    title="Копіювати"
                  >
                    <i class="fas fa-copy"></i>
                  </button>
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">IBAN (UAH)</label>
                <div class="flex items-center justify-between">
                  <span class="font-mono text-sm">UA000000000000000000000000000</span>
                  <button 
                    @click="copyToClipboard('000000000000000000000000000')"
                    class="text-ukraine-blue hover:text-ukraine-blue-light"
                    title="Копіювати"
                  >
                    <i class="fas fa-copy"></i>
                  </button>
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Номер картки (USD)</label>
                <div class="flex items-center justify-between">
                  <span class="font-mono text-lg">0000 0000 0000 0000</span>
                  <button 
                    @click="copyToClipboard('4731219688741039')"
                    class="text-ukraine-blue hover:text-ukraine-blue-light"
                    title="Копіювати"
                  >
                    <i class="fas fa-copy"></i>
                  </button>
                </div>
              </div>

              <div class="text-sm text-gray-600">
                <p><strong>Отримувач:</strong> Фонд "Допомога Україні"</p>
                <p><strong>Призначення:</strong> Благодійна допомога</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Monobank -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
          <div class="bg-gradient-to-r from-black to-gray-800 p-6 text-white">
            <div class="flex items-center justify-between">
              <h3 class="text-2xl font-bold">{{ $t('financial.monobank') }}</h3>
              <i class="fas fa-mobile-alt text-3xl"></i>
            </div>
            <p class="mt-2 opacity-90">Сучасні рішення для швидких переказів</p>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Номер картки (UAH)</label>
                <div class="flex items-center justify-between">
                  <span class="font-mono text-lg">0000 0000 0000 0000</span>
                  <button 
                    @click="copyToClipboard('0000000000000000')"
                    class="text-ukraine-blue hover:text-ukraine-blue-light"
                    title="Копіювати"
                  >
                    <i class="fas fa-copy"></i>
                  </button>
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Номер телефону</label>
                <div class="flex items-center justify-between">
                  <span class="font-mono text-lg">+3800000000000</span>
                  <button 
                    @click="copyToClipboard('+3800000000000')"
                    class="text-ukraine-blue hover:text-ukraine-blue-light"
                    title="Копіювати"
                  >
                    <i class="fas fa-copy"></i>
                  </button>
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Номер картки (EUR)</label>
                <div class="flex items-center justify-between">
                  <span class="font-mono text-lg">0000 0000 0000 0000</span>
                  <button 
                    @click="copyToClipboard('0000000000000000')"
                    class="text-ukraine-blue hover:text-ukraine-blue-light"
                    title="Копіювати"
                  >
                    <i class="fas fa-copy"></i>
                  </button>
                </div>
              </div>

              <div class="text-sm text-gray-600">
                <p><strong>Отримувач:</strong> Фонд "Допомога Україні"</p>
                <p><strong>Призначення:</strong> Благодійна допомога</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- QR Codes Section -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 class="text-2xl font-semibold text-center mb-6">QR коди для швидкого переказу</h3>
        
        <div class="grid md:grid-cols-2 gap-8 text-center">
          <div>
            <h4 class="text-lg font-semibold mb-4 text-green-600">ПриватБанк QR</h4>
            <div class="bg-gray-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center">
              <i class="fas fa-qrcode text-6xl text-gray-400"></i>
            </div>
            <p class="text-sm text-gray-600 mt-2">Наведіть камеру для переказу</p>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4 text-gray-800">Monobank QR</h4>
            <div class="bg-gray-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center">
              <i class="fas fa-qrcode text-6xl text-gray-400"></i>
            </div>
            <p class="text-sm text-gray-600 mt-2">Наведіть камеру для переказу</p>
          </div>
        </div>
      </div>

      <!-- Usage Statistics -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 class="text-2xl font-semibold text-center mb-6">Статистика використання коштів</h3>
        
        <div class="grid md:grid-cols-4 gap-6 text-center">
          <div class="bg-ukraine-blue text-white rounded-lg p-4">
            <i class="fas fa-donate text-2xl mb-2"></i>
            <div class="text-2xl font-bold">₴2,450,000</div>
            <div class="text-sm opacity-90">Зібрано коштів</div>
          </div>
          
          <div class="bg-ukraine-yellow text-ukraine-blue rounded-lg p-4">
            <i class="fas fa-users text-2xl mb-2"></i>
            <div class="text-2xl font-bold">1,350</div>
            <div class="text-sm">Допомогли людям</div>
          </div>
          
          <div class="bg-green-500 text-white rounded-lg p-4">
            <i class="fas fa-hands-helping text-2xl mb-2"></i>
            <div class="text-2xl font-bold">890</div>
            <div class="text-sm opacity-90">Виконано запитів</div>
          </div>
          
          <div class="bg-purple-500 text-white rounded-lg p-4">
            <i class="fas fa-heart text-2xl mb-2"></i>
            <div class="text-2xl font-bold">2,100</div>
            <div class="text-sm opacity-90">Донорів</div>
          </div>
        </div>
      </div>

      <!-- Security Notice -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div class="flex items-start">
          <i class="fas fa-shield-alt text-yellow-600 text-2xl mr-4 mt-1"></i>
          <div>
            <h4 class="text-lg font-semibold text-yellow-800 mb-2">Безпека переказів</h4>
            <ul class="text-yellow-700 space-y-1 text-sm">
              <li>• Використовуйте лише офіційні додатки банків</li>
              <li>• Перевіряйте номери карток перед переказом</li>
              <li>• Зберігайте чеки про переказ</li>
              <li>• При сумнівах зв'яжіться з нами за телефоном</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.add({ severity: 'success', summary: 'Успіх', detail: 'Номер скопійовано в буфер обміну!', life: 3000 })
  } catch (err) {
    console.error('Failed to copy text: ', err)
    toast.add({ severity: 'error', summary: 'Помилка', detail: 'Не вдалось скопіювати номер', life: 3000 })
  }
}
</script>