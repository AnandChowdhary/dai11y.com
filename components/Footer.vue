<template>
  <div v-if="isVisible" class="footer">
    <div class="text text--align-center">
      &copy; Oswald Labs
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
  padding: 2rem 0;
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
