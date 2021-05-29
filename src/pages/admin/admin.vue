<template>
  <div :class="$style.root">
    <L2SAddForm />
    <L2SShowAllData />
  </div>
</template>
<script>
import L2SAddForm from "Blocks/L2SAddForm";
import L2SShowAllData from "Blocks/L2SShowAllData";
export default {
  name: "admin",
  components: {
    L2SAddForm,
    L2SShowAllData,
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
