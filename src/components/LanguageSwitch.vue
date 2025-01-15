<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}
</script>

<template>
  <button class="lang-switch" @click="toggleLanguage">
    {{ locale === 'zh' ? 'EN' : '中' }}
  </button>
</template>

<style scoped>
.lang-switch {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2f2f2f;
  border: none;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  z-index: 1000;
}

.lang-switch:hover {
  background-color: #3f3f3f;
}
</style> 