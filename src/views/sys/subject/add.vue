<template> 
  <org-detail :isEdit="false"></org-detail>
</template>
<script>
  import orgDetail from './components/orgDetail'

  export default {
    name: 'addOrg',
    components: {orgDetail}
  }
</script>
<style scoped>
</style>


