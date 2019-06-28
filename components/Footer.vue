<template>
  <div v-if="isVisible" class="footer">
    <div v-if="!isAuthenticated" class="banner">
      <div class="hero hero--align-center">
        <h1>It's a no-brainer&mdash;get started now.</h1>
        <p>Get a free public status page, daily automated audits, and more.</p>
        <div>
          <nuxt-link
            class="button button--size-large button--color-primary"
            to="/auth/register"
            >Get started for free &rarr;</nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="container links">
      <div class="larger">
        <nuxt-link class="item item--type-logo" to="/">
          <img class="logo-img" alt="" src="/android-chrome-192x192.png" />
          <span>Dai11y</span>
        </nuxt-link>
        <p class="text text--mt-1">
          An
          <a target="_blank" href="https://o15y.com">O15Y</a>
          startup<br />Powered by
          <a target="_blank" href="https://oswaldlabs.com/platform/"
            >Oswald Labs Platform</a
          >
        </p>
      </div>
      <div>
        <h2>Product</h2>
        <nav>
          <nuxt-link to="/">Why Dai11y?</nuxt-link>
          <nuxt-link to="/">Enterprise</nuxt-link>
          <nuxt-link to="/">Security &amp; privacy</nuxt-link>
          <nuxt-link to="/pricing">Pricing</nuxt-link>
          <nuxt-link to="/">Dai11y Demo</nuxt-link>
        </nav>
      </div>
      <div>
        <h2>Use cases</h2>
        <nav>
          <nuxt-link to="/">Accessibility audits</nuxt-link>
          <nuxt-link to="/">Status pages</nuxt-link>
          <nuxt-link to="/">Website speed test</nuxt-link>
          <nuxt-link to="/">ADA compliance</nuxt-link>
          <nuxt-link to="/">Improve SEO</nuxt-link>
        </nav>
      </div>
      <div>
        <h2>Resources</h2>
        <nav>
          <nuxt-link to="/">Blog</nuxt-link>
          <nuxt-link to="/">Developer API</nuxt-link>
          <nuxt-link to="/">Help Center</nuxt-link>
          <nuxt-link to="/">Partners</nuxt-link>
          <button onclick="window.agastya.open()">Accessibility</button>
        </nav>
      </div>
      <div>
        <h2>Policies</h2>
        <nav>
          <nuxt-link to="/">Terms of use</nuxt-link>
          <nuxt-link to="/policies/privacy/">Privacy</nuxt-link>
          <nuxt-link to="/">Cookies</nuxt-link>
          <nuxt-link to="/">GDPR</nuxt-link>
        </nav>
      </div>
      <div>
        <h2>Company</h2>
        <nav>
          <nuxt-link to="/">O15Y</nuxt-link>
          <nuxt-link to="/">About us</nuxt-link>
          <nuxt-link to="/">News</nuxt-link>
          <nuxt-link to="/">Presskit</nuxt-link>
          <nuxt-link to="/">Careers</nuxt-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: mapGetters({
    isAuthenticated: "auth/isAuthenticated",
    user: "auth/user"
  })
})
export default class Footer extends Vue {
  isVisible = true;
  @Watch("$route")
  private onRouteChanged() {
    this.updateNavBar();
  }
  private updateNavBar() {
    if (this.$route.path.startsWith("/onboarding")) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  }
  private mounted() {
    this.updateNavBar();
  }
}
</script>

<style lang="scss" scoped>
.footer {
  padding-bottom: 4rem;
  font-size: 90%;
}
.logo {
  font-weight: bold;
  font-style: italic;
  font-size: 110%;
  color: inherit;
  text-decoration: none;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: top;
  .larger {
    width: 25%;
  }
  > div {
    flex-grow: 1;
  }
}
@media (max-width: 900px) {
  .container {
    flex-wrap: wrap;
    > div,
    .larger {
      width: 50%;
      margin-bottom: 2rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
h2 {
  font-size: 110%;
  margin-bottom: 0.5rem;
}
nav {
  a,
  button {
    display: block;
    color: inherit;
    text-decoration: none;
    padding: 0.25rem 0;
    &:hover {
      text-decoration: underline;
    }
  }
  button {
    background: none;
    font: inherit;
    border: none;
  }
}
.banner {
  text-align: center;
  background-color: #fff;
  padding: 1rem 0;
}
.hero p {
  font-size: 110%;
}
.links {
  padding-top: 4rem;
}
.item--type-logo {
  text-align: center;
  font-size: 125%;
  &.nuxt-link-exact-active {
    font-weight: normal;
  }
  img {
    height: 1.5rem;
    margin-top: -0.2rem;
    margin-right: 0.25rem;
    vertical-align: middle;
  }
}
</style>
