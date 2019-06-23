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

@Component({
  computed: mapGetters({
    isAuthenticated: "auth/isAuthenticated"
  })
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
</style>
