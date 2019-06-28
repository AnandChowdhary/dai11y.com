<template>
  <main itemscope itemtype="https://schema.org/Product"></main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faTimes,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
library.add(faCheck, faTimes, faArrowRight);

@Component({
  components: {
    FontAwesomeIcon
  },
  computed: mapGetters({
    isAuthenticated: "auth/isAuthenticated"
  })
})
export default class Pricing extends Vue {}
</script>

<style lang="scss" scoped>
.plan {
  font-weight: inherit;
  margin-bottom: 0;
}
.price {
  font-size: 200%;
  font-weight: bold;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    padding: 0.5rem 0;
    &:first-child a {
      font-weight: bold;
      text-decoration: underline;
    }
  }
}
svg {
  max-height: 1rem;
}
.i-n {
  opacity: 0.2;
}
.i-y + span {
  margin-left: 0.5rem;
}
.addons {
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  > div {
    width: 23%;
  }
  &.more-plans > div {
    width: 100%;
    &:nth-child(2) {
      margin: 0 2rem;
    }
  }
  h3 {
    margin: 0;
    font-size: 100%;
  }
  p {
    font-size: 95%;
  }
}

@media (max-width: 500px) {
  .addons {
    display: block;
  }
  &.more-plans > div {
    margin-top: 1rem;
    &:nth-child(2) {
      margin: 1rem 0 0 0 !important;
    }
  }
}

@media (min-width: 500px) {
  .row.row--padding-large:first-of-type {
    .card {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      padding-bottom: 1rem;
    }
    + .row {
      .card {
        padding-top: 1rem;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
}
</style>
