<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useSeoMeta } from '@unhead/vue'

const greetings = ['Hello!', 'Olá!', 'Ciao!', 'Hola!']

const current = ref(null)

const currentLength = computed(() => current.value?.length ?? 0)

let interval

const nextGreeting = () => {
  if (current.value === null) {
    current.value = greetings.at(0)
  } else if (
    greetings.findIndex((value, index) => current.value === value) ===
    greetings.length - 1
  ) {
    current.value = greetings.at(0)
  } else {
    current.value = greetings.at(greetings.findIndex((value, index) => current.value === value) + 1)
  }
}

onMounted(() => {
  nextGreeting()

  interval = setInterval(nextGreeting, 2000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})

useSeoMeta({
  title: 'Lucas Santos - Full Stack Web Developer',
  description:
    'Lucas is a brazilian full stack web developer living in Sheffield, UK with near a decade of professional experience.'
})
</script>

<template>
  <main>
    <h1 :style="{ '--word-length': currentLength }">{{ current }}</h1>

    <img
      src="./assets/lucas-santos.jpg"
      alt="Lucas Santos' profile picture"
      title="Lucas Santos' profile picture"
    />

    <div class="socials">
      <a
        href="https://twitter.com/padilhadev"
        target="_blank"
        alt="Twitter Profile"
        title="Twitter Profile"
      >
        <faIcon class="fa-2x" icon="fa-brands fa-twitter" />
      </a>
      <a
        href="https://instagram.com/padilha.dev"
        target="_blank"
        alt="Instagram Profile"
        title="Instagram Profile"
      >
        <faIcon class="fa-2x" icon="fa-brands fa-instagram" />
      </a>
      <a
        href="https://linkedin.com/in/lucaspadilhadossantos/"
        target="_blank"
        alt="LinkedIn Profile"
        title="LinkedIn Profile"
      >
        <faIcon class="fa-2x" icon="fa-brands fa-linkedin" />
      </a>
      <a
        href="https://github.com/lucaspadilha"
        target="_blank"
        alt="Github Profile"
        title="Github Profile"
      >
        <faIcon class="fa-2x" icon="fa-brands fa-github" />
      </a>
      <a href="/lucas-santos-cv.pdf" target="_blank" alt="Download my CV" title="Download my CV">
        <faIcon class="fa-2x" icon="file-pdf" />
      </a>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  color: white;
  margin-bottom: 1rem;
  border-right: 2px solid white;
  animation: cursor 0.75s infinite, typing 2s infinite;
  max-width: 5.8rem;
  width: 0;
  padding-right: 0;
  overflow: hidden;
}

img {
  margin: 0 auto;
  border-radius: 50%;
  display: block;
  width: 225px;
  max-width: 100%;
}

.socials {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.socials a {
  margin: 0 0.75rem;
  color: white;
}

.socials a:hover {
  opacity: 0.5;
}

@keyframes cursor {
  0%,
  49% {
    border-right-color: white;
  }
  50%,
  100% {
    border-right-color: transparent;
  }
}

@keyframes typing {
  0% {
    width: 0;
    padding-right: 0;
  }
  25%,
  75% {
    width: calc(var(--word-length) * 1.05rem);
    padding-right: 0.5rem;
  }
  100% {
    width: 0;
    padding-right: 0;
  }
}
</style>
