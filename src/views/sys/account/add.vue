<template> 
  <account-detail :isEdit="false"></account-detail>
</template>
<script>
  import accountDetail from './components/accountDetail'

  export default {
    name: 'addAccount',
    components: {accountDetail}
  }
</script>
<style scoped>
</style>


