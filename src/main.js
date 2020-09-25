import Vue from 'vue';
import App from './app.vue';

import { createRouter } from './router';
import { createStore } from './store';

export function createApp(){
	const router = createRouter();
	const store = createStore();
	const app = new Vue({
		store,
		router,
		render:h => h(App)
	})
	return { app, router, store }
}