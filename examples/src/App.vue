<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const routes = router.getRoutes().filter(r => r.path !== '/' && r.path !== '/home')
const currentRoute = useRoute()

const goHome = () => {
  router.push({path: '/home'})
}
</script>

<template>
  <template v-if="currentRoute.path !== '/' && currentRoute.path !== '/home'">
    <el-page-header title="首页" :content="currentRoute.meta.title" @back="goHome" />
    <router-view ></router-view>
  </template>

	<template v-if="currentRoute.path === '/home'">
		<img alt="Vue logo" src="./assets/logo.png" style="margin-top: 60px;" />
		<ul class="nav-link">
			<li v-for="route in routes" class="nav-link__item">
				<router-link :to="route.path">{{ route.meta.title }}</router-link>
			</li>
		</ul>
	</template>
</template>

<style>
#app {
  width: 1024px;
  margin: auto;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.nav-link {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	flex-basis: 200px;
	width: 1024px;
	margin: auto;
}
.nav-link__item {
	margin-left: 50px;
}
.nav-link__item:first-of-type {
	margin-left: 0;
}
</style>
