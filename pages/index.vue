<template>
  <div>
    <header class="section section--bg-white">
      <div class="container">
        <h1>Build accessible apps with Oswald Labs Platform.</h1>
        <p>
          Oswald Labs Platform is an open, inclusive set of APIs and tools to
          build accessible apps.
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
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSync,
  faUserLock,
  faFingerprint,
  faCode,
  faGlobeEurope,
  faShieldAlt,
  faToggleOn,
  faFile,
  faLanguage,
  faRocket,
  faMagic,
  faCreditCard,
  faUsers,
  faLaptop,
  faHandsHelping,
  faCalendar,
  faImage
} from "@fortawesome/free-solid-svg-icons";
import {
  faNodeJs,
  faVuejs,
  faAccessibleIcon
} from "@fortawesome/free-brands-svg-icons";
library.add(
  faSync,
  faMagic,
  faUserLock,
  faCalendar,
  faImage,
  faHandsHelping,
  faFingerprint,
  faCode,
  faUsers,
  faLaptop,
  faGlobeEurope,
  faShieldAlt,
  faNodeJs,
  faVuejs,
  faToggleOn,
  faFile,
  faLanguage,
  faAccessibleIcon,
  faRocket,
  faCreditCard
);

@Component({
  computed: mapGetters({
    isAuthenticated: "auth/isAuthenticated"
  }),
  components: {
    FontAwesomeIcon
  }
})
export default class Home extends Vue {}
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
  margin-bottom: 5rem;
}
.icon-circle {
  background-color: #fff;
  margin-right: 1rem;
  height: 3.5rem;
  width: 3.5rem;
  text-align: center;
  line-height: 3.5rem;
  font-size: 150%;
  border-radius: 100%;
}
dt {
  font-size: 125%;
  margin-bottom: 0.1rem;
  + dd {
    margin-left: 0;
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
</style>
