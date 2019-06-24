<i18n>
{
	"en": {
	    "collections": "Products"
	  },
	  "fr": {
	    "collections": "Produits"
	  }
}
</i18n>

<template>
<span class="actis-collection-search-criteria-host" >
<aeris-catalog-search-box id="box"  :title="$t('collections')" header-icon-class="fa fa-cubes" :deployed="deployed">
     <actris-collection-search-criteria-content></actris-collection-search-criteria-content>
</aeris-catalog-search-box>
</span>
</template>

<script>
export default {
  props: {
    lang: {
      type: String,
      default: "en"
    },
    deployed: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  destroyed: function() {},

  created: function() {
    this.$i18n.locale = this.lang;
  },

  mounted: function() {},

  computed: {},

  data() {
    return {};
  },

  updated: function() {},

  methods: {}
};
</script>