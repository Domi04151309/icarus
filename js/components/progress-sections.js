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
    <div :style="'z-index: 4;width: calc(' + (s1 * 100 / 4) + '% + 12px)'"></div>
    <div class="light-blue" :style="'z-index: 3;width: calc(' + (s2 * 100 / 4) + '% + 12px)'"></div>
    <div class="cyan" :style="'z-index: 2;width: calc(' + (s3 * 100 / 4) + '% + 12px)'"></div>
    <div class="teal" :style="'z-index: 1;width: calc(' + (s4 * 100 / 4) + '% + 12px)'"></div>
  </div>`
}
