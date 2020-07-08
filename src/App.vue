<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Home'}" exact>
              <img class="logo" src="./assets/build-a-bot-logo.png" alt="Robot Logo" />
              Build a bot
            </router-link>
          </li>
           <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Build'}" exact>
              Build
            </router-link>
          </li>
           <li class="nav-item cart">
            <router-link class="nav-link" :to="{name: 'Cart'}" exact>
              Cart
            </router-link>
            <div class="cart-items">
              {{ cart.length }}
            </div>
          </li>
        </ul>
      </nav>
    </header>
    <div class="container">
      <aside class="aside">
        <!-- adding names to routes views.
        This one has the name as sidebar (specified in router)
        and the other has a default name.
        This allows to render multiple components.
        -->
        <router-view name="sidebar" />
      </aside>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    cart() {
      return this.$store.state.robots.cart;
    },
  },
};
</script>

/* Global */
<style>
body{
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
</style>

/* Only App Component */
<style scoped>
/* .content >>> .robot-name{
  color: red;
  border: 2px solid blue;
} */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

header {
  background-color: #999;
  width: 1184px;
  margin: 0 auto;
}

ul {
  padding: 3px;
  display: flex;
}

.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}

.router-link-active{
  color: #fff;
}

.nav-link{
  text-decoration: none;
  color: inherit;
}
.nav-item.cart{
  position: relative;
  margin-left: auto;
  border-right: none;
}

.cart-items{
  position: absolute;
  top: -5px;
  right: -4px;
  font-size: 18px;
  width: 20px;
  text-align: center;
  display: inline-block;
  border-radius: 100px;
  background-color: mediumseagreen;
}

.logo {
  vertical-align: middle;
  height: 30px;
}

main{
  padding: 30px;
  background-color: #fff;
  width: 964px;
  min-height: 300px;
}

.container{
  display: flex;
  margin: 10px auto 0 auto;
  justify-content: center;
}

.aside{
  padding: 30px;
  background-color: #aaa;
  width: 100px;
  min-height: 300px;
}
</style>
