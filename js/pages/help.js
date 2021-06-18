import Page from '../components/page.js'

export default {
  name: 'help',
  data() {
    return {
      title: 'Help'
    }
  },
  template:
  `<page :title="title" parent="/account">
    <h2>Exercise Recommendations</h2>
    <p>
      Exercise recommendations are generated based on which muscles you want to train.
      For each exercise, it is known which muscles it is useful for and for which it is not.
      Based on those two factors a score can be calculated for each exercise, making it possible to rank them.
    </p>
    <h2>Food Recommendations</h2>
    <p>
      Food recommendations are generated based on your workout and nutrition goals.
      Each item is assigned a score, making it possible to rank them.
      For progress-based recommendations, the nutrition value per average serving is used.
    </p>
    <h2>Leveling System</h2>
    <p>
      You can earn experience points by performing activities or consuming healthy food.
      For every meal you eat, you earn two experience points.
      Try performing exercises on higher intensity to earn more experience points.
    </p>
    <h2>Progress Calculation</h2>
    <p>
      For reaching your daily goals it is important to cover basic needs such as sleep, enough water, and an adequate food intake.
      Earn additional progress by performing an exercise, doing some yoga, or meditating.
      Each basic need makes up 33% of your daily goal, while activities can bring you an additional 17% each.
    </p>
  </page>`,
  components: {
      Page
  }
}
