<i18n>
{
  "en": {
	  "Aerosol": "Aerosol",
	  "Atmospheric Humidity": "Atmospheric Humidity",
	  "Flux": "Flux",
	  "Gases": "Gases",
	  "Meteo": "Meteo",
	  "ReOBS": "ReOBS"
  },
  "fr": {
	  "Aerosol": "Aérosol",
	  "Atmospheric Humidity": "Humidité atmosphérique",
	  "Flux": "Flux",
	  "Gases": "Gaz",
	  "Meteo": "Météo",
	  "ReOBS": "ReOBS"
  }
}
</i18n>

<template>
<span>
<div class="program-header" v-for="collection in collections">
	<label :for="collection.name"><input type="checkbox" :id="collection.name" :name="collection.name" class="program-checkbox"> <span class="program-name-row">
	{{$t(collection.name)}}
</span></label></div>
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
	  console.log("Actris collection criteria content - Creating");
	  this.$i18n.locale = this.lang;
	  
	  this.handleSearchBarListener = this.handleSearchBarEvent.bind(this);
	  document.addEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
	  this.handleSearchBarResetListener = this.handleSearchBarResetEvent.bind(this);
	  document.addEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);

	  var parentService = document.querySelector('aeris-catalog').attributes.getNamedItem('metadata-service').value;
	  parentService = parentService.endsWith('/') ? parentService + 'collections/' : parentService + '/collections/';
	  var program = document.querySelector('aeris-catalog').attributes.getNamedItem('program').value;
	  var url = parentService;
	  url +=  "?program=" + program;
	  this.$http.get(url, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
	  .then((response)=>{this.handleSuccess(response)},(response)=>{this.handleError(response)});
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
		program:null,
		collections: []
    }
  },
  
  updated: function() {
  },
  
  methods: {
	  
	handleSuccess : function(response) {
		var aux = response.body;
		this.program = aux[0].name
		this.collections = aux[0].collections;
	},
	
	
	handleError: function(response) {
		console.log("Actris collection criteria - Error while accessing server:"); 
		var error = response.status;
		var message = response.statusText;
		if(!error) message = 'Can\'t connect to the server';
		console.log('Error ' + error + ': ' + message);
	},
	
	handleSearchBarEvent: function(e) {
		var aux = this.$el.querySelectorAll("input:checked")
		var result = []
		for (var i = 0; i < aux.length; i++) {
			var entry = {}
			var name = aux[i].id;
			entry.name= name
			entry.program= this.program;
			result.push(entry);
		}
		e.detail.collections = result;
  	},
	
  	handleSearchBarResetEvent: function(e) {

  		// uncheck everything 
        var parent = this.$el.querySelectorAll("input");
        parent.forEach(function(element) {
        	if (element.checked) {
        		element.checked = false;
        	}
        })
        
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