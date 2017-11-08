<i18n>
{
  "en": {
	  "all": "All"
	  
  },
  "fr": {
	  "all": "Tous"
  }
}
</i18n>

<template>
<span>
<div v-for="site in sites">
	<input type="radio" name="site" :id="site.id" :value="site.id" v-model="picked" />
		<label :for="site.id">{{site.name}}</label>
</div>
</span>
</template>

<script>
export default {
	 
  props: {
  	lang:  {
      type: String,
      default: 'en'
    }
  },
  
  watch: {
    lang (value) {
	      this.$i18n.locale = value;
    }
  },
  
  destroyed: function() {
	  document.removeEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
	  this.handleSearchBarListener = null;
	  document.removeEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
	  this.handleSearchBarResetListener = null;
  },
  
  created: function () {
	  console.log("Actris site criteria content - Creating");
	  this.$i18n.locale = this.lang;
	  
	  this.handleSearchBarListener = this.handleSearchBarEvent.bind(this);
	  document.addEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
	  this.handleSearchBarResetListener = this.handleSearchBarResetEvent.bind(this);
	  document.addEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
	  this.sites = [
		  {id:"all", name: this.$i18n.t("all")}, 
		  {id:"COPDD", name: "COPDD", box:{north:"45.8485",south:"45.7474",east:"3.1922",west:"2.8260"}},
		  {id:"DDU", name: "DDU", box:{north:"-66.614",south:"-66.6936",east:"140.133",west:"139.7997"}},
		  {id:"LOA", name: "LOA", box:{north:"50.6394",south:"50.6145",east:"3.1729",west:"3.1210"}},
		  {id:"OHP", name: "OHP", box:{north:"43.9303",south:"43.9072",east:"5.7338",west:"5.6878"}},
		  {id:"OPAR", name: "OPAR", box:{north:"-20.6181",south:"-21.6939",east:"56.2584",west:"54.6654"}},
		  {id:"OPE", name: "OPE", box:{north:"48.5183",south:"48.4736",east:"5.4205",west:"5.3110"}},
		  {id:"P2OA", name: "P2OA", box:{north:"43.1435",south:"42.8399",east:"0.4524",west:"0.0434"}},
		  {id: "SIRTA", name: "SIRTA", box: {north: "48.7209", south: "48.7074", east: "2.2335", west: "2.1429"}},
		  ],
	  this.picked="all"

	 
  },

  mounted: function() {
  },
  
  computed: {
	  hasPointedSublevel: function() {
		  return this.expandSign;
	  }
  },

   data () {
    return {
		handleSearchBarListener: null,
		handleSearchBarResetListener: null,
		sites: [],
		picked: null
    }
  },
  
  updated: function() {
  },
  
  methods: {
	
	handleSearchBarEvent: function(e) {
		console.log(this.picked)
		if (this.picked != "all") {
			for (var i = 0; i < this.sites.length; i++) {
				if (this.sites[i].id==this.picked) {
					e.detail.box = this.sites[i].box
				}
			}
		}
  	},
	
  	handleSearchBarResetEvent: function(e) {
  		this.picked = "all"
  	},
  	

  
  	
  	
  }
}
</script>
<style>

	.chamber-institute-search-criteria-content-host .visible{
		display: block;
	}
	.chamber-institute-search-criteria-content-host .notvisible{
		display: none;
	}
	.chamber-institute-search-criteria-content-host {
		display: block;
	}
	
	.chamber-institute-search-criteria-content-host .program {
		margin-bottom: 5px;
		text-align: left;
	}
	
	.chamber-institute-search-criteria-content-host .program .program-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.chamber-institute-search-criteria-content-host .program .program-header label {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
		margin: 2px 0;
	}
	
	.chamber-institute-search-criteria-content-host .program .program-header .fa {
		cursor: pointer;
	}

	.chamber-institute-search-criteria-content-host .program .program-name-row {
		display: flex;
		align-items: center;
	}

	.chamber-institute-search-criteria-content-host .program .program-name-row strong {
		display: inline-flex;
		align-items: center;
	}
	
	.chamber-institute-search-criteria-content-host .program .collection {
		margin-left: 20px;
	}
	
	.chamber-institute-search-criteria-content-host .program-body .chamber-checkbox {
		margin-bottom: 0;
		margin-left: 20px;
	}
	
	.chamber-institute-search-criteria-content-host pointed-institute-level {
		padding: 0;
		margin-left: 20px;
	}
</style>