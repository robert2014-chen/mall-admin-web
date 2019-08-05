<template> 
  <account-detail :isEdit="true"></account-detail>
</template>
<script>
  import AccountDetail from "./components/accountDetail";
  export default {
    name: 'updateAccount',
    components: {AccountDetail }
  }
</script>
<style scoped>
</style>


