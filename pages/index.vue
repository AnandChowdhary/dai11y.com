<template>
  <div>
    <header class="section section--bg-white">
      <div class="container">
        <div class="row">
          <div>
            <h1>Daily accessibility audits for your site.</h1>
            <p style="max-width: 500px">
              Dai11y automates website auditing with a powerful monitoring
              platform powered by Google's Lighthouse.
            </p>
            <div v-if="isAuthenticated">
              <nuxt-link
                class="button button--size-large button--color-primary"
                to="/dashboard"
                >Go to your dashboard &rarr;</nuxt-link
              >
            </div>
            <div v-else>
              <nuxt-link
                class="button button--size-large button--color-primary"
                to="/auth/register"
                >Get started for free &rarr;</nuxt-link
              >
            </div>
          </div>
          <img class="b" alt="" src="/images/undraw_product_tour_foyt.svg" />
        </div>
      </div>
    </header>
    <main>
      <section class="section">
        <div class="container">
          <div class="row text text--align-center main-features">
            <div>
              <font-awesome-icon
                class="icon icon--size-lg"
                icon="history"
                fixed-width
              />
              <h3>Automated audits</h3>
              <p>
                Set up hourly, daily, weekly, or monthly audits for your
                websites.
              </p>
            </div>
            <div>
              <font-awesome-icon
                class="icon icon--size-lg"
                :icon="['fab', 'accessible-icon']"
                fixed-width
              />
              <h3>Smart suggestions</h3>
              <p>
                Find out how to improve your site with intelligent suggestions.
              </p>
            </div>
            <div>
              <font-awesome-icon
                class="icon icon--size-lg"
                icon="bell"
                fixed-width
              />
              <h3>Notifications</h3>
              <p>
                Receive alerts when errors are found via email or Slack.
              </p>
            </div>
            <div>
              <font-awesome-icon
                class="icon icon--size-lg"
                icon="laptop-code"
                fixed-width
              />
              <h3>Developer API</h3>
              <p>
                Set up custom audits, integrate with CI/CD, and more with our
                API.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="section section--bg-white">
        <div class="container text text--align-center">
          <h2>Audit your site for free (30 sec)</h2>
          <div v-if="result && result.data">
            <div class="row">
              <div>
                <div class="score">{{ result.data.scorePerformance }}</div>
                <div>Performance</div>
              </div>
              <div>
                <div class="score">{{ result.data.scoreAccessibility }}</div>
                <div>Accessibility</div>
              </div>
              <div>
                <div class="score">{{ result.data.scoreBestPractices }}</div>
                <div>Best Practices</div>
              </div>
              <div>
                <div class="score">{{ result.data.scoreSeo }}</div>
                <div>SEO</div>
              </div>
              <div>
                <div class="score">{{ result.data.scorePwa }}</div>
                <div>Progressive Web App</div>
              </div>
            </div>
            <div class="text text--mt-2">
              <router-link
                to="/auth/register"
                class="button button--color-primary button--size-large"
                >See recommendations &rarr;</router-link
              >
            </div>
          </div>
          <div v-else-if="result">
            <p>An error occurred and we couldn't perform this audit.</p>
            <button class="button" @click.prevent="result = null">
              Try again
            </button>
          </div>
          <form v-else class="big" @submit.prevent="audit">
            <label>
              <span>Webpage URL</span>
              <input
                v-model="url"
                placeholder="Enter a URL"
                type="url"
                :disabled="!!auditing"
              />
            </label>
            <button class="button button--color-primary" :disabled="!!auditing">
              <span v-if="!!auditing"
                >{{ auditing }}... ({{ percent }}%)...</span
              >
              <span v-else>Audit my site &rarr;</span>
            </button>
          </form>
          <!-- <div class="row">
            <div>
              <img
                alt="Audit score"
                src="https://img.shields.io/badge/accessibility-100%2F100-success.svg"
              />
            </div>
          </div> -->
        </div>
      </section>
      <section>
        <div class="container">
          <div class="row">
            <div>
              <LineChart
                :data="{
                  labels: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                  ],
                  datasets: [
                    {
                      label: 'Average audit score',
                      backgroundColor: '#0080a5',
                      data: [81, 82, 84, 88, 81, 79, 83]
                    }
                  ]
                }"
                :options="{
                  aspectRatio: 2,
                  scales: {
                    yAxes: [{ ticks: { suggestedMin: 65, suggestedMax: 100 } }]
                  }
                }"
              />
            </div>
            <div>
              <div class="rc">
                <div>
                  <div class="icon-circle" aria-hidden="true">📈</div>
                </div>
                <div>
                  <dt>Beautiful visualizations</dt>
                  <dd>
                    See metrics for your audits as beautiful, exportable
                    graphics
                  </dd>
                </div>
              </div>
              <div class="rc">
                <div>
                  <div class="icon-circle" aria-hidden="true">⚡</div>
                </div>
                <div>
                  <dt>Performance monitoring</dt>
                  <dd>
                    Track page speed, external resources, blocking scripts, and
                    more
                  </dd>
                </div>
              </div>
              <div class="rc">
                <div>
                  <div class="icon-circle" aria-hidden="true">🌐</div>
                </div>
                <div>
                  <dt>Public status pages</dt>
                  <dd>
                    Allow your users to track your uptime and daily audit
                    results
                  </dd>
                </div>
              </div>
              <div class="rc">
                <div>
                  <div class="icon-circle" aria-hidden="true">⏱️</div>
                </div>
                <div>
                  <dt>Hourly or daily audits</dt>
                  <dd>
                    Set up automated audits for every hour, day, week, or month
                  </dd>
                </div>
              </div>
              <div class="rc">
                <div>
                  <div class="icon-circle" aria-hidden="true">🔔</div>
                </div>
                <div>
                  <dt>Email, Slack, SMS, webhooks</dt>
                  <dd>
                    Get notified of alerts if your site it down or scores
                    decrease
                  </dd>
                </div>
              </div>
              <div class="rc">
                <div>
                  <div class="icon-circle" aria-hidden="true">🔍</div>
                </div>
                <div>
                  <dt>Search Engine Optimzation</dt>
                  <dd>
                    Improve your SEO with intelligent recommendations
                  </dd>
                </div>
              </div>
              <div class="rc">
                <div>
                  <div class="icon-circle" aria-hidden="true">🔍</div>
                </div>
                <div>
                  <dt>Accessibility suggestions</dt>
                  <dd>
                    Find accessibility issues on your site and ways to fix them
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBell,
  faLaptopCode,
  faHistory
} from "@fortawesome/free-solid-svg-icons";
import { faAccessibleIcon } from "@fortawesome/free-brands-svg-icons";
import LineChart from "@/components/charts/LineChart.vue";
library.add(faBell, faLaptopCode, faAccessibleIcon, faHistory);

