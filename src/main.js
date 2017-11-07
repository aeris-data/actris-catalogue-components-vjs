require("exports-loader?!./l.min.js")

import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import {VueAerisLanguagePlugin} from 'aeris-mixins'
Vue.use(VueAerisLanguagePlugin)

import ActrisCollectionSearchCriteria from './actris-collection-search-criteria/actris-collection-search-criteria.vue';
import ActrisCollectionSearchCriteriaContent from './actris-collection-search-criteria/actris-collection-search-criteria-content.vue';




ljs.addAliases({
	dep: [
		'https://rawgit.com/aeris-data/aeris-commons-fonts/develop/font/aeriscommmonsfonts.css',
		'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js']
})

ljs.load('dep', function() {

	if (!window.registredAerisElements) {
		window.registredAerisElements = [];
	}
	
	var actrisTimer;
	
	function stopactrisTimer() {
		clearInterval(actrisTimer);
	}

	function registerElement(name, component) {
        if (!window.registredAerisElements) {
            window.registredAerisElements = [];
        }
        if (window.registredAerisElements.indexOf(name) < 0) {
            Vue.customElement(name, component);
            window.registredAerisElements.push(name)
        }
    }
	
	function actrisRegister() {
		console.info("trying to register actris catalog components");
		if (window.registredAerisElements.indexOf("aeris-catalogue-components-vjs") > -1) {
		//if (1==1) {
			console.info("Start registration of actris catalog");
			
			registerElement('actris-collection-search-criteria-content', ActrisCollectionSearchCriteriaContent);
			registerElement('actris-collection-search-criteria', ActrisCollectionSearchCriteria);
			stopactrisTimer();

		}
		else {
			console.info("aeris-catalogue-components-vjs not available yet...");
		}
	}
	
	actrisTimer = setInterval(actrisRegister, 1000);
	
	
	
})


