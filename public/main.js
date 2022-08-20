'use strict'
{
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('sw.js')
      console.info('Service worker registered')
    } catch (error) {
      console.error('Error while registering service worker: ' + error.message)
    }
  }
}

{
  async function fetchAudio(url) {
    try {
      let res = await fetch(url)
      let audioData = await res.arrayBuffer()
      return await context.decodeAudioData(audioData)
    } catch (error) {
      return null
    }
  }

  let context = new AudioContext()

  let cheeseBuffer = await fetchAudio('assets/cheese/cheese.mp3')

  document.addEventListener('click', async function () {
    let source = context.createBufferSource()
    source.buffer = cheeseBuffer
    source.connect(context.destination)
    source.start()
  })
}
