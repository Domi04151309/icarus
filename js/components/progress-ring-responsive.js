export default {
  name: 'progress-ring',
  props: {
    radius: Number,
    progress: Number,
    stroke: Number
  },
  computed: {
    normalizedRadius() {
      return this.radius - this.stroke / 2
    },
    circumference() {
      return this.normalizedRadius * 2 * Math.PI
    },
    strokeDashoffset() {
      return this.circumference - this.progress / 100 * this.circumference
    }
  },
  template:
  `<svg
    :height="radius * 2"
    :width="radius * 2">
    <circle
      stroke="var(--pressed-color)"
      :stroke-dasharray="circumference + ' ' + circumference"
      :stroke-width="stroke"
      fill="transparent"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"/>
    <circle
      stroke="var(--accent-color)"
      :stroke-dasharray="circumference + ' ' + circumference"
      :style="{ strokeDashoffset: strokeDashoffset }"
      :stroke-width="stroke"
      fill="transparent"
      stroke-linecap="round"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"/>
  </svg>`
}
