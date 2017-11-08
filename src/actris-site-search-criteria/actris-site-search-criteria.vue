<i18n>
{
	"en": {
	    "sites": "Sites (test)"
	  },
	  "fr": {
	    "sites": "Sites (test)"
	  }
}
</i18n>

<template>
<span class="actis-collection-search-criteria-host" >
<aeris-catalog-search-box id="box"  :title="$t('sites')" header-icon-class="fa fa-map-marker" :deployed="deployed">
     <actris-site-search-criteria-content></actris-site-search-criteria-content>
</aeris-catalog-search-box>
</span>
</template>

<script>
export default {
  props: {
  	lang:  {
      type: String,
      default: 'en'
    },
    deployed:  {
        type: Boolean,
        default: false
      }
  },
  
  watch: {
    lang (value) {
	      this.$i18n.locale = value;
    }
  },
  
  destroyed: function() {
  },
  
  created: function () {
	  this.$i18n.locale = this.lang;
  },

  mounted: function() {
  },
  
  computed: {
  	
  },

   data () {
    return {
    }
  },
  
  updated: function() {
  },
  
  methods: {
  
  }
}
</script>