@Component({
  computed: mapGetters({
    isAuthenticated: "auth/isAuthenticated"
  }),
  components: {
    LineChart,
    FontAwesomeIcon
  }
})
export default class Home extends Vue {
  url = "";
  auditing = "";
  percent = 0;
  auditId?: string;
  result: any = null;

  private audit() {
    this.auditing = "Launching a browser";
    this.$axios
      .get("https://api.dai11y.com/api/audit/?url=https://example.com")
      .then(result => {
        this.auditId = result.data.id;
      });
    const interval = window.setInterval(() => {
      if (this.percent < 100) {
        this.percent++;
        if (this.percent > 20) this.auditing = "Visiting your site";
        if (this.percent > 40) this.auditing = "Looking at links and colors";
        if (this.percent > 60) this.auditing = "Determining ARIA attributes";
        if (this.percent > 80) this.auditing = "Thinking of recommendations";
        if (this.percent > 99) this.auditing = "Complete! Reporting";
      } else {
        window.clearInterval(interval);
        this.finishAudit();
      }
    }, 250);
  }

  private finishAudit() {
    this.url = "";
    this.$axios
      .get(`https://api.dai11y.com/api/audit/${this.auditId}`)
      .then(result => {
        if (parseInt(result.data.status) !== 0) {
          this.result = result;
          console.log(JSON.stringify(result));
        } else {
          setTimeout(() => {
            this.finishAudit();
          }, 5000);
        }
      });
  }
}
</script>

<style lang="scss" scoped>
header {
  padding: 15rem 0 7.5rem 0;
  margin-top: -7.5rem;
  h1 {
    margin: 0 0 2rem 0;
  }
}
h2 {
  font-weight: 300;
  font-size: 200%;
  margin-bottom: 2.5rem;
}
.icon-circle {
  background-color: #fff;
  margin-right: 1rem;
  height: 3.25rem;
  width: 3.25rem;
  text-align: center;
  line-height: 3.5rem;
  font-size: 125%;
  border-radius: 80%;
}
dt {
  font-weight: bold;
  margin-bottom: 0.25rem;
  + dd {
    margin-left: 0;
    margin-bottom: 2rem;
  }
}
.rc {
  > div:first-child {
    float: left;
    margin-bottom: 1.5rem;
    > div {
      box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
    }
  }
  &::after {
    content: "";
    display: block;
    width: 100%;
    clear: both;
  }
}
.icon--size-lg {
  font-size: 250%;
  opacity: 0.5;
  margin-bottom: 1rem;
}
.label-help {
  line-height: 1;
}
@media (max-width: 500px) {
  .label-help {
    display: none;
  }
}
.label-help::after {
  font-size: 90% !important;
  line-height: 1.5;
  width: 300px;
  white-space: normal;
}
.b {
  height: 20rem;
  margin-top: -4rem;
  margin-bottom: -5rem;
}
@media (max-width: 500px) {
  .b {
    margin-top: 0;
    margin-bottom: 0;
    height: auto;
    width: 100%;
    margin-bottom: -5rem;
  }
}
.big {
  text-align: center;
  font-size: 125%;
  label {
    display: block;
    font-weight: bold;
  }
  input {
    font: inherit;
    font-weight: normal;
    display: block;
    width: 80%;
    max-width: 500px;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
  }
}
.score {
  font-weight: 300;
  font-size: 500%;
}
</style>
