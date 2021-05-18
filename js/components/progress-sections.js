export default {
  name: 'progress-sections',
  props: {
    s1: Number,
    s2: Number,
    s3: Number,
    s4: Number
  },
  template:
  `<div class="progress">
    <div class="deep-purple" :style="'z-index: 4;width: calc(' + (s1 * 200 / 6) + '% + 12px)'"></div>
    <div class="indigo" :style="'z-index: 3;width: calc(' + (s2 * 200 / 6) + '% + 12px)'"></div>
    <div :style="'z-index: 2;width: calc(' + (s3 * 200 / 6) + '% + 12px)'"></div>
    <div class="light-blue" :style="'z-index: 1;width: calc(' + (s4 * 100 / 6) + '% + 12px)'"></div>
  </div>`
}
